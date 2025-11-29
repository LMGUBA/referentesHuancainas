import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { db } from './db';
import type { Express } from 'express';
import session from 'express-session';

const SALT_ROUNDS = 10;

export interface User {
    id: number;
    username: string;
    password: string;
}

// Configure passport local strategy
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User | undefined;

            if (!user) {
                return done(null, false, { message: 'Usuario no encontrado' });
            }

            const isValid = await bcrypt.compare(password, user.password);

            if (!isValid) {
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

// Serialize user to session
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id: number, done) => {
    try {
        const user = db.prepare('SELECT id, username FROM users WHERE id = ?').get(id) as User | undefined;
        done(null, user || null);
    } catch (error) {
        done(error);
    }
});

// Setup authentication middleware
export function setupAuth(app: Express) {
    app.use(
        session({
            secret: process.env.SESSION_SECRET || 'wanka-referentes-secret-key-2024',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
}

// Register a new user
export async function registerUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const result = stmt.run(username, hashedPassword);

    return {
        id: result.lastInsertRowid as number,
        username,
        password: hashedPassword,
    };
}

// Middleware to check if user is authenticated
export function requireAuth(req: any, res: any, next: any) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'No autorizado. Por favor inicia sesión.' });
}
