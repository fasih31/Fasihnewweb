import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertArticleSchema } from "@shared/schema";
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
      const validatedData = insertContactMessageSchema.parse(req.body);
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

  app.get("/api/news", async (req, res) => {
    try {
      const category = req.query.category || "business";
      
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
