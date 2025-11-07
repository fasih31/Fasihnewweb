import {
  type ContactMessage,
  type InsertContactMessage,
  type User,
  type InsertUser,
  type Article,
  type InsertArticle,
  type Testimonial,
  type InsertTestimonial,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber,
  type CareerInquiry,
  type InsertCareerInquiry,
  type LeadCapture,
  type InsertLeadCapture,
  type CalculatorResult,
  type InsertCalculatorResult,
  type PageAnalytics,
  type InsertPageAnalytics,
  contactMessages,
  users,
  articles,
  testimonials,
  newsletterSubscribers,
  careerInquiries,
  leadCaptures,
  calculatorResults,
  pageAnalytics,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;

  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | null>;
  upsertUser(user: InsertUser): Promise<User>;

  createArticle(article: InsertArticle): Promise<Article>;
  updateArticle(id: string, article: Partial<InsertArticle>): Promise<Article | undefined>;
  deleteArticle(id: string): Promise<void>;
  getArticle(id: string): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  getAllArticles(publishedOnly?: boolean): Promise<Article[]>;
  incrementArticleViews(id: string): Promise<void>;

  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<void>;
  getAllTestimonials(featuredOnly?: boolean): Promise<Testimonial[]>;

  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  unsubscribeNewsletter(email: string): Promise<void>;

  createCareerInquiry(inquiry: InsertCareerInquiry): Promise<CareerInquiry>;
  getAllCareerInquiries(): Promise<CareerInquiry[]>;

  createLeadCapture(lead: InsertLeadCapture): Promise<LeadCapture>;
  getAllLeadCaptures(): Promise<LeadCapture[]>;
  updateLeadStatus(id: string, status: string): Promise<LeadCapture | undefined>;

  createCalculatorResult(result: InsertCalculatorResult): Promise<CalculatorResult>;
  getAllCalculatorResults(calculatorType?: string): Promise<CalculatorResult[]>;
  getSavedCalculatorResults(email: string): Promise<CalculatorResult[]>;

  createPageAnalytics(analytics: InsertPageAnalytics): Promise<PageAnalytics>;
  getPageAnalytics(pagePath?: string): Promise<PageAnalytics[]>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const result = await db.select().from(users).where(eq(users.email, email.toLowerCase().trim()));
      if (!result || result.length === 0) {
        return null;
      }
      return result[0];
    } catch (error: any) {
      console.error('Error getting user by email:', {
        email,
        error: error.message,
        stack: error.stack
      });
      return null; // Return null instead of throwing to allow app to continue
    }
  }

  async upsertUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: userData.email,
          name: userData.name,
          picture: userData.picture,
          passwordHash: userData.passwordHash,
        },
      })
      .returning();
    return user;
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const [newArticle] = await db.insert(articles).values(article).returning();
    return newArticle;
  }

  async updateArticle(id: string, articleData: Partial<InsertArticle>): Promise<Article | undefined> {
    const [updated] = await db
      .update(articles)
      .set({ ...articleData, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning();
    return updated;
  }

  async deleteArticle(id: string): Promise<void> {
    await db.delete(articles).where(eq(articles.id, id));
  }

  async getArticle(id: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.id, id));
    return article;
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.slug, slug));
    return article;
  }

  async getAllArticles(publishedOnly: boolean = false): Promise<Article[]> {
    if (publishedOnly) {
      return await db
        .select()
        .from(articles)
        .where(eq(articles.published, true))
        .orderBy(desc(articles.publishedAt));
    }
    return await db.select().from(articles).orderBy(desc(articles.createdAt));
  }

  async incrementArticleViews(id: string): Promise<void> {
    await db
      .update(articles)
      .set({ views: sql`${articles.views} + 1` })
      .where(eq(articles.id, id));
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }

  async updateTestimonial(id: string, testimonialData: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updated] = await db
      .update(testimonials)
      .set(testimonialData)
      .where(eq(testimonials.id, id))
      .returning();
    return updated;
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  async getAllTestimonials(featuredOnly: boolean = false): Promise<Testimonial[]> {
    try {
      if (featuredOnly) {
        const results = await db
          .select()
          .from(testimonials)
          .where(eq(testimonials.featured, true))
          .orderBy(testimonials.order);
        return results || [];
      }
      const results = await db.select().from(testimonials).orderBy(testimonials.order);
      return results || [];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  }

  async createNewsletterSubscriber(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const [subscriber] = await db
      .insert(newsletterSubscribers)
      .values(insertSubscriber)
      .onConflictDoUpdate({
        target: newsletterSubscribers.email,
        set: {
          subscribed: true,
          subscribedAt: new Date(),
          unsubscribedAt: null,
        },
      })
      .returning();
    return subscriber;
  }

  async getAllNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.subscribed, true))
      .orderBy(desc(newsletterSubscribers.subscribedAt));
  }

  async unsubscribeNewsletter(email: string): Promise<void> {
    await db
      .update(newsletterSubscribers)
      .set({
        subscribed: false,
        unsubscribedAt: new Date(),
      })
      .where(eq(newsletterSubscribers.email, email));
  }

  async createCareerInquiry(insertInquiry: InsertCareerInquiry): Promise<CareerInquiry> {
    const [inquiry] = await db.insert(careerInquiries).values(insertInquiry).returning();
    return inquiry;
  }

  async getAllCareerInquiries(): Promise<CareerInquiry[]> {
    return await db.select().from(careerInquiries).orderBy(desc(careerInquiries.createdAt));
  }

  async createLeadCapture(insertLead: InsertLeadCapture): Promise<LeadCapture> {
    const [lead] = await db.insert(leadCaptures).values(insertLead).returning();
    return lead;
  }

  async getAllLeadCaptures(): Promise<LeadCapture[]> {
    return await db.select().from(leadCaptures).orderBy(desc(leadCaptures.createdAt));
  }

  async updateLeadStatus(id: string, status: string): Promise<LeadCapture | undefined> {
    const [updated] = await db
      .update(leadCaptures)
      .set({ status })
      .where(eq(leadCaptures.id, id))
      .returning();
    return updated;
  }

  async createCalculatorResult(insertResult: InsertCalculatorResult): Promise<CalculatorResult> {
    const [result] = await db.insert(calculatorResults).values(insertResult).returning();
    return result;
  }

  async getAllCalculatorResults(calculatorType?: string): Promise<CalculatorResult[]> {
    if (calculatorType) {
      return await db
        .select()
        .from(calculatorResults)
        .where(eq(calculatorResults.calculatorType, calculatorType))
        .orderBy(desc(calculatorResults.createdAt));
    }
    return await db.select().from(calculatorResults).orderBy(desc(calculatorResults.createdAt));
  }

  async getSavedCalculatorResults(email: string): Promise<CalculatorResult[]> {
    return await db
      .select()
      .from(calculatorResults)
      .where(eq(calculatorResults.email, email))
      .orderBy(desc(calculatorResults.createdAt));
  }

  async createPageAnalytics(insertAnalytics: InsertPageAnalytics): Promise<PageAnalytics> {
    const [analytics] = await db.insert(pageAnalytics).values(insertAnalytics).returning();
    return analytics;
  }

  async getPageAnalytics(pagePath?: string): Promise<PageAnalytics[]> {
    if (pagePath) {
      return await db
        .select()
        .from(pageAnalytics)
        .where(eq(pageAnalytics.pagePath, pagePath))
        .orderBy(desc(pageAnalytics.viewedAt));
    }
    return await db.select().from(pageAnalytics).orderBy(desc(pageAnalytics.viewedAt));
  }
}

export const storage = new DatabaseStorage();