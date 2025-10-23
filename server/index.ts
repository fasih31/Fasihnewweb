import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

// Security middleware - add headers to prevent common attacks
app.use((req, res, next) => {
  // Allow iframe embedding for Replit environment, prevent clickjacking elsewhere
  if (process.env.REPL_ID) {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  } else {
    res.setHeader('X-Frame-Options', 'DENY');
  }
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Enable XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Permissions policy
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
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

    res.status(status).json({ message });
    throw err;
  });

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
