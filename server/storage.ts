import { type User, type InsertUser, type Referente, type InsertReferente, type Curso, type InsertCurso, type MensajeForo, type MensajeForoDB, type InsertMensajeForo } from "@shared/schema";
import { db } from "./db";
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
  createMensajeForo(mensaje: InsertMensajeForo, userId: number): Promise<MensajeForo>;

  enrollUserInCourse(userId: number, courseId: string): Promise<void>;
  isUserEnrolledInCourse(userId: number, courseId: string): Promise<boolean>;
  getUserCourses(userId: number): Promise<string[]>;
}

export class SQLiteStorage implements IStorage {
  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    // Check if data already exists
    const referentesCount = db.prepare('SELECT COUNT(*) as count FROM referentes').get() as { count: number };
    if (referentesCount.count > 0) return;

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

    const insertReferente = db.prepare('INSERT INTO referentes (id, nombre, foto, rol, biografia, logros) VALUES (?, ?, ?, ?, ?, ?)');
    referentesData.forEach(data => {
      const id = randomUUID();
      insertReferente.run(id, data.nombre, data.foto, data.rol, data.biografia, JSON.stringify(data.logros || []));
    });

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

    const insertCurso = db.prepare('INSERT INTO cursos (id, titulo, descripcion, duracion, nivel, imagen) VALUES (?, ?, ?, ?, ?, ?)');
    cursosData.forEach(data => {
      const id = randomUUID();
      insertCurso.run(id, data.titulo, data.descripcion, data.duracion, data.nivel, data.imagen);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as any;
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any;
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const result = stmt.run(insertUser.username, insertUser.password);
    return {
      id: result.lastInsertRowid.toString(),
      username: insertUser.username,
      password: insertUser.password
    };
  }

  async getAllReferentes(): Promise<Referente[]> {
    const referentes = db.prepare('SELECT * FROM referentes').all() as any[];
    return referentes.map(r => ({
      ...r,
      logros: r.logros ? JSON.parse(r.logros) : null
    }));
  }

  async getReferente(id: string): Promise<Referente | undefined> {
    const referente = db.prepare('SELECT * FROM referentes WHERE id = ?').get(id) as any;
    if (!referente) return undefined;
    return {
      ...referente,
      logros: referente.logros ? JSON.parse(referente.logros) : null
    };
  }

  async createReferente(insertReferente: InsertReferente): Promise<Referente> {
    const id = randomUUID();
    const stmt = db.prepare('INSERT INTO referentes (id, nombre, foto, rol, biografia, logros) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run(id, insertReferente.nombre, insertReferente.foto, insertReferente.rol, insertReferente.biografia, JSON.stringify(insertReferente.logros || []));
    return {
      id,
      ...insertReferente,
      logros: insertReferente.logros || null
    };
  }

  async getAllCursos(): Promise<Curso[]> {
    return db.prepare('SELECT * FROM cursos').all() as Curso[];
  }

  async getCurso(id: string): Promise<Curso | undefined> {
    const curso = db.prepare('SELECT * FROM cursos WHERE id = ?').get(id) as Curso | undefined;
    return curso || undefined;
  }

  async createCurso(insertCurso: InsertCurso): Promise<Curso> {
    const id = randomUUID();
    const stmt = db.prepare('INSERT INTO cursos (id, titulo, descripcion, duracion, nivel, imagen) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run(id, insertCurso.titulo, insertCurso.descripcion, insertCurso.duracion, insertCurso.nivel, insertCurso.imagen);
    return { id, ...insertCurso };
  }

  async getAllMensajesForo(): Promise<MensajeForo[]> {
    const mensajes = db.prepare(`
      SELECT fm.id, u.username as autor, fm.content as contenido, fm.created_at as fecha
      FROM forum_messages fm
      JOIN users u ON fm.user_id = u.id
      ORDER BY fm.created_at DESC
    `).all() as any[];

    return mensajes.map(msg => ({
      id: msg.id.toString(),
      autor: msg.autor,
      contenido: msg.contenido,
      fecha: msg.fecha
    }));
  }

  async createMensajeForo(mensaje: InsertMensajeForo, userId: number): Promise<MensajeForo> {
    const stmt = db.prepare('INSERT INTO forum_messages (user_id, content) VALUES (?, ?)');
    const result = stmt.run(userId, mensaje.contenido);

    const user = db.prepare('SELECT username FROM users WHERE id = ?').get(userId) as { username: string };
    const newMessage = db.prepare('SELECT created_at FROM forum_messages WHERE id = ?').get(result.lastInsertRowid) as { created_at: string };

    return {
      id: result.lastInsertRowid.toString(),
      autor: user.username,
      contenido: mensaje.contenido,
      fecha: newMessage.created_at
    };
  }

  async enrollUserInCourse(userId: number, courseId: string): Promise<void> {
    const stmt = db.prepare('INSERT OR IGNORE INTO user_courses (user_id, course_id) VALUES (?, ?)');
    stmt.run(userId, courseId);
  }

  async isUserEnrolledInCourse(userId: number, courseId: string): Promise<boolean> {
    const result = db.prepare('SELECT 1 FROM user_courses WHERE user_id = ? AND course_id = ?').get(userId, courseId);
    return !!result;
  }

  async getUserCourses(userId: number): Promise<string[]> {
    const courses = db.prepare('SELECT course_id FROM user_courses WHERE user_id = ?').all(userId) as { course_id: string }[];
    return courses.map(c => c.course_id);
  }
}

let storageInstance: SQLiteStorage | null = null;

export function getStorage(): SQLiteStorage {
  if (!storageInstance) {
    storageInstance = new SQLiteStorage();
  }
  return storageInstance;
}

// For backwards compatibility
export const storage = new Proxy({} as SQLiteStorage, {
  get(_target, prop) {
    return (getStorage() as any)[prop];
  }
});
