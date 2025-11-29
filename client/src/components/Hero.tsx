import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Huancayo_cultural_hero_landscape_9c98613a.png";

interface HeroProps {
  onCTAClick?: () => void;
}

export default function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="relative h-[75vh] rounded-lg overflow-hidden mx-6 mt-24 mb-12">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      <div className="relative h-full flex items-end p-8 md:p-12">
        <div className="max-w-2xl">
          <h1
            className="font-serif text-4xl md:text-6xl font-bold text-white mb-4"
            style={{ textShadow: "0 3px 10px rgba(0,0,0,0.8)" }}
            data-testid="text-hero-title"
          >
            Mujeres Wanka liderando el cambio
          </h1>
          <p
            className="text-lg md:text-xl text-white mb-6 max-w-md"
            style={{ textShadow: "0 3px 10px rgba(0,0,0,0.8)" }}
            data-testid="text-hero-subtitle"
          >
            Descubre historias inspiradoras de liderazgo femenino desde el corazón de Huancayo.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="bg-background/20 backdrop-blur-sm border-primary-foreground/30 text-white hover:bg-background/30"
            onClick={onCTAClick}
            data-testid="button-hero-cta"
          >
            Explorar Referentes
          </Button>
        </div>
      </div>
    </section>
  );
}
