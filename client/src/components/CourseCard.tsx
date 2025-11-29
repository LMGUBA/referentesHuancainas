import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import LoginDialog from "./LoginDialog";

interface CourseCardProps {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  nivel: string;
  imagen: string;
  isEnrolled?: boolean;
  onEnroll?: () => void;
}

export default function CourseCard({
  id,
  titulo,
  descripcion,
  duracion,
  nivel,
  imagen,
  isEnrolled = false,
  onEnroll,
}: CourseCardProps) {
  const { user } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const nivelColor = {
    Principiante: "secondary",
    Intermedio: "default",
    Avanzado: "destructive",
  }[nivel] || "secondary";

  const handleEnrollClick = () => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }
    onEnroll?.();
  };

  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden hover-lift shadow-md hover:shadow-glow transition-all duration-300" data-testid={`card-course-${titulo.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="h-48 w-full overflow-hidden relative group">
          <img
            src={imagen}
            alt={titulo}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
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
            variant={isEnrolled ? "outline" : "default"}
            size="sm"
            onClick={handleEnrollClick}
            disabled={isEnrolled}
            data-testid={`button-enroll-${titulo.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {isEnrolled ? "Inscrito ✓" : "Inscribirse"}
          </Button>
        </CardFooter>
      </Card>

      <LoginDialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)} />
    </>
  );
}
