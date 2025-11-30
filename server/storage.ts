import { type User, type InsertUser, type Referente, type InsertReferente, type Curso, type InsertCurso, type MensajeForo, type InsertMensajeForo, users, referentes, cursos, mensajesForo, userCourses } from "@shared/schema";
import { db } from "./db";
import { eq, sql, desc, and } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getAllReferentes(): Promise<Referente[]>;
  getReferente(id: string): Promise<Referente | undefined>;
  createReferente(referente: InsertReferente): Promise<Referente>;

  getAllCursos(): Promise<Curso[]>;
  getCurso(id: string): Promise<Curso | undefined>;
  createCurso(curso: InsertCurso): Promise<Curso>;

  getAllMensajesForo(): Promise<MensajeForo[]>;
  createMensajeForo(mensaje: InsertMensajeForo, userId: string): Promise<MensajeForo>;

  enrollUserInCourse(userId: string, courseId: string): Promise<void>;
  isUserEnrolledInCourse(userId: string, courseId: string): Promise<boolean>;
  getUserCourses(userId: string): Promise<string[]>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    this.seedInitialData();
  }

  private async seedInitialData() {
    // Check if data already exists
    const referentesCount = await db.select({ count: sql<number>`count(*)` }).from(referentes);
    if (referentesCount[0].count > 0) return;

    const referentesData: InsertReferente[] = [
      {
        nombre: "Sara Huamán",
        foto: "/assets/generated_images/Wanka_woman_leader_portrait_1_ef9f726f.png",
        rol: "Lideresa Cultural y Educadora",
        biografia: "Sara Huamán es una destacada lideresa wanka, promotora cultural y defensora de la educación rural para mujeres. Con más de 15 años de experiencia en la región de Huancayo, ha trabajado incansablemente para preservar las tradiciones culturales mientras impulsa la educación y el empoderamiento femenino en comunidades rurales.",
        logros: [
          "Fundadora del programa 'Mujeres Wanka Líderes' que ha beneficiado a más de 500 mujeres",
          "Reconocida por el Ministerio de Cultura por su labor en preservación cultural",
          "Coordinadora de talleres de liderazgo en 20 comunidades rurales"
        ]
      },
      {
        nombre: "Julia Quispe",
        foto: "/assets/generated_images/Wanka_woman_leader_portrait_2_8ce50a42.png",
        rol: "Ingeniera y Activista STEM",
        biografia: "Julia Quispe es una ingeniera apasionada y activista STEM dedicada a impulsar la participación de mujeres y niñas en ciencia y tecnología. Combina su expertise técnico con un profundo compromiso por la inclusión digital en comunidades wanka.",
        logros: [
          "Creadora del programa 'Niñas Wanka en Tecnología' con más de 300 participantes",
          "Mentora de 50+ mujeres en carreras STEM",
          "Desarrolladora de apps educativas para comunidades rurales"
        ]
      },
      {
        nombre: "Elena Ccahuana",
        foto: "/assets/generated_images/Wanka_woman_leader_portrait_3_dbae5ba8.png",
        rol: "Educadora y Preservadora Cultural",
        biografia: "Elena Ccahuana ha dedicado su vida a la educación intercultural bilingüe, trabajando para que las nuevas generaciones mantengan viva su lengua y cultura wanka mientras acceden a educación de calidad.",
        logros: [
          "30 años de servicio en educación rural",
          "Autora de materiales didácticos en quechua wanka",
          "Formadora de docentes en educación intercultural"
        ]
      },
      {
        nombre: "Rosa Vilcapoma",
        foto: "/assets/generated_images/Wanka_woman_leader_portrait_4_e397305d.png",
        rol: "Emprendedora Social",
        biografia: "Rosa Vilcapoma es una emprendedora social que ha revolucionado la economía local al organizar cooperativas de mujeres artesanas. Su trabajo dignifica el arte textil wanka mientras genera oportunidades económicas sostenibles.",
        logros: [
          "Fundadora de la Cooperativa 'Warmi Wanka' con 80 artesanas",
          "Exportación de textiles a mercados internacionales",
          "Premio Nacional al Emprendimiento Femenino 2023"
        ]
      }
    ];

    await db.insert(referentes).values(referentesData);

    const cursosData: InsertCurso[] = [
      {
        titulo: "Liderazgo Femenino Wanka",
        descripcion: "Desarrolla habilidades de liderazgo mientras honras tu identidad cultural wanka. Aprende estrategias para liderar con autenticidad y fortaleza.",
        duracion: "4 semanas",
        nivel: "Intermedio",
        imagen: "/assets/curso_liderazgo.jpg"
      },
      {
        titulo: "Mujer y Emprendimiento Rural",
        descripcion: "Aprende a crear y gestionar emprendimientos sostenibles en tu comunidad. Desde la planificación hasta la comercialización.",
        duracion: "3 semanas",
        nivel: "Principiante",
        imagen: "/assets/curso_emprendimiento.jpg"
      },
      {
        titulo: "Identidad Cultural y Memoria Andina",
        descripcion: "Explora la riqueza de la cultura wanka, sus tradiciones, cosmovisión y el valor de preservar nuestra identidad en el mundo moderno.",
        duracion: "2 semanas",
        nivel: "Principiante",
        imagen: "/assets/curso_identidad.jpg"
      }
    ];

    await db.insert(cursos).values(cursosData);
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllReferentes(): Promise<Referente[]> {
    return await db.select().from(referentes);
  }

  async getReferente(id: string): Promise<Referente | undefined> {
    const [referente] = await db.select().from(referentes).where(eq(referentes.id, id));
    return referente;
  }

  async createReferente(insertReferente: InsertReferente): Promise<Referente> {
    const [referente] = await db.insert(referentes).values(insertReferente).returning();
    return referente;
  }

  async getAllCursos(): Promise<Curso[]> {
    return await db.select().from(cursos);
  }

  async getCurso(id: string): Promise<Curso | undefined> {
    const [curso] = await db.select().from(cursos).where(eq(cursos.id, id));
    return curso;
  }

  async createCurso(insertCurso: InsertCurso): Promise<Curso> {
    const [curso] = await db.insert(cursos).values(insertCurso).returning();
    return curso;
  }

  async getAllMensajesForo(): Promise<MensajeForo[]> {
    const result = await db.select({
      id: mensajesForo.id,
      autor: users.username,
      contenido: mensajesForo.contenido,
      fecha: mensajesForo.fecha
    })
      .from(mensajesForo)
      .innerJoin(users, eq(mensajesForo.userId, users.id))
      .orderBy(desc(mensajesForo.fecha));

    const typed = result as { id: string; autor: string; contenido: string; fecha: Date }[];
    return typed.map((msg) => ({
      ...msg,
      fecha: msg.fecha.toISOString()
    }));
  }

  async createMensajeForo(mensaje: InsertMensajeForo, userId: string): Promise<MensajeForo> {
    const [newMessage] = await db.insert(mensajesForo).values({
      ...mensaje,
      userId
    }).returning();

    const [user] = await db.select().from(users).where(eq(users.id, userId));

    return {
      id: newMessage.id,
      autor: user.username,
      contenido: newMessage.contenido,
      fecha: newMessage.fecha.toISOString()
    };
  }

  async enrollUserInCourse(userId: string, courseId: string): Promise<void> {
    await db.insert(userCourses).values({
      userId,
      courseId
    }).onConflictDoNothing();
  }

  async isUserEnrolledInCourse(userId: string, courseId: string): Promise<boolean> {
    const [enrollment] = await db.select()
      .from(userCourses)
      .where(and(
        eq(userCourses.userId, userId),
        eq(userCourses.courseId, courseId)
      ));
    return !!enrollment;
  }

  async getUserCourses(userId: string): Promise<string[]> {
    const courses = await db.select({
      courseId: userCourses.courseId
    })
      .from(userCourses)
      .where(eq(userCourses.userId, userId));

    return courses.map((c: { courseId: string }) => c.courseId);
  }
}

