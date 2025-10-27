# Fasih ur Rehman Portfolio Website

## Overview

A modern, professional portfolio website showcasing Fasih ur Rehman's expertise as a PMP-certified Product Manager specializing in FinTech, AI/AGI, Web3, EdTech, and eCommerce solutions. The application is a full-stack single-page application built with React (Vite) on the frontend and Express.js on the backend, featuring smooth scrolling navigation, dark/light theme support, responsive design, Google OAuth authentication, an admin dashboard for content management, and a comprehensive contact system.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Updates

### Advanced SEO Optimization (October 26, 2025)

**Static SEO Files Implementation:**
- Created static `sitemap.xml` in `client/public/` directory with comprehensive URL structure
  - Homepage with highest priority (1.0) and image sitemap
  - Solution pages (fintech, edtech, ecommerce, daas) with priority 0.9
  - Islamic FinTech page with priority 0.8
  - Tools and Career pages with priority 0.7
  - Google-friendly XML structure with proper namespaces
- Created static `robots.txt` in `client/public/` directory
  - Configured for optimal crawling by Google, Bing, and other search engines
  - Proper disallow rules for admin and API endpoints
  - Crawl-delay directive to prevent server overload
- Removed dynamic sitemap/robots routes from server
- Configured Express static middleware to serve files from `client/public/`

**Enhanced SEO Meta Tags:**
- Optimized default title: "Fasih ur Rehman - FinTech PM & Islamic Finance Expert" (SEO-friendly, under 60 chars)
- Improved meta description with actionable keywords focusing on Middle East market
- Added comprehensive geographic targeting (Dubai, UAE coordinates, region codes)
- Implemented hreflang tags for international SEO (English, Arabic, x-default)
- Enhanced Open Graph tags with image dimensions, alt text, and secure URLs
- Added profile-specific Open Graph tags for better social sharing
- Included Google/Bing bot-specific directives
- Added professional verification meta tags (copyright, distribution, coverage)
- Implemented preconnect links for performance optimization

**Advanced Structured Data (Schema.org):**
- Added FAQ schema with 5 commonly asked questions about services and expertise
- Enhanced Person schema with comprehensive professional details
- Improved Organization schema with ProfessionalService type
- Added WebPage schema for better page classification
- Enhanced Scholarly Article schema for research publications
- Implemented Service schema with detailed offer catalog
- Added Breadcrumb schema support for navigation

**SEO Benefits:**
- Improved search engine discoverability across Google, Bing, and other engines
- Better local SEO targeting for Dubai and Middle East markets
- Enhanced social media sharing with optimized Open Graph tags
- Rich snippets support through comprehensive structured data
- FAQ schema may qualify for featured snippets in search results
- Proper geographic and language targeting for international audiences
- Static sitemap ensures reliable indexing by search engines

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server (port 5000)
- Single-page application (SPA) with client-side routing via Wouter
- Component-based architecture using shadcn/ui design system

**State Management & Data Fetching:**
- TanStack React Query for server state management and caching
- React Hook Form with Zod validation for form handling
- Local state management using React hooks (useState, useEffect)

**Styling & Design:**
- Tailwind CSS with custom design tokens
- Theme system supporting dark/light modes (stored in localStorage)
- Radix UI primitives for accessible, headless components
- Custom CSS variables for consistent color palette and spacing
- Design follows modern SaaS aesthetics (Linear, Stripe-inspired)

**Key Features:**
- SEO optimization with react-helmet-async for dynamic meta tags
- Google Analytics integration for tracking
- Responsive design (mobile-first approach)
- Animated components with Framer Motion
- Smooth scroll behavior for navigation
- Progressive content loading patterns

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript running on Node.js
- Single server process handling both API routes and static file serving
- Vite middleware integration in development mode for HMR

**Authentication & Authorization:**
- Google OAuth 2.0 via Passport.js for user authentication
- Session-based authentication using express-session
- PostgreSQL session store via connect-pg-simple
- Role-based access control (admin vs regular users)
- Admin access determined by ADMIN_EMAIL environment variable

**Security Implementation:**
- Rate limiting (100 requests/minute general, 5 submissions/5 minutes for contact form)
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- Input sanitization and validation using Zod schemas
- CSRF protection through session management
- Payload size limits (10MB max)
- SQL injection prevention via parameterized queries

**API Structure:**
- RESTful API endpoints under `/api/*`
- Contact form submission (`POST /api/contact`)
- Authentication routes (`/api/auth/*`)
- Article CRUD operations (`/api/articles`)
- Testimonial management (`/api/testimonials`)
- Newsletter subscriptions (`/api/newsletter`)
- Career inquiries (`/api/career`)
- External data proxies (stocks, news, LinkedIn articles)

### Database Layer

**ORM & Migrations:**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the primary database (Neon serverless in production)
- Schema-first approach with TypeScript types auto-generated
- Migration management via Drizzle Kit (`npm run db:push`)

