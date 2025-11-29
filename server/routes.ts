import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReferenteSchema, insertCursoSchema, insertMensajeForoSchema } from "@shared/schema";
import passport from "passport";
import { registerUser, requireAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username y password son requeridos" });
      }

      if (password.length < 6) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
      }

      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ error: "El usuario ya existe" });
      }

      const user = await registerUser(username, password);

      // Auto login after registration
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "Error al iniciar sesión" });
        }
        res.status(201).json({ id: user.id, username: user.username });
      });
    } catch (error) {
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ error: "Error al iniciar sesión" });
      }
      if (!user) {
        return res.status(401).json({ error: info?.message || "Credenciales inválidas" });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: "Error al iniciar sesión" });
        }
        res.json({ id: user.id, username: user.username });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Error al cerrar sesión" });
      }
      res.json({ message: "Sesión cerrada exitosamente" });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      res.json({ id: user.id, username: user.username });
    } else {
      res.status(401).json({ error: "No autenticado" });
    }
  });

  // Referentes routes
  app.get("/api/referentes", async (_req, res) => {
    try {
      const referentes = await storage.getAllReferentes();
      res.json(referentes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch referentes" });
    }
  });

  app.get("/api/referentes/:id", async (req, res) => {
    try {
      const referente = await storage.getReferente(req.params.id);
      if (!referente) {
        return res.status(404).json({ error: "Referente not found" });
      }
      res.json(referente);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch referente" });
    }
  });

  app.post("/api/referentes", async (req, res) => {
    try {
      const validatedData = insertReferenteSchema.parse(req.body);
      const referente = await storage.createReferente(validatedData);
      res.status(201).json(referente);
    } catch (error) {
      res.status(400).json({ error: "Invalid referente data" });
    }
  });

  // Cursos routes
  app.get("/api/cursos", async (_req, res) => {
    try {
      const cursos = await storage.getAllCursos();
      res.json(cursos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cursos" });
    }
  });

  app.get("/api/cursos/:id", async (req, res) => {
    try {
      const curso = await storage.getCurso(req.params.id);
      if (!curso) {
        return res.status(404).json({ error: "Curso not found" });
      }
      res.json(curso);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch curso" });
    }
  });

  app.post("/api/cursos", async (req, res) => {
    try {
      const validatedData = insertCursoSchema.parse(req.body);
      const curso = await storage.createCurso(validatedData);
      res.status(201).json(curso);
    } catch (error) {
      res.status(400).json({ error: "Invalid curso data" });
    }
  });

  // Course enrollment - protected
  app.post("/api/cursos/:id/enroll", requireAuth, async (req, res) => {
    try {
      const user = req.user as any;
      const courseId = req.params.id;

      const curso = await storage.getCurso(courseId);
      if (!curso) {
        return res.status(404).json({ error: "Curso no encontrado" });
      }

      const isEnrolled = await storage.isUserEnrolledInCourse(user.id, courseId);
      if (isEnrolled) {
        return res.status(400).json({ error: "Ya estás inscrito en este curso" });
      }

      await storage.enrollUserInCourse(user.id, courseId);
      res.json({ message: "Inscripción exitosa", courseId });
    } catch (error) {
      res.status(500).json({ error: "Error al inscribirse en el curso" });
    }
  });

  // Get user's enrolled courses
  app.get("/api/user/courses", requireAuth, async (req, res) => {
    try {
      const user = req.user as any;
      const courses = await storage.getUserCourses(user.id);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener cursos" });
    }
  });

  // Forum routes
  app.get("/api/foro/mensajes", async (_req, res) => {
    try {
      const mensajes = await storage.getAllMensajesForo();
      res.json(mensajes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch forum messages" });
    }
  });

  // Forum post - protected
  app.post("/api/foro/mensajes", requireAuth, async (req, res) => {
    try {
      const user = req.user as any;
      const validatedData = insertMensajeForoSchema.parse(req.body);
      const mensaje = await storage.createMensajeForo(validatedData, user.id);
      res.status(201).json(mensaje);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

