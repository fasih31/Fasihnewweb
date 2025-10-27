# Fasih ur Rehman Portfolio Website

## Overview

This is a modern, professional portfolio website for Fasih ur Rehman, a certified Product Manager (PMP) specializing in AI/AGI, Web3, FinTech, EdTech, and eCommerce solutions. The application is a full-stack web platform built with React on the frontend and Express on the backend, designed to showcase professional experience, projects, services, and facilitate contact with potential clients or employers.

The portfolio features a single-page application with smooth scrolling navigation, dark/light theme support, responsive design, and a contact form for visitor inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## Environment Setup

**Date**: October 22, 2025 (Initial Setup Completed)

This project is configured as a full-stack web application with the following setup:

### Environment Configuration
- **Database**: PostgreSQL
  - Tables: `contact_messages`, `users`, `articles`, `testimonials`, `newsletter_subscribers`, `career_inquiries`, `lead_captures`, `calculator_results`, `page_analytics`, `session`
  - Migration tool: Drizzle Kit
  - Run `npm run db:push` to sync schema changes
- **Frontend Server**: Vite dev server on port 5000
- **Backend Server**: Express.js (integrated with Vite in development)
- **Development**: Single command `npm run dev` starts both frontend and backend

### Required Environment Variables (Optional)
The application runs without these, but to enable full functionality:
- `GOOGLE_CLIENT_ID` - Google OAuth client ID for user authentication
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `ADMIN_EMAIL` - Email address that will have admin access to manage articles and view contact messages
- `SESSION_SECRET` - Secret key for session encryption (auto-generated for development)
- `FINNHUB_API_KEY` - Finnhub API key for live stock market data (optional, falls back to mock data)
- `NEWS_API_KEY` - NewsAPI key for live news feed (optional, falls back to mock data)
- `VITE_GA_MEASUREMENT_ID` - Google Analytics measurement ID (e.g., G-XXXXXXXXXX) for website tracking

