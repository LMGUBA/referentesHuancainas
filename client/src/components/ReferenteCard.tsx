import { Card } from "@/components/ui/card";

interface ReferenteCardProps {
  nombre: string;
  foto: string;
  rol: string;
  biografiaCorta: string;
  onClick: () => void;
}

export default function ReferenteCard({
  nombre,
  foto,
  rol,
  biografiaCorta,
  onClick,
}: ReferenteCardProps) {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-transform hover:scale-105 hover-elevate active-elevate-2"
      onClick={onClick}
      data-testid={`card-referente-${nombre.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={foto}
          alt={nombre}
          className="w-full h-full object-cover"
          data-testid={`img-referente-${nombre.toLowerCase().replace(/\s+/g, '-')}`}
        />
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-xl mb-1" data-testid={`text-referente-nombre-${nombre.toLowerCase().replace(/\s+/g, '-')}`}>
          {nombre}
        </h3>
        <p className="text-sm text-muted-foreground mb-2" data-testid={`text-referente-rol-${nombre.toLowerCase().replace(/\s+/g, '-')}`}>
          {rol}
        </p>
        <p className="text-sm line-clamp-3" data-testid={`text-referente-bio-${nombre.toLowerCase().replace(/\s+/g, '-')}`}>
          {biografiaCorta}
        </p>
      </div>
    </Card>
  );
}
