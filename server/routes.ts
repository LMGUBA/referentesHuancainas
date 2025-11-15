import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReferenteSchema, insertCursoSchema, insertMensajeForoSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

  app.get("/api/foro/mensajes", async (_req, res) => {
    try {
      const mensajes = await storage.getAllMensajesForo();
      res.json(mensajes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch forum messages" });
    }
  });

  app.post("/api/foro/mensajes", async (req, res) => {
    try {
      const validatedData = insertMensajeForoSchema.parse(req.body);
      const mensaje = await storage.createMensajeForo(validatedData);
      res.status(201).json(mensaje);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