### Development Commands
- `npm run dev` - Start development server (port 5000)
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run db:push` - Sync database schema with Drizzle

### Deployment Configuration
- **Type**: Autoscale (serverless)
- **Build**: `npm run build`
- **Run**: `npm start`

### Recent Enhancements (October 22, 2025)
**High Priority Features Implemented:**

1. **Dedicated Solution Pages**: Created individual pages for each solution (FinTech, EdTech, eCommerce, DaaS)
   - Routes: `/solutions/fintech`, `/solutions/edtech`, `/solutions/ecommerce`, `/solutions/daas`
   - Enhanced SEO with page-specific metadata and schema.org markup
   - Professional layout with hero section, offerings grid, and CTA sections
   - Maintained modal preview from homepage for quick overview

2. **Live API Integration**:
   - **Stock Ticker**: Integrated Finnhub API for real-time stock data (optional, uses mock data if API key not provided)
   - **News Feed**: Integrated NewsAPI for live business/tech news (optional, uses mock data if API key not provided)
   - Both features work seamlessly without API keys for development/testing

3. **SEO Enhancements**:
   - Dynamic sitemap.xml generation at `/sitemap.xml` including all pages, solutions, and blog articles
   - robots.txt file at `/robots.txt` for search engine crawling guidance
   - Schema.org Service markup on solution detail pages
   - Enhanced metadata with proper Open Graph and Twitter Card tags

4. **Performance Optimizations**:
   - Native lazy loading for portfolio project images
   - Optimized image rendering for faster initial page load

### SEO Improvements (October 24, 2025)
**Comprehensive SEO optimization implemented to achieve B+ grade:**

1. **Optimized Meta Tags**:
   - Title tag reduced from 106 to 56 characters (within recommended 50-60 range)
   - Meta description optimized to 155 characters (within 120-160 range)
   - All Open Graph and Twitter Card metadata updated

2. **XML Sitemap & Robots.txt**:
   - Dynamic sitemap.xml at `/sitemap.xml` with all pages and routes
   - Includes: Home, Solutions pages, Career, Tools, Islamic FinTech, and Articles
   - robots.txt endpoint at `/robots.txt` with proper crawl directives
   - Robust error handling for database queries

3. **Enhanced Schema.org Markup**:
   - Person schema with complete professional profile
   - ProfessionalService schema with contact details and geographic data
   - Occupation schema with skills and categories
   - ContactPoint data for business communication

4. **Social Media Integration**:
   - Facebook profile meta tags
   - Instagram profile meta tags (@fasih31)
   - YouTube channel meta tags (@fasih31)
   - Updated Twitter handle to @Fasih31
   - Updated GitHub profile to fasih31
   - All profiles linked in Schema.org Person markup

5. **Google Analytics Support**:
   - Integrated Google Analytics component
   - Environment variable: `VITE_GA_MEASUREMENT_ID`
   - Auto-loads when measurement ID is provided
   - Non-intrusive implementation

6. **International SEO**:
   - Hreflang attributes for language targeting
   - Geographic meta tags for Dubai, UAE
   - Multi-region support configured

7. **Social Links Updated**:
   - Twitter: @Fasih31
   - GitHub: fasih31
   - LinkedIn: fasihurrehman05 (unchanged)

### Known Setup Notes
- Frontend is configured to accept all hosts (required for Replit's iframe proxy)
- Vite dev server binds to 0.0.0.0:5000
- Google OAuth callback URL uses Replit domain in production
- Database storage is now fully connected (DatabaseStorage implementation active)
- Stock ticker and news feed work with or without API keys (graceful fallback to mock data)
- Google Analytics requires `VITE_GA_MEASUREMENT_ID` environment variable to activate

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing

**UI Component System**
- Shadcn/ui component library with Radix UI primitives for accessible, composable components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for component variant management
- Custom theme system supporting dark/light modes with CSS variables

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- React Hook Form with Zod validation for form handling
- React Context for theme management

**Design System**
- Typography: Inter font family (400/500/700/800 weights) for headings and body text, JetBrains Mono for code
- Color palette: System-based design with dark mode as primary theme, featuring blue accents and emerald success states
- Spacing: Consistent 4/8/12/16/24/32/48 pixel system
- Component variants: Extensive use of elevation states (hover-elevate, active-elevate-2) for interactive feedback

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript for type safety across the entire backend

**API Design**
- RESTful API endpoints with JSON request/response format
- Request body validation using Zod schemas
- Centralized error handling with appropriate HTTP status codes
- Logging middleware for API request tracking

**Data Storage Strategy**
- PostgreSQL database storage (DatabaseStorage class) using Drizzle ORM
- Database schema defined using Drizzle ORM with PostgreSQL dialect
- Schema includes contact_messages, users, articles, and session tables
- Storage interface (IStorage) allows for easy swapping between storage implementations
- All data is persisted to the Replit PostgreSQL database

**Session & Security**
- JSON body parsing with raw body access for webhook verification
- CORS and security headers handled at application level

### Application Structure

**Monorepo Layout**
- `/client` - Frontend React application
  - `/src/components` - Reusable UI components organized by feature
  - `/src/pages` - Page-level components
  - `/src/lib` - Utility functions and shared logic
  - `/src/hooks` - Custom React hooks
  - `/src/data` - Static content and portfolio data
- `/server` - Backend Express application
  - `index.ts` - Server initialization and middleware setup
  - `routes.ts` - API route definitions
  - `storage.ts` - Data persistence layer
  - `vite.ts` - Vite integration for development
- `/shared` - Shared TypeScript types and schemas
  - `schema.ts` - Drizzle ORM schemas and Zod validation schemas

**Build & Deployment**
- Production build: Vite bundles frontend to `/dist/public`, esbuild bundles backend to `/dist`
- Development: Vite dev server with HMR integration via Express middleware
- Static asset serving in production mode

### Key Features

**Portfolio Sections**
- Hero section with animated skill rotation
- About section with professional timeline
- Services showcase with icon-based cards
- Solutions section with industry-specific offerings (FinTech, EdTech, eCommerce, DaaS)
- Project portfolio with category filtering
- Blog section for articles and insights
- Contact form with server-side validation

**User Experience**
- Smooth scroll navigation between sections
- Responsive mobile-first design with hamburger menu
- Theme toggle (dark/light mode) with localStorage persistence
- Toast notifications for user feedback
- Loading states and error handling

**Content Management**
- Static content stored in TypeScript files (`portfolio-data.ts`)
- Type-safe content structures using shared schemas
- Easy content updates without database changes

## External Dependencies

### Database
- **Drizzle ORM** (v0.39.1) - Type-safe ORM for PostgreSQL with schema management
- **@neondatabase/serverless** (v0.10.4) - Serverless PostgreSQL driver for Neon database
- **drizzle-kit** - CLI tool for database migrations and schema management
- Database connection via `DATABASE_URL` environment variable

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** with Autoprefixer for CSS processing
- **@radix-ui/react-*** - Comprehensive suite of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **lucide-react** - Icon library
- **embla-carousel-react** - Carousel component
- **cmdk** - Command palette component

### Forms & Validation
- **react-hook-form** - Form state management
- **@hookform/resolvers** - Validation resolver integration
- **zod** - Schema validation library
- **drizzle-zod** - Zod schema generation from Drizzle schemas
- **zod-validation-error** - User-friendly error messages

### Development Tools
- **TypeScript** - Static type checking
- **tsx** - TypeScript execution engine for development
- **esbuild** - JavaScript bundler for production builds
- **@replit/vite-plugin-*** - Replit-specific development tooling

### Session Management
- **connect-pg-simple** - PostgreSQL session store for Express (configured but not actively used with in-memory storage)

### Utilities
- **date-fns** - Date manipulation library
- **clsx** & **tailwind-merge** - Class name utilities
- **nanoid** - Unique ID generation

### Fonts
- **Google Fonts** - Inter and JetBrains Mono font families loaded via CDN

The application is designed to be easily migrated from in-memory storage to a full PostgreSQL database by implementing the `IStorage` interface with Drizzle ORM queries, making it production-ready with minimal code changes.
