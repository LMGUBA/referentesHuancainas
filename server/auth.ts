import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import type { Express } from 'express';
import session from 'express-session';
import { storage } from './storage';
import type { User } from '@shared/schema';

const SALT_ROUNDS = 10;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }

      return done(null, user);
    } catch (error) {
      return done(error as Error);
    }
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user.id as string);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user || null);
  } catch (error) {
    done(error as Error);
  }
});

export function setupAuth(app: Express) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'wanka-referentes-secret-key-2024',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
}

export async function registerUser(username: string, password: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await storage.createUser({ username, password: hashedPassword });
  return user;
}

export function requireAuth(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'No autorizado. Por favor inicia sesión.' });
}
