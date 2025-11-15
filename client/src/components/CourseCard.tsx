import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp } from "lucide-react";

interface CourseCardProps {
  titulo: string;
  descripcion: string;
  duracion: string;
  nivel: string;
  onEnroll?: () => void;
}

export default function CourseCard({
  titulo,
  descripcion,
  duracion,
  nivel,
  onEnroll,
}: CourseCardProps) {
  const nivelColor = {
    Principiante: "secondary",
    Intermedio: "default",
    Avanzado: "destructive",
  }[nivel] || "secondary";

  return (
    <Card className="flex flex-col h-full hover-elevate" data-testid={`card-course-${titulo.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4 mb-2">
          <CardTitle className="font-serif text-xl flex-1" data-testid={`text-course-title-${titulo.toLowerCase().replace(/\s+/g, '-')}`}>
            {titulo}
          </CardTitle>
          <Badge variant={nivelColor as any} data-testid={`badge-course-nivel-${titulo.toLowerCase().replace(/\s+/g, '-')}`}>
            {nivel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground" data-testid={`text-course-description-${titulo.toLowerCase().replace(/\s+/g, '-')}`}>
          {descripcion}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-4 pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span data-testid={`text-course-duration-${titulo.toLowerCase().replace(/\s+/g, '-')}`}>{duracion}</span>
        </div>
        <Button
          variant="default"
          size="sm"
          onClick={onEnroll}
          data-testid={`button-enroll-${titulo.toLowerCase().replace(/\s+/g, '-')}`}
        >
          Inscribirse
        </Button>
      </CardFooter>
    </Card>
  );
}
