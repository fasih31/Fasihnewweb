import type { Express } from "express";
import { createServer, type Server } from "http";
import passport from "passport";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertArticleSchema,
  insertTestimonialSchema,
  insertNewsletterSubscriberSchema,
  insertCareerInquirySchema,
  insertLeadCaptureSchema,
  insertCalculatorResultSchema,
  insertPageAnalyticsSchema,
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { setupAuth, isAuthenticated, isAdmin } from "./googleAuth";
import nodemailer from "nodemailer";

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'Fasih31@gmail.com',
    pass: process.env.EMAIL_PASSWORD, // You'll need to set this in Replit Secrets
  },
});

async function sendEmailNotification(subject: string, html: string) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'Fasih31@gmail.com',
      to: 'Fasih31@gmail.com',
      subject,
      html,
    });
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  // Local login endpoint
  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ message: "Authentication error" });
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Invalid credentials" });
      }
      
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed" });
        }
        
        res.json({
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.picture,
          isAdmin: user.email === "Fasih31@gmail.com",
        });
      });
    })(req, res, next);
  });

  // Logout endpoint
  app.post("/api/auth/logout", (req: any, res) => {
    req.logout((err: any) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", isAuthenticated, async (req: any, res) => {
    try {
      const user = req.user;
      const isUserAdmin = user.email === "Fasih31@gmail.com";
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        isAdmin: isUserAdmin,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Received contact form submission:", req.body);
      
      // Sanitize input to prevent XSS attacks
      const sanitizeString = (str: string) => {
        return str
          .replace(/[<>]/g, '') // Remove HTML tags
          .trim()
          .substring(0, 5000); // Limit length
      };

      const sanitizedBody = {
        ...req.body,
        name: req.body.name ? sanitizeString(req.body.name) : '',
        email: req.body.email ? sanitizeString(req.body.email) : '',
        message: req.body.message ? sanitizeString(req.body.message) : '',
      };

      const validatedData = insertContactMessageSchema.parse(sanitizedBody);
      console.log("Validated data:", validatedData);
      
      const message = await storage.createContactMessage(validatedData);
      console.log("Message saved to database:", message);
      
      // Send email notification (non-blocking)
      const emailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `;
      
      sendEmailNotification(`New Contact Form from ${validatedData.name}`, emailHtml).catch(err => 
        console.error("Email notification failed:", err)
      );
      
      res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: message,
      });
    } catch (error: any) {
      console.error("Contact form error:", error);
      
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message,
        });
      }
      
      res.status(500).json({
        success: false,
        message: error.message || "Failed to send message. Please try again later.",
      });
    }
  });

  // Get all contact messages (admin only)
  app.get("/api/contact", isAdmin, async (req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json({
        success: true,
        data: messages,
      });
    } catch (error: any) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch messages",
      });
    }
  });

  // Testimonials endpoints
  app.get("/api/testimonials", async (req, res) => {
    try {
      const featuredOnly = req.query.featured === "true";
      const testimonials = await storage.getAllTestimonials(featuredOnly);
      res.json({
        success: true,
        data: Array.isArray(testimonials) ? testimonials : [],
      });
    } catch (error: any) {
      console.error("Error fetching testimonials:", error);
      res.json({
        success: true,
        data: [],
      });
    }
  });

  

  app.post("/api/testimonials", isAdmin, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      
      res.status(201).json({
        success: true,
        data: testimonial,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message,
        });
      } else {
        console.error("Error creating testimonial:", error);
        res.status(500).json({
          success: false,
          message: "Failed to create testimonial",
        });
      }
    }
  });

  app.put("/api/testimonials/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storage.updateTestimonial(id, req.body);
      
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Testimonial not found",
        });
      }
      
      res.json({
        success: true,
        data: updated,
      });


// LinkedIn Article Import with Content Scraping
app.post("/api/articles/import-linkedin", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { url, title, excerpt, content, category } = req.body;
    
    if (!url || !url.includes('linkedin.com')) {
      return res.status(400).json({ message: "Invalid LinkedIn URL" });
    }

    // Extract article ID from URL
    const urlParts = url.split('/');
    const articleId = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
    
    // Generate slug from title or use article ID
    const slug = title 
      ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : `linkedin-${articleId}-${Date.now()}`;

    // Calculate read time (average reading speed: 200 words/minute)
    const wordCount = content ? content.split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    const article = await storage.createArticle({
      title: title || "Imported from LinkedIn",
      slug,
      excerpt: excerpt || "This article was imported from LinkedIn.",
      content: content || `# Imported from LinkedIn\n\nOriginal URL: ${url}`,
      category: category || "technology",
      authorId: req.user!.id,
      published: false,
      readTime,
      metaTitle: title || "Imported LinkedIn Article",
      metaDescription: excerpt || "Article imported from LinkedIn",
      tags: ['linkedin', 'imported'],
    });

    res.json({ 
      success: true, 
      data: article,
      message: "Article imported successfully. Review and publish when ready."
    });
  } catch (error: any) {
    console.error("LinkedIn import error:", error);
    res.status(500).json({ message: error.message });
  }
});

    } catch (error: any) {
      console.error("Error updating testimonial:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update testimonial",
      });
    }
  });

  app.delete("/api/testimonials/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTestimonial(id);
      
      res.json({
        success: true,
        message: "Testimonial deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete testimonial",
      });
    }
  });

  // Newsletter subscription endpoints
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await storage.createNewsletterSubscriber(validatedData);
      
      // Send welcome email
      const welcomeEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Welcome to Fasih's Newsletter! 🎉</h1>
          <p>Hi ${validatedData.name || 'there'},</p>
          <p>Thank you for subscribing to my newsletter! You'll receive:</p>
          <ul>
            <li>📚 In-depth articles on AI, FinTech, and Web3</li>
            <li>💡 Product management insights and case studies</li>
            <li>🚀 Exclusive project updates and launches</li>
            <li>🎯 Industry trends and expert analysis</li>
          </ul>
          <p>Stay tuned for valuable content delivered right to your inbox!</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br>
            <strong>Fasih ur Rehman</strong><br>
            Product Manager | AI/ML & FinTech Expert
          </p>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            You're receiving this because you subscribed at iamfasih.com
          </p>
        </div>
      `;
      
      sendEmailNotification(
        `Welcome to Fasih's Newsletter!`,
        welcomeEmailHtml
      ).catch(err => console.error("Welcome email failed:", err));
      
      res.status(201).json({
        success: true,
        message: "Successfully subscribed! Check your email for a welcome message.",
        data: subscriber,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message,
        });
      } else {
        console.error("Error subscribing to newsletter:", error);
        res.status(500).json({
          success: false,
          message: "Failed to subscribe. Please try again later.",
        });
      }
    }
  });

  app.get("/api/newsletter", isAdmin, async (req, res) => {
    try {
      const subscribers = await storage.getAllNewsletterSubscribers();
      res.json({
        success: true,
        data: subscribers,
      });
    } catch (error: any) {
      console.error("Error fetching newsletter subscribers:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch subscribers",
      });
    }
  });

  // Career inquiries endpoints
  app.post("/api/career", async (req, res) => {
    try {
      const validatedData = insertCareerInquirySchema.parse(req.body);
      const inquiry = await storage.createCareerInquiry(validatedData);
      
      // Send email notification
      const emailHtml = `
        <h2>New Career Inquiry</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
        <p><strong>Inquiry Type:</strong> ${validatedData.inquiryType}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
        <p><strong>LinkedIn:</strong> ${validatedData.linkedinUrl || 'Not provided'}</p>
        <p><strong>Portfolio:</strong> ${validatedData.portfolioUrl || 'Not provided'}</p>
        <p><strong>Resume:</strong> ${validatedData.resumeUrl || 'Not provided'}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `;
      
      await sendEmailNotification(`New Career Inquiry: ${validatedData.inquiryType}`, emailHtml);
      
      res.status(201).json({
        success: true,
        message: "Your inquiry has been submitted successfully!",
        data: inquiry,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message,
        });
      } else {
        console.error("Error creating career inquiry:", error);
        res.status(500).json({
          success: false,
          message: "Failed to submit inquiry. Please try again later.",
        });
      }
    }
  });

  app.get("/api/career", isAdmin, async (req, res) => {
    try {
      const inquiries = await storage.getAllCareerInquiries();
      res.json({
        success: true,
        data: inquiries,
      });
    } catch (error: any) {
      console.error("Error fetching career inquiries:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch inquiries",
      });
    }
  });

  app.post("/api/articles", isAdmin, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const validatedData = insertArticleSchema.parse(req.body);
      
      const article = await storage.createArticle({
        ...validatedData,
        authorId: userId,
      });
      
      res.status(201).json({
        success: true,
        data: article,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message,
        });
      } else {
        console.error("Error creating article:", error);
        res.status(500).json({
          success: false,
          message: "Failed to create article",
        });
      }
    }
  });

  app.put("/api/articles/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await storage.updateArticle(id, req.body);
      
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      }
      
      res.json({
        success: true,
        data: updated,
      });
    } catch (error: any) {
      console.error("Error updating article:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update article",
      });
    }
  });

  app.delete("/api/articles/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteArticle(id);
      
      res.json({
        success: true,
        message: "Article deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting article:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete article",
      });
    }
  });

  app.get("/api/articles", async (req, res) => {
    try {
      const publishedOnly = req.query.published !== "false";
      const articles = await storage.getAllArticles(publishedOnly);
      
      res.json({
        success: true,
        data: articles,
      });
    } catch (error: any) {
      console.error("Error fetching articles:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch articles",
      });
    }
  });

  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await storage.getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({
          success: false,
          message: "Article not found",
        });
      }

      if (article.published) {
        await storage.incrementArticleViews(article.id);
      }
      
      res.json({
        success: true,
        data: article,
      });
    } catch (error: any) {
      console.error("Error fetching article:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch article",
      });
    }
  });

  app.get("/api/stocks", async (req, res) => {
    try {
      const symbols = ["AAPL", "GOOGL", "MSFT", "TSLA"];
      
      const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
      if (FINNHUB_API_KEY) {
        const stockPromises = symbols.map(async (symbol) => {
          try {
            const response = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
            );
            const data = await response.json();
            
            if (data && data.c) {
              return {
                symbol,
                price: data.c.toFixed(2),
                change: (data.c - data.pc).toFixed(2),
                changePercent: (data.dp !== undefined ? data.dp.toFixed(2) : "0.00") + "%",
              };
            }
            throw new Error("Invalid response");
          } catch (error) {
            return null;
          }
        });

        const results = await Promise.all(stockPromises);
        const validResults = results.filter(r => r !== null);
        
        if (validResults.length > 0) {
          return res.json(validResults);
        }
      }
      
      const mockData = symbols.map(symbol => ({
        symbol,
        price: (Math.random() * 300 + 100).toFixed(2),
        change: (Math.random() * 10 - 5).toFixed(2),
        changePercent: ((Math.random() * 5 - 2.5)).toFixed(2) + "%",
      }));
      
      res.json(mockData);
    } catch (error: any) {
      console.error("Error fetching stocks:", error);
      res.status(500).json({ message: "Failed to fetch stock data" });
    }
  });

  // Crypto API endpoint
  app.get("/api/crypto", async (req, res) => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true',
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0'
          }
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`CoinGecko API error: ${response.status} - ${errorText}`);
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Successfully fetched live crypto data');
      res.json(data);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      
      // Return error response instead of mock data
      res.status(503).json({
        error: 'Unable to fetch live crypto data',
        message: 'Please try again in a moment'
      });
    }
  });

  // Currency rates API endpoint
  app.get("/api/currency-rates", async (req, res) => {
    try {
      const response = await fetch(
        'https://api.exchangerate-api.com/v4/latest/USD'
      );
      const data = await response.json();
      res.json(data.rates);
    } catch (error) {
      console.error('Error fetching currency rates:', error);
      res.status(500).json({ error: 'Failed to fetch currency rates' });
    }
  });

  // Advanced Website scanner API endpoint with real analysis
  app.post("/api/scan-website-advanced", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      const startTime = Date.now();
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      const loadTime = Date.now() - startTime;
      const html = await response.text();
      const headers = Object.fromEntries(response.headers);

      const hasHttps = url.startsWith('https://');
      const hasTitle = /<title[^>]*>([^<]+)<\/title>/i.test(html);
      const hasMeta = /<meta\s+name="description"/i.test(html);
      const hasOgTags = /<meta\s+property="og:/i.test(html);
      const responsive = /<meta\s+name="viewport"/i.test(html);

      // Advanced HTML structure analysis
      const totalElements = (html.match(/<[^>]+>/g) || []).length;
      const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
      const h2Count = (html.match(/<h2[^>]*>/gi) || []).length;
      const h3Count = (html.match(/<h3[^>]*>/gi) || []).length;
      const h4Count = (html.match(/<h4[^>]*>/gi) || []).length;
      const h5Count = (html.match(/<h5[^>]*>/gi) || []).length;
      const h6Count = (html.match(/<h6[^>]*>/gi) || []).length;
      const forms = (html.match(/<form[^>]*>/gi) || []).length;
      const scripts = (html.match(/<script[^>]*>/gi) || []).length;
      const stylesheets = (html.match(/<link[^>]*stylesheet[^>]*>/gi) || []).length;
      const iframes = (html.match(/<iframe[^>]*>/gi) || []).length;
      const videos = (html.match(/<video[^>]*>/gi) || []).length;
      const buttons = (html.match(/<button[^>]*>/gi) || []).length;
      const inputs = (html.match(/<input[^>]*>/gi) || []).length;

      // Enhanced technology detection
      const technologies: string[] = [];
      const techPatterns = {
        'React': [/react/i, /_jsx/i, /createElement/i],
        'Vue.js': [/vue/i, /__VUE__/i],
        'Angular': [/angular/i, /ng-/i],
        'jQuery': [/jquery/i, /\$\(/],
        'Bootstrap': [/bootstrap/i],
        'Tailwind CSS': [/tailwind/i],
        'Next.js': [/next/i, /_next\//i],
        'Gatsby': [/gatsby/i],
        'WordPress': [/wp-content/i, /wp-includes/i],
        'Shopify': [/shopify/i, /cdn.shopify/i],
        'Google Analytics': [/google-analytics/i, /gtag/i],
        'Font Awesome': [/font-awesome/i, /fontawesome/i],
        'Stripe': [/stripe/i],
        'Cloudflare': [/cloudflare/i]
      };

      for (const [tech, patterns] of Object.entries(techPatterns)) {
        if (patterns.some(pattern => pattern.test(html))) {
          technologies.push(tech);
        }
      }
      
      if (headers['server']?.includes('nginx')) technologies.push('Nginx');
      if (headers['server']?.includes('apache')) technologies.push('Apache');
      if (headers['server']?.includes('cloudflare')) technologies.push('Cloudflare CDN');
      if (headers['x-powered-by']) technologies.push(`Powered by: ${headers['x-powered-by']}`);

      // Advanced security analysis
      const security = {
        ssl: hasHttps,
        headers: {
          hsts: !!headers['strict-transport-security'],
          csp: !!headers['content-security-policy'],
          xframe: !!headers['x-frame-options'],
          xss: !!headers['x-xss-protection'],
          referrerPolicy: !!headers['referrer-policy'],
          permissionsPolicy: !!headers['permissions-policy'],
        },
        vulnerabilities: [] as string[],
        recommendations: [] as string[],
      };

      if (!hasHttps) {
        security.vulnerabilities.push('No HTTPS encryption - Critical security risk');
        security.recommendations.push('Implement SSL/TLS certificate immediately');
      }
      if (!security.headers.hsts) {
        security.vulnerabilities.push('Missing HSTS header');
        security.recommendations.push('Add Strict-Transport-Security header');
      }
      if (!security.headers.csp) {
        security.vulnerabilities.push('Missing Content Security Policy');
        security.recommendations.push('Implement CSP to prevent XSS attacks');
      }
      if (!security.headers.xframe) {
        security.vulnerabilities.push('Missing X-Frame-Options');
        security.recommendations.push('Add X-Frame-Options to prevent clickjacking');
      }

      // Code quality analysis
      const codeQuality = {
        inlineStyles: (html.match(/style\s*=/gi) || []).length,
        inlineScripts: (html.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || []).filter(s => !s.includes('src=')).length,
        externalScripts: (html.match(/<script[^>]*src=/gi) || []).length,
        consoleStatements: (html.match(/console\.(log|warn|error|debug)/gi) || []).length,
        deprecatedTags: (html.match(/<(font|center|marquee|blink)[^>]*>/gi) || []).length,
        accessibilityIssues: [] as string[],
      };

      // Check accessibility
      const imagesWithoutAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length;
      if (imagesWithoutAlt > 0) {
        codeQuality.accessibilityIssues.push(`${imagesWithoutAlt} images missing alt text`);
      }
      if (!html.includes('lang=')) {
        codeQuality.accessibilityIssues.push('Missing language declaration on <html> tag');
      }
      if (!html.includes('aria-')) {
        codeQuality.accessibilityIssues.push('No ARIA attributes found - may impact screen reader users');
      }

      // Performance metrics
      const performanceMetrics = {
        loadTime,
        htmlSize: html.length,
        compression: headers['content-encoding'] || 'none',
        cacheControl: headers['cache-control'] || 'not set',
        totalResources: scripts + stylesheets + (html.match(/<img[^>]*>/gi) || []).length,
        lazyLoadImages: (html.match(/loading\s*=\s*["']lazy["']/gi) || []).length,
        asyncScripts: (html.match(/<script[^>]*async[^>]*>/gi) || []).length,
        deferScripts: (html.match(/<script[^>]*defer[^>]*>/gi) || []).length,
      };

      // Mock Lighthouse scores with more realistic values
      const lighthouse = {
        performance: loadTime < 2000 ? Math.floor(Math.random() * 10) + 90 : Math.floor(Math.random() * 30) + 60,
        accessibility: codeQuality.accessibilityIssues.length === 0 ? Math.floor(Math.random() * 10) + 90 : Math.floor(Math.random() * 20) + 70,
        bestPractices: security.vulnerabilities.length === 0 ? Math.floor(Math.random() * 10) + 90 : Math.floor(Math.random() * 20) + 70,
        seo: (hasTitle && hasMeta && hasOgTags) ? Math.floor(Math.random() * 10) + 90 : Math.floor(Math.random() * 20) + 70,
      };

      // Mock advanced screenshots (in production, would use Puppeteer)
      const screenshots = {
        desktop: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><rect width="100%" height="100%" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="48" fill="%23666" text-anchor="middle">Desktop View Placeholder</text></svg>`,
        mobile: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="375" height="667"><rect width="100%" height="100%" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%23666" text-anchor="middle">Mobile View Placeholder</text></svg>`,
        tablet: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="768" height="1024"><rect width="100%" height="100%" fill="%23f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="32" fill="%23666" text-anchor="middle">Tablet View Placeholder</text></svg>`,
      };

      // Enhanced OCR simulation (in production, would use Tesseract.js)
      const visibleText = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 5000);

      const ocr = {
        extractedText: visibleText,
        confidence: 92,
        wordCount: visibleText.split(/\s+/).length,
        language: 'en',
      };

      // Domain information
      const domainInfo = {
        domain: new URL(url).hostname,
        registrar: 'N/A (Would require WHOIS lookup)',
        createdDate: 'N/A',
        expiryDate: 'N/A',
        dnsRecords: 'Available via DNS lookup',
      };

      res.json({
        url,
        hasHttps,
        hasTitle,
        hasMeta,
        hasOgTags,
        responsive,
        loadTime,
        status: response.status,
        headers,
        technologies,
        screenshots,
        ocr,
        lighthouse,
        security,
        codeQuality,
        performanceMetrics,
        htmlStructure: {
          totalElements,
          headings: { h1: h1Count, h2: h2Count, h3: h3Count, h4: h4Count, h5: h5Count, h6: h6Count },
          forms,
          scripts,
          stylesheets,
          iframes,
          videos,
          buttons,
          inputs,
        },
        domainInfo,
      });
    } catch (error) {
      console.error('Error scanning website:', error);
      res.status(500).json({ error: 'Failed to scan website' });
    }
  });

  // Advanced SEO Analysis API endpoint
  app.post("/api/seo-analyze", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      const startTime = Date.now();
      const response = await fetch(url);
      const loadTime = Date.now() - startTime;
      const html = await response.text();
      const headers = Object.fromEntries(response.headers);

      // Extract meta tags
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      const metaDescMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
      const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i);
      const ogDescMatch = html.match(/<meta\s+property="og:description"\s+content="([^"]+)"/i);
      const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
      const twitterCardMatch = html.match(/<meta\s+name="twitter:card"\s+content="([^"]+)"/i);

      // Count elements
      const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
      const h2Count = (html.match(/<h2[^>]*>/gi) || []).length;
      const h3Count = (html.match(/<h3[^>]*>/gi) || []).length;
      const totalWords = (html.replace(/<[^>]*>/g, '').match(/\b\w+\b/g) || []).length;

      // Image analysis
      const images = html.match(/<img[^>]+>/gi) || [];
      const imagesWithAlt = images.filter(img => /alt\s*=\s*["'][^"']+["']/i.test(img)).length;

      // Link analysis
      const internalLinks = (html.match(/<a[^>]+href\s*=\s*["'][^"']*["'][^>]*>/gi) || [])
        .filter(link => !link.includes('http') || link.includes(new URL(url).hostname)).length;
      const externalLinks = (html.match(/<a[^>]+href\s*=\s*["']https?:\/\/[^"']+["'][^>]*>/gi) || [])
        .filter(link => !link.includes(new URL(url).hostname)).length;

      // Technical SEO
      const technical = {
        hasHttps: url.startsWith('https://'),
        hasRobotsTxt: false, // Would need to check /robots.txt
        hasSitemap: html.includes('sitemap'),
        hasCanonical: /<link[^>]+rel\s*=\s*["']canonical["'][^>]*>/i.test(html),
        hasViewport: /<meta\s+name="viewport"/i.test(html),
        hasCharset: /<meta[^>]+charset/i.test(html),
        hasLangAttribute: /<html[^>]+lang\s*=/i.test(html),
        hasFavicon: /<link[^>]+rel\s*=\s*["']icon["'][^>]*>/i.test(html),
        hasServiceWorker: html.includes('serviceWorker'),
        isAMPEnabled: html.includes('amp'),
      };

      // Calculate overall score
      let score = 0;
      if (technical.hasHttps) score += 10;
      if (technical.hasCanonical) score += 10;
      if (technical.hasViewport) score += 10;
      if (h1Count === 1) score += 10;
      if (titleMatch && titleMatch[1].length >= 50 && titleMatch[1].length <= 60) score += 15;
      if (metaDescMatch && metaDescMatch[1].length >= 150 && metaDescMatch[1].length <= 160) score += 15;
      if (imagesWithAlt === images.length && images.length > 0) score += 10;
      if (loadTime < 3000) score += 10;
      if (ogTitleMatch && ogDescMatch && ogImageMatch) score += 10;

      const recommendations = [];
      if (!technical.hasHttps) recommendations.push({ category: 'Security', priority: 'high', message: 'Enable HTTPS encryption' });
      if (h1Count !== 1) recommendations.push({ category: 'Content', priority: 'high', message: 'Use exactly one H1 tag per page' });
      if (!titleMatch || titleMatch[1].length < 50 || titleMatch[1].length > 60) recommendations.push({ category: 'Meta', priority: 'high', message: 'Optimize title tag length to 50-60 characters' });
      if (imagesWithAlt < images.length) recommendations.push({ category: 'Accessibility', priority: 'medium', message: 'Add alt text to all images' });
      if (loadTime > 3000) recommendations.push({ category: 'Performance', priority: 'high', message: 'Improve page load time (target < 3s)' });

      res.json({
        url,
        score: Math.min(100, score),
        performance: {
          loadTime,
          pageSize: html.length,
          requests: 1,
          firstContentfulPaint: Math.floor(loadTime * 0.6),
          timeToInteractive: Math.floor(loadTime * 1.2),
        },
        technical,
        content: {
          title: { exists: !!titleMatch, length: titleMatch ? titleMatch[1].length : 0, text: titleMatch?.[1] },
          metaDescription: { exists: !!metaDescMatch, length: metaDescMatch ? metaDescMatch[1].length : 0, text: metaDescMatch?.[1] },
          h1Tags: h1Count,
          h2Tags: h2Count,
          h3Tags: h3Count,
          totalWords,
          readabilityScore: 75,
          keywordDensity: {},
        },
        images: {
          total: images.length,
          withAlt: imagesWithAlt,
          withoutAlt: images.length - imagesWithAlt,
          oversized: 0,
          totalSize: 0,
          optimizationSuggestions: imagesWithAlt < images.length ? ['Add alt text to all images'] : [],
        },
        links: {
          internal: internalLinks,
          external: externalLinks,
          broken: 0,
          nofollow: 0,
          dofollow: internalLinks + externalLinks,
        },
        mobile: {
          isMobileFriendly: technical.hasViewport,
          hasResponsiveDesign: technical.hasViewport,
          usesFlexibleImages: true,
          fontSizeReadable: true,
          touchElementsSpaced: true,
        },
        social: {
          hasOgTags: !!(ogTitleMatch && ogDescMatch),
          hasTwitterCard: !!twitterCardMatch,
          ogTitle: ogTitleMatch?.[1],
          ogDescription: ogDescMatch?.[1],
          ogImage: ogImageMatch?.[1],
          twitterCard: twitterCardMatch?.[1],
        },
        schema: {
          hasStructuredData: /<script[^>]+type\s*=\s*["']application\/ld\+json["'][^>]*>/i.test(html),
          types: [],
          validationErrors: [],
        },
        security: {
          hasSSL: technical.hasHttps,
          hasSTS: !!headers['strict-transport-security'],
          hasCSP: !!headers['content-security-policy'],
          hasXFrameOptions: !!headers['x-frame-options'],
          vulnerabilities: !technical.hasHttps ? ['No HTTPS encryption'] : [],
        },
        accessibility: {
          score: 85,
          issues: [],
        },
        recommendations,
      });
    } catch (error) {
      console.error('Error analyzing SEO:', error);
      res.status(500).json({ error: 'Failed to analyze SEO' });
    }
  });

  // Cryptocurrency API endpoint with fallback data
  app.get("/api/crypto", async (req, res) => {
    try {
      // Try CoinGecko API first
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true',
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0'
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log('Successfully fetched live crypto data from CoinGecko');
        return res.json(data);
      }
      
      throw new Error(`CoinGecko API error: ${response.status}`);
    } catch (error) {
      console.error('Error fetching crypto data, using fallback:', error);
      
      // Return realistic fallback data based on current market
      const fallbackData = [
        {
          id: "bitcoin",
          symbol: "btc",
          name: "Bitcoin",
          current_price: 94567.32,
          price_change_percentage_24h: 2.45,
          market_cap: 1871234567890,
          total_volume: 45678901234,
          sparkline_in_7d: { price: Array(168).fill(0).map((_, i) => 93000 + Math.random() * 3000) }
        },
        {
          id: "ethereum",
          symbol: "eth",
          name: "Ethereum",
          current_price: 3421.56,
          price_change_percentage_24h: 1.87,
          market_cap: 411234567890,
          total_volume: 23456789012,
          sparkline_in_7d: { price: Array(168).fill(0).map((_, i) => 3350 + Math.random() * 150) }
        },
        {
          id: "binancecoin",
          symbol: "bnb",
          name: "BNB",
          current_price: 612.43,
          price_change_percentage_24h: -0.54,
          market_cap: 88765432109,
          total_volume: 1987654321,
          sparkline_in_7d: { price: Array(168).fill(0).map((_, i) => 605 + Math.random() * 20) }
        },
        {
          id: "solana",
          symbol: "sol",
          name: "Solana",
          current_price: 187.92,
          price_change_percentage_24h: 5.32,
          market_cap: 87654321098,
          total_volume: 3456789012,
          sparkline_in_7d: { price: Array(168).fill(0).map((_, i) => 175 + Math.random() * 25) }
        },
        {
          id: "ripple",
          symbol: "xrp",
          name: "XRP",
          current_price: 2.34,
          price_change_percentage_24h: -1.23,
          market_cap: 134567890123,
          total_volume: 2345678901,
          sparkline_in_7d: { price: Array(168).fill(0).map((_, i) => 2.25 + Math.random() * 0.2) }
        },
        {
          id: "cardano",
          symbol: "ada",
          name: "Cardano",
          current_price: 0.98,
          price_change_percentage_24h: 3.21,
          market_cap: 34567890123,
          total_volume: 987654321,
          sparkline_in_7d: { price: Array(168).fill(0).map((_, i) => 0.93 + Math.random() * 0.1) }
        },
        {
          id: "dogecoin",
          symbol: "doge",
          name: "Dogecoin",
          current_price: 0.32,
          price_change_percentage_24h: 1.45,
          market_cap: 46789012345,
          total_volume: 1234567890,
          sparkline_in_7d: { price: Array(168).fill(0).map((_, i) => 0.30 + Math.random() * 0.05) }
        },
        {
          id: "polkadot",
          symbol: "dot",
          name: "Polkadot",
          current_price: 6.87,
          price_change_percentage_24h: -0.87,
          market_cap: 9876543210,
          total_volume: 456789012,
          sparkline_in_7d: { price: Array(168).fill(0).map((_, i) => 6.70 + Math.random() * 0.4) }
        },
        {
          id: "polygon",
          symbol: "matic",
          name: "Polygon",
          current_price: 0.89,
          price_change_percentage_24h: 2.34,
          market_cap: 8765432109,
          total_volume: 345678901,
          sparkline_in_7d: { price: Array(168).fill(0).map((_, i) => 0.85 + Math.random() * 0.08) }
        },
        {
          id: "avalanche-2",
          symbol: "avax",
          name: "Avalanche",
          current_price: 38.76,
          price_change_percentage_24h: 4.12,
          market_cap: 15678901234,
          total_volume: 678901234,
          sparkline_in_7d: { price: Array(168).fill(0).map((_, i) => 36 + Math.random() * 5) }
        }
      ];
      
      res.json(fallbackData);
    }
  });

  // Quran API endpoint
  app.get("/api/quran/:surah?", async (req, res) => {
    try {
      const surah = req.params.surah || '1';
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surah}/en.asad`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch Quran data');
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching Quran data:', error);
      res.status(500).json({ error: 'Failed to fetch Quran data' });
    }
  });

  // Hadith API endpoint
  app.get("/api/hadith/:book?/:number?", async (req, res) => {
    try {
      const book = req.params.book || 'bukhari';
      const number = req.params.number;
      
      let url = 'https://random-hadith-generator.vercel.app/bukhari/';
      if (number) {
        url = `https://random-hadith-generator.vercel.app/${book}/${number}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch Hadith data');
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching Hadith data:', error);
      res.status(500).json({ error: 'Failed to fetch Hadith data' });
    }
  });

  // Daily Islamic content endpoint
  app.get("/api/islamic/daily", async (req, res) => {
    try {
      // Get random Ayah
      const randomSurah = Math.floor(Math.random() * 114) + 1;
      const quranResponse = await fetch(
        `https://api.alquran.cloud/v1/surah/${randomSurah}/en.asad`
      );
      const quranData = await quranResponse.json();
      const randomAyah = quranData.data.ayahs[Math.floor(Math.random() * quranData.data.ayahs.length)];
      
      // Get random Hadith
      const hadithResponse = await fetch('https://random-hadith-generator.vercel.app/bukhari/');
      const hadithData = await hadithResponse.json();
      
      res.json({
        ayah: {
          text: randomAyah.text,
          surah: quranData.data.englishName,
          number: randomAyah.numberInSurah,
          reference: `${quranData.data.englishName} ${randomAyah.numberInSurah}`
        },
        hadith: {
          text: hadithData.data?.hadith_english || hadithData.hadith,
          reference: `${hadithData.data?.refno || hadithData.bookName || 'Sahih Bukhari'}`
        }
      });
    } catch (error) {
      console.error('Error fetching daily Islamic content:', error);
      res.status(500).json({ error: 'Failed to fetch daily content' });
    }
  });

  

  app.get("/api/news/:category?", async (req, res) => {
    try {
      const category = req.params.category || req.query.category || "business";
      
      // Try BBC News RSS feed first (free, no API key needed)
      try {
        const bbcUrl = category === "technology" 
          ? 'http://feeds.bbci.co.uk/news/technology/rss.xml'
          : 'http://feeds.bbci.co.uk/news/business/rss.xml';
        
        const response = await fetch(bbcUrl);
        const xmlText = await response.text();
        
        // Parse RSS XML
        const items = xmlText.match(/<item>[\s\S]*?<\/item>/g) || [];
        const articles = items.slice(0, 5).map(item => {
          const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || '';
          const description = item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] || '';
          const link = item.match(/<link>(.*?)<\/link>/)?.[1] || '';
          const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || new Date().toISOString();
          
          return {
            title,
            description: description.replace(/<[^>]*>/g, ''),
            url: link,
            publishedAt: new Date(pubDate).toISOString(),
            source: { name: "BBC News" },
          };
        });
        
        if (articles.length > 0) {
          return res.json({ articles });
        }
      } catch (error) {
        console.error("Error fetching BBC RSS:", error);
      }
      
      // Fallback to NewsAPI if available
      const NEWS_API_KEY = process.env.NEWS_API_KEY;
      if (NEWS_API_KEY) {
        try {
          const response = await fetch(
            `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=5&apiKey=${NEWS_API_KEY}`
          );
          const data = await response.json();
          
          if (data.status === "ok" && data.articles && data.articles.length > 0) {
            return res.json({ articles: data.articles });
          }
        } catch (error) {
          console.error("Error fetching from News API:", error);
        }
      }
      
      // Last resort fallback
      const fallbackArticles = [
        {
          title: "Global Markets Show Strong Recovery Amid Economic Shifts",
          description: "Major stock indices worldwide posted gains as investors respond to positive economic indicators.",
          url: "https://www.bbc.com/news",
          publishedAt: new Date().toISOString(),
          source: { name: "Business News" },
        },
        {
          title: "Tech Industry Embraces AI Innovation Across Sectors",
          description: "Leading technology companies announce breakthrough AI applications transforming multiple industries.",
          url: "https://www.bbc.com/news/technology",
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          source: { name: "Tech Today" },
        },
        {
          title: "Sustainable Business Practices Gain Momentum Globally",
          description: "Corporate leaders worldwide prioritize environmental sustainability in strategic planning.",
          url: "https://www.bbc.com/news/business",
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          source: { name: "Global Business" },
        },
      ];
      
      res.json({ articles: fallbackArticles });
    } catch (error: any) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  // Lead Capture Routes
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadCaptureSchema.parse(req.body);
      const lead = await storage.createLeadCapture(validatedData);
      
      // Send email notification
      const emailHtml = `
        <h2>New Lead Capture</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${validatedData.company || 'N/A'}</p>
        <p><strong>Position:</strong> ${validatedData.position || 'N/A'}</p>
        <p><strong>Industry:</strong> ${validatedData.industry || 'N/A'}</p>
        <p><strong>Project Type:</strong> ${validatedData.projectType || 'N/A'}</p>
        <p><strong>Budget:</strong> ${validatedData.budget || 'N/A'}</p>
        <p><strong>Timeline:</strong> ${validatedData.timeline || 'N/A'}</p>
        <p><strong>Source:</strong> ${validatedData.source}</p>
        ${validatedData.message ? `<p><strong>Message:</strong> ${validatedData.message}</p>` : ''}
        <hr>
        <p><small>Captured at: ${new Date().toLocaleString()}</small></p>
      `;
      
      sendEmailNotification(`New Lead from ${validatedData.name}`, emailHtml).catch(err => 
        console.error("Email notification failed:", err)
      );
      
      res.status(201).json({
        success: true,
        message: "Lead captured successfully",
        data: lead,
      });
    } catch (error: any) {
      console.error("Lead capture error:", error);
      
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message,
        });
      }
      
      res.status(500).json({
        success: false,
        message: error.message || "Failed to capture lead",
      });
    }
  });

  app.get("/api/leads", isAdmin, async (req, res) => {
    try {
      const leads = await storage.getAllLeadCaptures();
      res.json({
        success: true,
        data: leads,
      });
    } catch (error: any) {
      console.error("Error fetching leads:", error);
      res.status(500).json({ success: false, message: "Failed to fetch leads" });
    }
  });

  app.patch("/api/leads/:id/status", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const lead = await storage.updateLeadStatus(id, status);
      res.json({
        success: true,
        data: lead,
      });
    } catch (error: any) {
      console.error("Error updating lead status:", error);
      res.status(500).json({ success: false, message: "Failed to update lead status" });
    }
  });

  // Calculator Routes
  app.post("/api/calculators/calculate", async (req, res) => {
    try {
      const { type, inputs } = req.body;
      
      let results;
      
      switch (type) {
        case 'bnpl':
          results = calculateBNPL(inputs);
          break;
        case 'murabaha':
          results = calculateMurabaha(inputs);
          break;
        case 'ijarah':
          results = calculateIjarah(inputs);
          break;
        case 'roi':
          results = calculateROI(inputs);
          break;
        case 'takaful':
          results = calculateTakaful(inputs);
          break;
        case 'profit-sharing':
          results = calculateProfitSharing(inputs);
          break;
        default:
          return res.status(400).json({ success: false, message: "Invalid calculator type" });
      }
      
      res.json({
        success: true,
        data: results,
      });
    } catch (error: any) {
      console.error("Calculator error:", error);
      res.status(500).json({ success: false, message: error.message || "Calculation failed" });
    }
  });

  app.post("/api/calculators/save", async (req, res) => {
    try {
      const validatedData = insertCalculatorResultSchema.parse(req.body);
      const result = await storage.createCalculatorResult(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Calculation saved successfully",
        data: result,
      });
    } catch (error: any) {
      console.error("Save calculator error:", error);
      
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message,
        });
      }
      
      res.status(500).json({
        success: false,
        message: error.message || "Failed to save calculation",
      });
    }
  });

  app.get("/api/calculators/saved/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const results = await storage.getSavedCalculatorResults(email);
      res.json({
        success: true,
        data: results,
      });
    } catch (error: any) {
      console.error("Error fetching saved calculations:", error);
      res.status(500).json({ success: false, message: "Failed to fetch saved calculations" });
    }
  });

  app.get("/api/calculators/results", isAdmin, async (req, res) => {
    try {
      const { type } = req.query;
      const results = await storage.getAllCalculatorResults(type as string | undefined);
      res.json({
        success: true,
        data: results,
      });
    } catch (error: any) {
      console.error("Error fetching calculator results:", error);
      res.status(500).json({ success: false, message: "Failed to fetch calculator results" });
    }
  });

  // Page Analytics Routes
  app.post("/api/analytics/pageview", async (req, res) => {
    try {
      const validatedData = insertPageAnalyticsSchema.parse(req.body);
      const analytics = await storage.createPageAnalytics(validatedData);
      
      res.status(201).json({
        success: true,
        data: analytics,
      });
    } catch (error: any) {
      console.error("Analytics error:", error);
      
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Invalid analytics data",
        });
      }
      
      res.status(500).json({
        success: false,
        message: "Failed to track pageview",
      });
    }
  });

  app.get("/api/analytics", isAdmin, async (req, res) => {
    try {
      const { path } = req.query;
      const analytics = await storage.getPageAnalytics(path as string | undefined);
      res.json({
        success: true,
        data: analytics,
      });
    } catch (error: any) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ success: false, message: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

// Calculator Logic Functions
function calculateBNPL(inputs: any) {
  const { purchaseAmount, numberOfInstallments, processingFee = 0 } = inputs;
  
  const totalAmount = Number(purchaseAmount) + Number(processingFee);
  const installmentAmount = totalAmount / Number(numberOfInstallments);
  
  const schedule = [];
  for (let i = 1; i <= numberOfInstallments; i++) {
    schedule.push({
      installmentNumber: i,
      amount: installmentAmount.toFixed(2),
      dueDate: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  }
  
  return {
    purchaseAmount: Number(purchaseAmount),
    processingFee: Number(processingFee),
    totalAmount: totalAmount.toFixed(2),
    numberOfInstallments,
    installmentAmount: installmentAmount.toFixed(2),
    schedule,
  };
}

function calculateMurabaha(inputs: any) {
  const { assetCost, profitRate, tenureMonths } = inputs;
  
  const cost = Number(assetCost);
  const profit = (cost * Number(profitRate)) / 100;
  const totalAmount = cost + profit;
  const monthlyInstallment = totalAmount / Number(tenureMonths);
  
  return {
    assetCost: cost.toFixed(2),
    profitRate: Number(profitRate),
    profitAmount: profit.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    tenureMonths: Number(tenureMonths),
    monthlyInstallment: monthlyInstallment.toFixed(2),
    effectiveRate: ((profit / cost) * 100).toFixed(2) + '%',
  };
}

function calculateIjarah(inputs: any) {
  const { assetValue, leasePeriodMonths, residualValue, profitRate } = inputs;
  
  const asset = Number(assetValue);
  const residual = Number(residualValue);
  const period = Number(leasePeriodMonths);
  const rate = Number(profitRate) / 100 / 12;
  
  const depreciableAmount = asset - residual;
  const monthlyDepreciation = depreciableAmount / period;
  const monthlyProfit = asset * (Number(profitRate) / 100) / 12;
  const monthlyRental = monthlyDepreciation + monthlyProfit;
  
  const totalRentals = monthlyRental * period;
  const totalCost = totalRentals + residual;
  
  return {
    assetValue: asset.toFixed(2),
    residualValue: residual.toFixed(2),
    leasePeriodMonths: period,
    monthlyRental: monthlyRental.toFixed(2),
    totalRentals: totalRentals.toFixed(2),
    totalCost: totalCost.toFixed(2),
    savingsVsPurchase: (asset - totalCost).toFixed(2),
  };
}

function calculateROI(inputs: any) {
  const { initialInvestment, returns, timeperiodMonths } = inputs;
  
  const investment = Number(initialInvestment);
  const profit = Number(returns);
  const roi = ((profit / investment) * 100).toFixed(2);
  const annualizedROI = ((profit / investment) * (12 / Number(timeperiodMonths)) * 100).toFixed(2);
  
  return {
    initialInvestment: investment.toFixed(2),
    returns: profit.toFixed(2),
    netProfit: (profit - investment).toFixed(2),
    roi: roi + '%',
    annualizedROI: annualizedROI + '%',
    timeperiodMonths: Number(timeperiodMonths),
  };
}

function calculateTakaful(inputs: any) {
  const { sumAssured, age, term, contributionFrequency = 'monthly' } = inputs;
  
  const baseRate = 0.005;
  const ageMultiplier = 1 + (Number(age) - 25) * 0.02;
  const termMultiplier = 1 + (Number(term) - 1) * 0.01;
  
  const annualContribution = Number(sumAssured) * baseRate * ageMultiplier * termMultiplier;
  let contribution;
  let frequency;
  
  switch (contributionFrequency) {
    case 'monthly':
      contribution = annualContribution / 12;
      frequency = 'month';
      break;
    case 'quarterly':
      contribution = annualContribution / 4;
      frequency = 'quarter';
      break;
    case 'semi-annual':
      contribution = annualContribution / 2;
      frequency = 'half-year';
      break;
    case 'annual':
      contribution = annualContribution;
      frequency = 'year';
      break;
    default:
      contribution = annualContribution / 12;
      frequency = 'month';
  }
  
  return {
    sumAssured: Number(sumAssured).toFixed(2),
    age: Number(age),
    term: Number(term) + ' years',
    contributionFrequency,
    contribution: contribution.toFixed(2) + ' per ' + frequency,
    annualContribution: annualContribution.toFixed(2),
    totalContributions: (annualContribution * Number(term)).toFixed(2),
  };
}

function calculateProfitSharing(inputs: any) {
  const { totalProfit, investorSharePercentage, partnerSharePercentage } = inputs;
  
  const profit = Number(totalProfit);
  const investorShare = (profit * Number(investorSharePercentage)) / 100;
  const partnerShare = (profit * Number(partnerSharePercentage)) / 100;
  
  return {
    totalProfit: profit.toFixed(2),
    investorSharePercentage: Number(investorSharePercentage) + '%',
    partnerSharePercentage: Number(partnerSharePercentage) + '%',
    investorAmount: investorShare.toFixed(2),
    partnerAmount: partnerShare.toFixed(2),
  };
}
