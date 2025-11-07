import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import connectPg from "connect-pg-simple";
import bcrypt from "bcrypt";
import type { Express } from "express";
import type { RequestHandler } from "express";
import { storage } from "./storage";
import type { User } from "@shared/schema";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "Fasih31@gmail.com"; // Default to Fasih31@gmail.com if not set

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn("Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET");
}

if (!process.env.ADMIN_EMAIL) {
  console.warn("ADMIN_EMAIL not set. Using default admin email: Fasih31@gmail.com. For production, set ADMIN_EMAIL environment variable.");
}

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000;
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    ttl: sessionTtl,
  });
  return session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-in-production",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Initialize admin user with a default password if it doesn't exist
  await initializeAdminUser();

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return;
  }

  const callbackURL = process.env.NODE_ENV === "production"
    ? `https://${process.env.REPLIT_DOMAINS?.split(",")[0]}/api/auth/google/callback`
    : "http://localhost:5000/api/auth/google/callback";

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const name = profile.displayName || "User";
          const picture = profile.photos?.[0]?.value;

          if (!email) {
            return done(new Error("No email from Google"));
          }

          // Only allow the admin email via Google OAuth
          if (email !== ADMIN_EMAIL) {
            return done(null, false, { message: "Unauthorized access. Only admin can log in." });
          }

          const user = await storage.upsertUser({
            id: profile.id,
            email,
            name,
            picture,
          });

          done(null, user);
        } catch (error) {
          done(error as Error);
        }
      }
    )
  );

  // Add Local Strategy for admin login
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email);

          // Check if the user is the admin and if the password matches
          if (!user || user.email !== ADMIN_EMAIL || !user.passwordHash) {
            return done(null, false, { message: "Invalid credentials." });
          }

          const isMatch = await bcrypt.compare(password, user.passwordHash);
          if (!isMatch) {
            return done(null, false, { message: "Invalid credentials." });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.get(
    "/api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  // Local login route
  app.post(
    "/api/auth/login",
    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export const isAdmin: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = req.user as any;

  if (!process.env.ADMIN_EMAIL && user.email !== ADMIN_EMAIL) {
    return res.status(403).json({ message: "Admin not configured or incorrect user" });
  }

  if (user.email === ADMIN_EMAIL) {
    return next();
  }

  res.status(403).json({ message: "Forbidden: Admin access required" });
};

async function initializeAdminUser() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "Fasih31@gmail.com";
    if (!process.env.ADMIN_EMAIL) {
      console.log(`ADMIN_EMAIL not set. Using default admin email: ${adminEmail}. For production, set ADMIN_EMAIL environment variable.`);
    }

    // Check if admin user exists
    try {
      const existingUser = await storage.getUserByEmail(adminEmail);

      if (existingUser) {
        console.log(`Admin user already exists: ${adminEmail}`);
        return;
      }
    } catch (error) {
      // User doesn't exist, continue to create
      console.log(`Admin user not found, creating: ${adminEmail}`);
    }

    // Create admin user only if not exists
    try {
      await storage.upsertUser({
        email: adminEmail,
        name: "Fasih ur Rehman",
        picture: null,
      });
      console.log(`Admin user created successfully: ${adminEmail}`);
    } catch (createError: any) {
      // If duplicate key error, user was created by another process - that's ok
      if (createError.code === '23505') {
        console.log(`Admin user already exists (created by concurrent process): ${adminEmail}`);
      } else {
        throw createError;
      }
    }
  } catch (error) {
    console.error("Error initializing admin user:", error);
    // Don't throw - allow the app to start even if admin init fails
  }
}