import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ReferenteCard from "@/components/ReferenteCard";
import ProfileModal from "@/components/ProfileModal";
import CourseCard from "@/components/CourseCard";
import MapSection from "@/components/MapSection";
import ForumSection from "@/components/ForumSection";
import ChatbotSection from "@/components/ChatbotSection";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { Referente, Curso } from "@shared/schema";

import portrait1 from "@assets/generated_images/Wanka_woman_leader_portrait_1_ef9f726f.png";
import portrait2 from "@assets/generated_images/Wanka_woman_leader_portrait_2_8ce50a42.png";
import portrait3 from "@assets/generated_images/Wanka_woman_leader_portrait_3_dbae5ba8.png";
import portrait4 from "@assets/generated_images/Wanka_woman_leader_portrait_4_e397305d.png";

const photoMap: Record<string, string> = {
  "/assets/generated_images/Wanka_woman_leader_portrait_1_ef9f726f.png": portrait1,
  "/assets/generated_images/Wanka_woman_leader_portrait_2_8ce50a42.png": portrait2,
  "/assets/generated_images/Wanka_woman_leader_portrait_3_dbae5ba8.png": portrait3,
  "/assets/generated_images/Wanka_woman_leader_portrait_4_e397305d.png": portrait4,
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedReferente, setSelectedReferente] = useState<Referente | null>(null);
  const { toast } = useToast();

  const { data: referentes, isLoading: referentesLoading } = useQuery<Referente[]>({
    queryKey: ["/api/referentes"],
  });

  const { data: cursos, isLoading: cursosLoading } = useQuery<Curso[]>({
    queryKey: ["/api/cursos"],
  });

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

          {referentesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {referentes?.map((referente) => (
                <ReferenteCard
                  key={referente.id}
                  nombre={referente.nombre}
                  foto={photoMap[referente.foto] || referente.foto}
                  rol={referente.rol}
                  biografiaCorta={referente.biografia.slice(0, 100) + "..."}
                  onClick={() => setSelectedReferente(referente)}
                />
              ))}
            </div>
          )}
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

          {cursosLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursos?.map((curso) => (
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
          )}
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
          foto={photoMap[selectedReferente.foto] || selectedReferente.foto}
          rol={selectedReferente.rol}
          biografia={selectedReferente.biografia}
          logros={selectedReferente.logros || []}
        />
      )}
    </div>
  );
}
