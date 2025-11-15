import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { MensajeForo } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default function ForumSection() {
  const [message, setMessage] = useState("");
  const [autorName, setAutorName] = useState("");
  const { toast } = useToast();

  const { data: mensajes, isLoading } = useQuery<MensajeForo[]>({
    queryKey: ["/api/foro/mensajes"],
  });

  const createMensajeMutation = useMutation({
    mutationFn: async (data: { autor: string; contenido: string }) => {
      return await apiRequest("POST", "/api/foro/mensajes", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/foro/mensajes"] });
      setMessage("");
      toast({
        title: "¡Mensaje publicado!",
        description: "Tu mensaje ha sido compartido con la comunidad.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo publicar el mensaje. Intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!message.trim() || !autorName.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor ingresa tu nombre y mensaje.",
        variant: "destructive",
      });
      return;
    }

    createMensajeMutation.mutate({
      autor: autorName,
      contenido: message,
    });
  };

  const formatFecha = (fecha: Date | string) => {
    const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return formatDistanceToNow(date, { addSuffix: true, locale: es });
  };

  return (
    <section className="py-20 px-6 bg-muted/30" id="foro">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-semibold mb-4" data-testid="text-forum-title">
            Comunidad Wanka
          </h2>
          <p className="text-muted-foreground">
            Comparte tus experiencias y conecta con otras mujeres líderes
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {isLoading ? (
            <>
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            mensajes?.map((msg) => (
              <Card key={msg.id} data-testid={`card-message-${msg.id}`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {msg.autor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold" data-testid={`text-message-author-${msg.id}`}>
                        {msg.autor}
                      </p>
                      <p className="text-xs text-muted-foreground" data-testid={`text-message-date-${msg.id}`}>
                        {formatFecha(msg.fecha)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p data-testid={`text-message-content-${msg.id}`}>{msg.contenido}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Tu nombre"
                value={autorName}
                onChange={(e) => setAutorName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-background"
                data-testid="input-forum-author"
              />
              <Textarea
                placeholder="Comparte tus pensamientos con la comunidad..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-32"
                data-testid="input-forum-message"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={!message.trim() || !autorName.trim() || createMensajeMutation.isPending}
                  data-testid="button-forum-submit"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {createMensajeMutation.isPending ? "Publicando..." : "Publicar Mensaje"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
