import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  nombre: string;
  foto: string;
  rol: string;
  biografia: string;
  logros?: string[];
}

export default function ProfileModal({
  open,
  onClose,
  nombre,
  foto,
  rol,
  biografia,
  logros = [],
}: ProfileModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-profile">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl" data-testid="text-modal-nombre">
            {nombre}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="rounded-lg overflow-hidden">
            <img
              src={foto}
              alt={nombre}
              className="w-full aspect-[4/3] object-cover"
              data-testid="img-modal-foto"
            />
          </div>

          <div>
            <Badge variant="secondary" className="mb-4" data-testid="badge-modal-rol">
              {rol}
            </Badge>
            <p className="text-base leading-relaxed" data-testid="text-modal-biografia">
              {biografia}
            </p>
          </div>

          {logros && logros.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Logros Destacados</h3>
              <ul className="space-y-2">
                {logros.map((logro, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2"
                    data-testid={`text-modal-logro-${index}`}
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{logro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
