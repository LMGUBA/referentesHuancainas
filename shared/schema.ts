import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const referentes = pgTable("referentes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nombre: text("nombre").notNull(),
  foto: text("foto").notNull(),
  rol: text("rol").notNull(),
  biografia: text("biografia").notNull(),
  logros: text("logros").array(),
});

export const insertReferenteSchema = createInsertSchema(referentes).omit({
  id: true,
});

export type InsertReferente = z.infer<typeof insertReferenteSchema>;
export type Referente = typeof referentes.$inferSelect;

export const cursos = pgTable("cursos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titulo: text("titulo").notNull(),
  descripcion: text("descripcion").notNull(),
  duracion: text("duracion").notNull(),
  nivel: text("nivel").notNull(),
});

export const insertCursoSchema = createInsertSchema(cursos).omit({
  id: true,
});

export type InsertCurso = z.infer<typeof insertCursoSchema>;
export type Curso = typeof cursos.$inferSelect;

export const mensajesForo = pgTable("mensajes_foro", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  autor: text("autor").notNull(),
  contenido: text("contenido").notNull(),
  fecha: timestamp("fecha").notNull().defaultNow(),
});

export const insertMensajeForoSchema = createInsertSchema(mensajesForo).omit({
  id: true,
  fecha: true,
});

export type InsertMensajeForo = z.infer<typeof insertMensajeForoSchema>;
export type MensajeForo = typeof mensajesForo.$inferSelect;