class MemoryStorage implements IStorage {
  private _users = new Map<string, User>();
  private _referentes = new Map<string, Referente>();
  private _cursos = new Map<string, Curso>();
  private _mensajes = new Map<string, MensajeForo>();
  private _userCourses = new Map<string, Set<string>>();

  constructor() {
    this.seed();
  }

  private seed() {
    const referentesData: InsertReferente[] = [
      {
        nombre: "Sara Huamán",
        foto: "/assets/generated_images/Wanka_woman_leader_portrait_1_ef9f726f.png",
        rol: "Lideresa Cultural y Educadora",
        biografia: "Sara Huamán es una destacada lideresa wanka, promotora cultural y defensora de la educación rural para mujeres.",
        logros: [
          "Fundadora del programa 'Mujeres Wanka Líderes'",
          "Reconocida por el Ministerio de Cultura",
          "Coordinadora de talleres de liderazgo"
        ]
      },
      {
        nombre: "Julia Quispe",
        foto: "/assets/generated_images/Wanka_woman_leader_portrait_2_8ce50a42.png",
        rol: "Ingeniera y Activista STEM",
        biografia: "Impulsa la participación de mujeres y niñas en ciencia y tecnología.",
        logros: [
          "Programa 'Niñas Wanka en Tecnología'",
          "Mentora de mujeres en STEM",
          "Apps educativas para comunidades"
        ]
      },
      {
        nombre: "Elena Ccahuana",
        foto: "/assets/generated_images/Wanka_woman_leader_portrait_3_dbae5ba8.png",
        rol: "Educadora y Preservadora Cultural",
        biografia: "Educación intercultural bilingüe y preservación de lengua wanka.",
        logros: [
          "30 años de servicio",
          "Materiales didácticos en quechua wanka",
          "Formación de docentes"
        ]
      },
      {
        nombre: "Rosa Vilcapoma",
        foto: "/assets/generated_images/Wanka_woman_leader_portrait_4_e397305d.png",
        rol: "Emprendedora Social",
        biografia: "Cooperativas de mujeres artesanas y economía local sostenible.",
        logros: [
          "Cooperativa 'Warmi Wanka'",
          "Exportación de textiles",
          "Premio Nacional al Emprendimiento Femenino"
        ]
      }
    ];

    referentesData.forEach(r => {
      const id = randomUUID();
      this._referentes.set(id, { ...r, id, logros: r.logros ?? [] });
    });

    const cursosData: InsertCurso[] = [
      {
        titulo: "Liderazgo Femenino Wanka",
        descripcion: "Desarrolla habilidades de liderazgo honrando tu identidad wanka.",
        duracion: "4 semanas",
        nivel: "Intermedio",
        imagen: "/assets/curso_liderazgo.jpg"
      },
      {
        titulo: "Mujer y Emprendimiento Rural",
        descripcion: "Crea y gestiona emprendimientos sostenibles en tu comunidad.",
        duracion: "3 semanas",
        nivel: "Principiante",
        imagen: "/assets/curso_emprendimiento.jpg"
      },
      {
        titulo: "Identidad Cultural y Memoria Andina",
        descripcion: "Explora la riqueza de la cultura wanka y su cosmovisión.",
        duracion: "2 semanas",
        nivel: "Principiante",
        imagen: "/assets/curso_identidad.jpg"
      }
    ];

    cursosData.forEach(c => {
      const id = randomUUID();
      this._cursos.set(id, { ...c, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this._users.get(id);
  }
  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const u of Array.from(this._users.values())) if (u.username === username) return u;
    return undefined;
  }
  async createUser(user: InsertUser): Promise<User> {
    const id = randomUUID();
    const created = { ...user, id } as User;
    this._users.set(id, created);
    return created;
  }

  async getAllReferentes(): Promise<Referente[]> {
    return Array.from(this._referentes.values());
  }
  async getReferente(id: string): Promise<Referente | undefined> {
    return this._referentes.get(id);
  }
  async createReferente(referente: InsertReferente): Promise<Referente> {
    const id = randomUUID();
    const created = { ...referente, id } as Referente;
    this._referentes.set(id, created);
    return created;
  }

  async getAllCursos(): Promise<Curso[]> {
    return Array.from(this._cursos.values());
  }
  async getCurso(id: string): Promise<Curso | undefined> {
    return this._cursos.get(id);
  }
  async createCurso(curso: InsertCurso): Promise<Curso> {
    const id = randomUUID();
    const created = { ...curso, id } as Curso;
    this._cursos.set(id, created);
    return created;
  }

  async getAllMensajesForo(): Promise<MensajeForo[]> {
    return Array.from(this._mensajes.values());
  }
  async createMensajeForo(mensaje: InsertMensajeForo, userId: string): Promise<MensajeForo> {
    const user = await this.getUser(userId);
    const id = randomUUID();
    const created: MensajeForo = {
      id,
      autor: user?.username || "",
      contenido: mensaje.contenido,
      fecha: new Date().toISOString()
    };
    this._mensajes.set(id, created);
    return created;
  }

  async enrollUserInCourse(userId: string, courseId: string): Promise<void> {
    const set = this._userCourses.get(userId) || new Set<string>();
    set.add(courseId);
    this._userCourses.set(userId, set);
  }
  async isUserEnrolledInCourse(userId: string, courseId: string): Promise<boolean> {
    return this._userCourses.get(userId)?.has(courseId) || false;
  }
  async getUserCourses(userId: string): Promise<string[]> {
    return Array.from(this._userCourses.get(userId) || new Set<string>());
  }
}

let storageInstance: IStorage | null = null;

export function getStorage(): IStorage {
  if (!storageInstance) {
    if (db) {
      storageInstance = new DatabaseStorage();
    } else {
      storageInstance = new MemoryStorage();
    }
  }
  return storageInstance;
}

export const storage = getStorage();
