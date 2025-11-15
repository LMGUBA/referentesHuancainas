import { type User, type InsertUser, type Referente, type InsertReferente, type Curso, type InsertCurso, type MensajeForo, type MensajeForoDB, type InsertMensajeForo } from "@shared/schema";
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
  createMensajeForo(mensaje: InsertMensajeForo): Promise<MensajeForo>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private referentes: Map<string, Referente>;
  private cursos: Map<string, Curso>;
  private mensajesForo: Map<string, MensajeForoDB>;

  constructor() {
    this.users = new Map();
    this.referentes = new Map();
    this.cursos = new Map();
    this.mensajesForo = new Map();
    
    this.seedInitialData();
  }

  private seedInitialData() {
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

    referentesData.forEach(data => {
      const id = randomUUID();
      this.referentes.set(id, { ...data, id, logros: data.logros || null });
    });

    const cursosData: InsertCurso[] = [
      {
        titulo: "Liderazgo Femenino Wanka",
        descripcion: "Desarrolla habilidades de liderazgo mientras honras tu identidad cultural wanka. Aprende estrategias para liderar con autenticidad y fortaleza.",
        duracion: "4 semanas",
        nivel: "Intermedio"
      },
      {
        titulo: "Mujer y Emprendimiento Rural",
        descripcion: "Aprende a crear y gestionar emprendimientos sostenibles en tu comunidad. Desde la planificación hasta la comercialización.",
        duracion: "3 semanas",
        nivel: "Principiante"
      },
      {
        titulo: "Identidad Cultural y Memoria Andina",
        descripcion: "Explora la riqueza de la cultura wanka, sus tradiciones, cosmovisión y el valor de preservar nuestra identidad en el mundo moderno.",
        duracion: "2 semanas",
        nivel: "Principiante"
      }
    ];

    cursosData.forEach(data => {
      const id = randomUUID();
      this.cursos.set(id, { ...data, id });
    });

    const mensajesData: InsertMensajeForo[] = [
      {
        autor: "María López",
        contenido: "¡Qué inspirador conocer estas historias! Me encantaría conectar con más mujeres emprendedoras de la región."
      },
      {
        autor: "Carmen Quispe",
        contenido: "El curso de Liderazgo Femenino Wanka ha transformado mi perspectiva. ¡Altamente recomendado!"
      }
    ];

    mensajesData.forEach(data => {
      const id = randomUUID();
      this.mensajesForo.set(id, { ...data, id, fecha: new Date() });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllReferentes(): Promise<Referente[]> {
    return Array.from(this.referentes.values());
  }

  async getReferente(id: string): Promise<Referente | undefined> {
    return this.referentes.get(id);
  }

  async createReferente(insertReferente: InsertReferente): Promise<Referente> {
    const id = randomUUID();
    const referente: Referente = { ...insertReferente, id, logros: insertReferente.logros || null };
    this.referentes.set(id, referente);
    return referente;
  }

  async getAllCursos(): Promise<Curso[]> {
    return Array.from(this.cursos.values());
  }

  async getCurso(id: string): Promise<Curso | undefined> {
    return this.cursos.get(id);
  }

  async createCurso(insertCurso: InsertCurso): Promise<Curso> {
    const id = randomUUID();
    const curso: Curso = { ...insertCurso, id };
    this.cursos.set(id, curso);
    return curso;
  }

  async getAllMensajesForo(): Promise<MensajeForo[]> {
    return Array.from(this.mensajesForo.values())
      .sort((a, b) => b.fecha.getTime() - a.fecha.getTime())
      .map(msg => ({
        id: msg.id,
        autor: msg.autor,
        contenido: msg.contenido,
        fecha: msg.fecha.toISOString()
      }));
  }

  async createMensajeForo(insertMensaje: InsertMensajeForo): Promise<MensajeForo> {
    const id = randomUUID();
    const fecha = new Date();
    const mensajeDB: MensajeForoDB = { ...insertMensaje, id, fecha };
    this.mensajesForo.set(id, mensajeDB);
    return {
      id,
      autor: insertMensaje.autor,
      contenido: insertMensaje.contenido,
      fecha: fecha.toISOString()
    };
  }
}

export const storage = new MemStorage();