**Database Schema:**
- `contact_messages` - Visitor inquiries with name, email, message
- `users` - OAuth user profiles (id, email, name, picture)
- `articles` - Blog content with SEO metadata (slug, excerpt, category, published status)
- `testimonials` - Client testimonials with featured flag
- `newsletter_subscribers` - Email subscription list
- `career_inquiries` - Job/collaboration inquiries
- `session` - Session storage (auto-created by connect-pg-simple)

**Data Validation:**
- Zod schemas for runtime validation (`insertContactMessageSchema`, etc.)
- Type inference from Drizzle schemas
- Frontend validation matches backend validation rules

### Build & Deployment

**Development Workflow:**
- `npm run dev` - Runs Express server with Vite middleware on port 5000
- TypeScript compilation check via `npm run check`
- Database schema sync via `npm run db:push`

**Production Build:**
- `npm run build` - Vite builds React app to `dist/public`, esbuild bundles server to `dist/index.js`
- `npm start` - Runs production server serving static files from `dist/public`
- Server-side rendering not implemented (client-side SPA)

**Deployment Configuration:**
- Autoscale/serverless deployment supported
- Environment variables managed through secure secrets management
- PostgreSQL database required for production

### Content Management

**Admin Dashboard:**
- Protected route (`/admin`) accessible only to authenticated admin users
- Article management (create, edit, delete, publish/unpublish)
- Contact message viewing and management
- Testimonial CRUD operations
- Newsletter subscriber management
- Career inquiry review system
- Dashboard analytics overview

**Content Types:**
- Static content (services, projects, skills) defined in `portfolio-data.ts`
- Dynamic content (articles, testimonials) managed via database
- Rich text support for article content (markdown-style)
- Image uploads handled via external URLs

### Design System

**Color Palette:**
- CSS custom properties for theme variables
- Dark mode: Deep blue-black backgrounds (220 15% 8%), vibrant tech blue primary (210 100% 60%)
- Light mode: Near-white backgrounds (0 0% 99%), professional blue primary (215 85% 50%)
- Accent colors for success states (emerald tones)

**Typography:**
- Inter font family for headings and body text
- Responsive text scales (3xl to 7xl for headings)
- Line height and spacing optimized for readability

**Component Patterns:**
- Card-based layouts with hover effects
- Badge components for categorization
- Dropdown menus for navigation
- Modal dialogs for detailed views
- Toast notifications for user feedback

## External Dependencies

### Third-Party Services

**Authentication:**
- Google OAuth 2.0 (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`)
- Passport.js strategy: passport-google-oauth20

**Email Notifications:**
- Nodemailer with Gmail SMTP (`EMAIL_USER`, `EMAIL_PASSWORD`)
- Used for contact form and newsletter notifications to admin

**Analytics & Tracking:**
- Google Analytics 4 (`VITE_GA_MEASUREMENT_ID`)
- Web Vitals tracking (LCP, FID, CLS)

**External Data APIs:**
- Finnhub API for stock market data (`FINNHUB_API_KEY` - optional, falls back to mock)
- NewsAPI for news feed (`NEWS_API_KEY` - optional, falls back to mock)
- LinkedIn RSS feed proxy for articles (no API key required)

### Infrastructure Dependencies

**Database:**
- PostgreSQL (Neon serverless driver: `@neondatabase/serverless`)
- Connection via `DATABASE_URL` environment variable
- Drizzle ORM for queries and migrations

**Session Storage:**
- PostgreSQL-backed sessions via connect-pg-simple
- Session secret: `SESSION_SECRET` (auto-generated in development)
- 7-day session TTL

**Development Tools:**
- Replit-specific plugins (cartographer, dev-banner, runtime-error-modal)
- TypeScript for type checking
- ESBuild for server bundling

### Frontend Libraries

**UI Components:**
- Radix UI primitives (@radix-ui/react-*)
- shadcn/ui component library
- Lucide React for icons
- Class Variance Authority for component variants

**Utilities:**
- clsx and tailwind-merge for className management
- date-fns for date formatting
- Zod for schema validation
- React Hook Form for form management

**Animation:**
- Framer Motion for component animations
- CSS transitions for hover states

### Configuration Files

**Build Configuration:**
- `vite.config.ts` - Vite bundler settings, path aliases, plugins
- `tsconfig.json` - TypeScript compiler options, path mappings
- `tailwind.config.ts` - Design tokens, color palette, spacing
- `drizzle.config.ts` - Database connection and migration settings
- `postcss.config.js` - CSS processing (Tailwind + Autoprefixer)

**Component Configuration:**
- `components.json` - shadcn/ui settings (style: new-york, baseColor: neutral)

### Environment Variables Summary

**Required:**
- `DATABASE_URL` - PostgreSQL connection string (auto-provisioned on Replit)

**Optional (for full functionality):**
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - OAuth authentication
- `ADMIN_EMAIL` - Email address with admin privileges
- `SESSION_SECRET` - Session encryption key
- `EMAIL_USER` / `EMAIL_PASSWORD` - Gmail SMTP for notifications
- `FINNHUB_API_KEY` - Live stock data
- `NEWS_API_KEY` - Live news feed
- `VITE_GA_MEASUREMENT_ID` - Google Analytics tracking