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
      
      // Send email notification
      const emailHtml = `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Subject:</strong> ${validatedData.subject || 'No subject'}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
      `;
      
      await sendEmailNotification(`New Contact Form: ${validatedData.subject || 'General Inquiry'}`, emailHtml);
      
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

  // LinkedIn Articles RSS endpoint
  app.get("/api/linkedin-articles", async (req, res) => {
    try {
      // LinkedIn Profile URL - replace with your actual LinkedIn profile username
      const linkedinUsername = "fasihurrehman05";
      
      // Try to fetch from LinkedIn RSS (if available) or use alternative approach
      try {
        // Note: LinkedIn deprecated RSS feeds, so we'll use a proxy service or fallback
        const response = await fetch(
          `https://www.linkedin.com/in/${linkedinUsername}/recent-activity/articles/`
        );
        
        // Since direct RSS is not available, we'll return mock data
        // In production, you would use LinkedIn API with OAuth
        const mockArticles = [
          {
            title: "Building Scalable FinTech Solutions with Modern Architecture",
            link: `https://www.linkedin.com/in/${linkedinUsername}/`,
            pubDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            description: "Exploring best practices for designing and implementing scalable financial technology solutions using microservices architecture, cloud infrastructure, and modern development practices.",
            category: "Technology"
          },
          {
            title: "The Future of Islamic Finance: Innovation Meets Tradition",
            link: `https://www.linkedin.com/in/${linkedinUsername}/`,
            pubDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            description: "How technology is transforming Islamic banking while maintaining Shariah compliance. A deep dive into digital Islamic financial products and services.",
            category: "FinTech"
          },
          {
            title: "AI-Powered EdTech: Revolutionizing Learning Experiences",
            link: `https://www.linkedin.com/in/${linkedinUsername}/`,
            pubDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
            description: "Examining how artificial intelligence and machine learning are reshaping educational technology and creating personalized learning pathways.",
            category: "Education"
          }
        ];
        
        res.json(mockArticles);
      } catch (error) {
        console.error("Error fetching LinkedIn articles:", error);
        res.json([]);
      }
    } catch (error: any) {
      console.error("Error in LinkedIn articles endpoint:", error);
      res.status(500).json({ message: "Failed to fetch LinkedIn articles" });
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
