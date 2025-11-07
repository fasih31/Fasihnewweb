import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import path from "path";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { logger } from "./utils/logger";
import { randomUUID } from "crypto";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown;
    id: string; // Added for request ID
  }
}

// Enable gzip compression for better performance
app.use(compression({
  filter: (req: any, res: any) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  threshold: 1024,
  level: 6 // Added for compression level
}));

// Request tracking middleware
app.use((req, res, next) => {
  req.id = randomUUID();
  res.setHeader('X-Request-ID', req.id);
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (duration > 1000) {
      console.warn(`Slow request [${req.id}]: ${req.method} ${req.path} - ${duration}ms`);
    }
  });

  next();
});


// Trust proxy (important for rate limiting behind reverse proxies)
app.set('trust proxy', 1);

// Comprehensive Security Headers - Industry Best Practices
app.use((req, res, next) => {
  // Prevent clickjacking attacks
  res.setHeader('X-Frame-Options', 'DENY');

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection (legacy browsers)
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Referrer policy for privacy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Restrict browser features
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), interest-cohort=()');
  res.setHeader('X-DNS-Prefetch-Control', 'on');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');

  // Content Security Policy - Strict security with necessary external resources
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https: blob:; " +
    "connect-src 'self' https://api.coingecko.com https://api.exchangerate-api.com https://finnhub.io https://newsapi.org https://api.alquran.cloud https://random-hadith-generator.vercel.app; " +
    "frame-ancestors 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "upgrade-insecure-requests; " +
    "block-all-mixed-content"
  );

  // HTTP Strict Transport Security (HSTS) - Force HTTPS
  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Cache control for security-sensitive pages
  if (req.path.startsWith('/api') || req.path.includes('admin')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  }

  next();
});

// Rate limiting to prevent brute force attacks
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 1000; // requests per window (increased for normal portfolio browsing)
const RATE_WINDOW = 60000; // 1 minute

// Contact form specific rate limiting
const contactRateLimitStore = new Map<string, { count: number; resetTime: number }>();
const CONTACT_RATE_LIMIT = 5; // submissions per window
const CONTACT_RATE_WINDOW = 300000; // 5 minutes

app.use((req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  // Stricter rate limiting for contact form submissions
  if (req.path === '/api/contact' && req.method === 'POST') {
    if (!contactRateLimitStore.has(ip)) {
      contactRateLimitStore.set(ip, { count: 1, resetTime: now + CONTACT_RATE_WINDOW });
    } else {
      const data = contactRateLimitStore.get(ip)!;
      if (now > data.resetTime) {
        data.count = 1;
        data.resetTime = now + CONTACT_RATE_WINDOW;
      } else {
        data.count++;
        if (data.count > CONTACT_RATE_LIMIT) {
          return res.status(429).json({ message: 'Too many contact requests. Please try again later.' });
        }
      }
    }
  }

  // General rate limiting for all requests
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
  } else {
    const data = rateLimitStore.get(ip)!;
    if (now > data.resetTime) {
      data.count = 1;
      data.resetTime = now + RATE_WINDOW;
    } else {
      data.count++;
      if (data.count > RATE_LIMIT) {
        return res.status(429).json({ message: 'Too many requests. Please try again later.' });
      }
    }
  }
  next();
});

app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  },
  limit: '10mb' // Prevent large payload attacks
}));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    logger.error('Express error handler caught:', {
      status,
      message,
      stack: err.stack,
    });

    if (!res.headersSent) {
      res.status(status).json({ message });
    }
  });

  // Serve static files from client/public (for sitemap.xml, robots.txt, etc.)
  app.use(express.static(path.join(import.meta.dirname, '..', 'client', 'public')));

  // Serve attached assets
  app.use('/attached_assets', express.static(path.join(import.meta.dirname, '..', 'attached_assets')));

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();