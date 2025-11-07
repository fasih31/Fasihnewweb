import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Contact form submissions
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Simple user for article authorship tracking
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  name: varchar("name").notNull(),
  picture: varchar("picture"),
  passwordHash: varchar("password_hash"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Blog Articles table with SEO metadata
export const articles = pgTable("articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  authorId: varchar("author_id").references(() => users.id).notNull(),
  featuredImage: text("featured_image"),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  readTime: integer("read_time").notNull(),
  views: integer("views").default(0).notNull(),
  
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords"),
  ogImage: text("og_image"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
}).extend({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  category: z.string().min(2, "Category is required"),
  readTime: z.number().min(1, "Read time must be at least 1 minute"),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;

// TypeScript interfaces for frontend data (not stored in DB)
export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'AI' | 'Web3' | 'FinTech' | 'EdTech' | 'eCommerce';
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  caseStudy?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  offerings: string[];
  icon: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
}

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  image: text("image"),
  featured: boolean("featured").default(false).notNull(),
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  company: z.string().min(2, "Company must be at least 2 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  rating: z.number().min(1).max(5),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

// Newsletter subscribers table
export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name"),
  subscribed: boolean("subscribed").default(true).notNull(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribed_at"),
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  subscribedAt: true,
  unsubscribedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().optional(),
});

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;

// Career inquiries table
export const careerInquiries = pgTable("career_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  inquiryType: text("inquiry_type").notNull(),
  message: text("message").notNull(),
  resumeUrl: text("resume_url"),
  linkedinUrl: text("linkedin_url"),
  portfolioUrl: text("portfolio_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCareerInquirySchema = createInsertSchema(careerInquiries).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  inquiryType: z.enum(["freelance", "collaboration", "fulltime", "consulting", "other"], {
    errorMap: () => ({ message: "Please select an inquiry type" }),
  }),
  message: z.string().min(20, "Message must be at least 20 characters"),
  resumeUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
});

export type CareerInquiry = typeof careerInquiries.$inferSelect;
export type InsertCareerInquiry = z.infer<typeof insertCareerInquirySchema>;

// Lead captures table - for multi-step forms and consultation requests
export const leadCaptures = pgTable("lead_captures", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  position: text("position"),
  industry: text("industry"),
  projectType: text("project_type"),
  budget: text("budget"),
  timeline: text("timeline"),
  message: text("message"),
  source: text("source").notNull(),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadCaptureSchema = createInsertSchema(leadCaptures).omit({
  id: true,
  createdAt: true,
  status: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  industry: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").optional(),
  source: z.string().min(1, "Source is required"),
});

export type LeadCapture = typeof leadCaptures.$inferSelect;
export type InsertLeadCapture = z.infer<typeof insertLeadCaptureSchema>;

// Calculator results table - to track calculator usage and save results
export const calculatorResults = pgTable("calculator_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  calculatorType: text("calculator_type").notNull(),
  inputs: text("inputs").notNull(),
  results: text("results").notNull(),
  email: text("email"),
  saved: boolean("saved").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCalculatorResultSchema = createInsertSchema(calculatorResults).omit({
  id: true,
  createdAt: true,
}).extend({
  calculatorType: z.enum(["bnpl", "murabaha", "ijarah", "roi", "takaful", "profit-sharing"], {
    errorMap: () => ({ message: "Please select a valid calculator type" }),
  }),
  inputs: z.string().min(1, "Inputs are required"),
  results: z.string().min(1, "Results are required"),
  email: z.string().email("Please enter a valid email address").optional(),
  saved: z.boolean().default(false),
});

export type CalculatorResult = typeof calculatorResults.$inferSelect;
export type InsertCalculatorResult = z.infer<typeof insertCalculatorResultSchema>;

// Page analytics table - to track page views and engagement
export const pageAnalytics = pgTable("page_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pagePath: text("page_path").notNull(),
  pageTitle: text("page_title"),
  domain: text("domain"),
  referrer: text("referrer"),
  sessionDuration: integer("session_duration"),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
});

export const insertPageAnalyticsSchema = createInsertSchema(pageAnalytics).omit({
  id: true,
  viewedAt: true,
}).extend({
  pagePath: z.string().min(1, "Page path is required"),
  pageTitle: z.string().optional(),
  domain: z.string().optional(),
  referrer: z.string().optional(),
  sessionDuration: z.number().min(0).optional(),
});

export type PageAnalytics = typeof pageAnalytics.$inferSelect;
export type InsertPageAnalytics = z.infer<typeof insertPageAnalyticsSchema>;
