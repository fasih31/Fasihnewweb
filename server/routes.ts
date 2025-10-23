import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactMessageSchema, 
  insertArticleSchema,
  insertTestimonialSchema,
  insertNewsletterSubscriberSchema,
  insertCareerInquirySchema,
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { setupAuth, isAuthenticated, isAdmin } from "./googleAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  await setupAuth(app);

  app.get("/api/auth/me", isAuthenticated, async (req: any, res) => {
    try {
      const user = req.user;
      const isUserAdmin = user.email === process.env.ADMIN_EMAIL;
      res.json({
        ...user,
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
        subject: req.body.subject ? sanitizeString(req.body.subject) : '',
        message: req.body.message ? sanitizeString(req.body.message) : '',
      };

      const validatedData = insertContactMessageSchema.parse(sanitizedBody);
      const message = await storage.createContactMessage(validatedData);
      
      res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: message,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: validationError.message,
        });
      } else {
        console.error("Error creating contact message:", error);
        res.status(500).json({
          success: false,
          message: "Failed to send message. Please try again later.",
        });
      }
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
        data: testimonials,
      });
    } catch (error: any) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch testimonials",
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
      
      res.status(201).json({
        success: true,
        message: "Successfully subscribed to newsletter!",
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
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      
      // Fallback mock data if API fails
      const mockData = Array.from({ length: 10 }, (_, i) => ({
        id: `crypto-${i}`,
        symbol: ['btc', 'eth', 'bnb', 'sol', 'ada', 'xrp', 'dot', 'doge', 'avax', 'matic'][i],
        name: ['Bitcoin', 'Ethereum', 'Binance Coin', 'Solana', 'Cardano', 'XRP', 'Polkadot', 'Dogecoin', 'Avalanche', 'Polygon'][i],
        current_price: Math.random() * 50000 + 100,
        price_change_percentage_24h: (Math.random() - 0.5) * 20,
        market_cap: Math.random() * 1000000000000,
        total_volume: Math.random() * 50000000000,
      }));
      
      res.json(mockData);
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

  // Website scanner API endpoint
  app.post("/api/scan-website", async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) {
        return res.status(400).json({ error: 'URL is required' });
      }

      const startTime = Date.now();
      const response = await fetch(url);
      const loadTime = Date.now() - startTime;
      const html = await response.text();

      const hasHttps = url.startsWith('https://');
      const hasTitle = /<title[^>]*>([^<]+)<\/title>/i.test(html);
      const hasMeta = /<meta\s+name="description"/i.test(html);
      const hasOgTags = /<meta\s+property="og:/i.test(html);
      const responsive = /<meta\s+name="viewport"/i.test(html);

      res.json({
        url,
        hasHttps,
        hasTitle,
        hasMeta,
        hasOgTags,
        responsive,
        loadTime,
        status: response.status,
      });
    } catch (error) {
      console.error('Error scanning website:', error);
      res.status(500).json({ error: 'Failed to scan website' });
    }
  });

  app.get("/api/news/:category?", async (req, res) => {
    try {
      const category = req.params.category || req.query.category || "business";
      
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
      
      const mockArticles = [
        {
          title: `Latest ${category} developments in tech industry`,
          description: `Important updates in the ${category} sector that are shaping the future.`,
          url: "#",
          publishedAt: new Date().toISOString(),
          source: { name: "Tech News" },
        },
        {
          title: `Major ${category} announcement from leading companies`,
          description: `Breaking news about significant changes in the ${category} landscape.`,
          url: "#",
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          source: { name: "Business Insider" },
        },
        {
          title: `${category} trends to watch in 2025`,
          description: `Analysis of emerging ${category} trends and their potential impact.`,
          url: "#",
          publishedAt: new Date(Date.now() - 172800000).toISOString(),
          source: { name: "Industry Weekly" },
        },
      ];
      
      res.json({ articles: mockArticles });
    } catch (error: any) {
      console.error("Error fetching news:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  app.get("/sitemap.xml", async (req, res) => {
    try {
      const baseUrl = process.env.REPL_SLUG 
        ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
        : req.get('host') ? `${req.protocol}://${req.get('host')}` : 'https://example.com';

      const currentDate = new Date().toISOString().split('T')[0];

      const articles = await storage.getAllArticles(true);
      const articleUrls = articles.map(article => `
  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${article.updatedAt ? new Date(article.updatedAt).toISOString().split('T')[0] : currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

      const solutions = ["fintech", "edtech", "ecommerce", "daas"];
      const solutionUrls = solutions.map(id => `
  <url>
    <loc>${baseUrl}/solutions/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>${solutionUrls}${articleUrls}
</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(sitemap);
    } catch (error: any) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  app.get("/robots.txt", (req, res) => {
    const baseUrl = process.env.REPL_SLUG 
      ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
      : req.get('host') ? `${req.protocol}://${req.get('host')}` : 'https://example.com';

    const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${baseUrl}/sitemap.xml`;

    res.header('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);

  return httpServer;
}
