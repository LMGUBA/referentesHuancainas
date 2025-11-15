import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ReferenteCard from "@/components/ReferenteCard";
import ProfileModal from "@/components/ProfileModal";
import CourseCard from "@/components/CourseCard";
import MapSection from "@/components/MapSection";
import ForumSection from "@/components/ForumSection";
import ChatbotSection from "@/components/ChatbotSection";
import { useToast } from "@/hooks/use-toast";

import portrait1 from "@assets/generated_images/Wanka_woman_leader_portrait_1_ef9f726f.png";
import portrait2 from "@assets/generated_images/Wanka_woman_leader_portrait_2_8ce50a42.png";
import portrait3 from "@assets/generated_images/Wanka_woman_leader_portrait_3_dbae5ba8.png";
import portrait4 from "@assets/generated_images/Wanka_woman_leader_portrait_4_e397305d.png";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedReferente, setSelectedReferente] = useState<any>(null);
  const { toast } = useToast();

  const referentes = [
    {
      id: "1",
      nombre: "Sara Huamán",
      foto: portrait1,
      rol: "Lideresa Cultural y Educadora",
      biografiaCorta: "Lideresa wanka, promotora cultural y defensora de la educación rural para mujeres.",
      biografia: "Sara Huamán es una destacada lideresa wanka, promotora cultural y defensora de la educación rural para mujeres. Con más de 15 años de experiencia en la región de Huancayo, ha trabajado incansablemente para preservar las tradiciones culturales mientras impulsa la educación y el empoderamiento femenino en comunidades rurales.",
      logros: [
        "Fundadora del programa 'Mujeres Wanka Líderes' que ha beneficiado a más de 500 mujeres",
        "Reconocida por el Ministerio de Cultura por su labor en preservación cultural",
        "Coordinadora de talleres de liderazgo en 20 comunidades rurales"
      ]
    },
    {
      id: "2",
      nombre: "Julia Quispe",
      foto: portrait2,
      rol: "Ingeniera y Activista STEM",
      biografiaCorta: "Ingeniera y activista STEM que impulsa la participación femenina en tecnología.",
      biografia: "Julia Quispe es una ingeniera apasionada y activista STEM dedicada a impulsar la participación de mujeres y niñas en ciencia y tecnología. Combina su expertise técnico con un profundo compromiso por la inclusión digital en comunidades wanka.",
      logros: [
        "Creadora del programa 'Niñas Wanka en Tecnología' con más de 300 participantes",
        "Mentora de 50+ mujeres en carreras STEM",
        "Desarrolladora de apps educativas para comunidades rurales"
      ]
    },
    {
      id: "3",
      nombre: "Elena Ccahuana",
      foto: portrait3,
      rol: "Educadora y Preservadora Cultural",
      biografiaCorta: "Maestra dedicada a la enseñanza intercultural y preservación de lenguas andinas.",
      biografia: "Elena Ccahuana ha dedicado su vida a la educación intercultural bilingüe, trabajando para que las nuevas generaciones mantengan viva su lengua y cultura wanka mientras acceden a educación de calidad.",
      logros: [
        "30 años de servicio en educación rural",
        "Autora de materiales didácticos en quechua wanka",
        "Formadora de docentes en educación intercultural"
      ]
    },
    {
      id: "4",
      nombre: "Rosa Vilcapoma",
      foto: portrait4,
      rol: "Emprendedora Social",
      biografiaCorta: "Emprendedora que lidera cooperativas de textiles tradicionales wanka.",
      biografia: "Rosa Vilcapoma es una emprendedora social que ha revolucionado la economía local al organizar cooperativas de mujeres artesanas. Su trabajo dignifica el arte textil wanka mientras genera oportunidades económicas sostenibles.",
      logros: [
        "Fundadora de la Cooperativa 'Warmi Wanka' con 80 artesanas",
        "Exportación de textiles a mercados internacionales",
        "Premio Nacional al Emprendimiento Femenino 2023"
      ]
    }
  ];

  const cursos = [
    {
      id: "1",
      titulo: "Liderazgo Femenino Wanka",
      descripcion: "Desarrolla habilidades de liderazgo mientras honras tu identidad cultural wanka. Aprende estrategias para liderar con autenticidad y fortaleza.",
      duracion: "4 semanas",
      nivel: "Intermedio"
    },
    {
      id: "2",
      titulo: "Mujer y Emprendimiento Rural",
      descripcion: "Aprende a crear y gestionar emprendimientos sostenibles en tu comunidad. Desde la planificación hasta la comercialización.",
      duracion: "3 semanas",
      nivel: "Principiante"
    },
    {
      id: "3",
      titulo: "Identidad Cultural y Memoria Andina",
      descripcion: "Explora la riqueza de la cultura wanka, sus tradiciones, cosmovisión y el valor de preservar nuestra identidad en el mundo moderno.",
      duracion: "2 semanas",
      nivel: "Principiante"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "referentes", "cursos", "mapa", "foro", "chat"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleEnroll = (titulo: string) => {
    console.log('Enrolled in:', titulo);
    toast({
      title: "¡Inscripción exitosa!",
      description: `Te has inscrito en "${titulo}". Pronto recibirás más información.`,
    });
  };

  const scrollToReferentes = () => {
    const element = document.getElementById("referentes");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} />

      <div id="home">
        <Hero onCTAClick={scrollToReferentes} />
      </div>

      <section className="py-20 px-6" id="referentes">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-semibold mb-4" data-testid="text-referentes-title">
              Referentes Huancaínas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conoce a las mujeres wanka que están transformando sus comunidades a través del liderazgo, educación y emprendimiento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {referentes.map((referente) => (
              <ReferenteCard
                key={referente.id}
                nombre={referente.nombre}
                foto={referente.foto}
                rol={referente.rol}
                biografiaCorta={referente.biografiaCorta}
                onClick={() => setSelectedReferente(referente)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/30" id="cursos">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-semibold mb-4" data-testid="text-cursos-title">
              Cursos Interculturales Wanka
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Programas educativos diseñados para fortalecer el liderazgo femenino mientras honramos nuestra identidad cultural
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursos.map((curso) => (
              <CourseCard
                key={curso.id}
                titulo={curso.titulo}
                descripcion={curso.descripcion}
                duracion={curso.duracion}
                nivel={curso.nivel}
                onEnroll={() => handleEnroll(curso.titulo)}
              />
            ))}
          </div>
        </div>
      </section>

      <MapSection />
      <ForumSection />
      <ChatbotSection />

      {selectedReferente && (
        <ProfileModal
          open={!!selectedReferente}
          onClose={() => setSelectedReferente(null)}
          nombre={selectedReferente.nombre}
          foto={selectedReferente.foto}
          rol={selectedReferente.rol}
          biografia={selectedReferente.biografia}
          logros={selectedReferente.logros}
        />
      )}
    </div>
  );
}
