import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare } from "lucide-react";

interface ForumMessage {
  id: string;
  autor: string;
  contenido: string;
  fecha: string;
}

export default function ForumSection() {
  const [message, setMessage] = useState("");
  
  const mockMessages: ForumMessage[] = [
    {
      id: "1",
      autor: "María López",
      contenido: "¡Qué inspirador conocer estas historias! Me encantaría conectar con más mujeres emprendedoras de la región.",
      fecha: "Hace 2 horas"
    },
    {
      id: "2",
      autor: "Carmen Quispe",
      contenido: "El curso de Liderazgo Femenino Wanka ha transformado mi perspectiva. ¡Altamente recomendado!",
      fecha: "Hace 5 horas"
    }
  ];

  const handleSubmit = () => {
    console.log('Message submitted:', message);
    setMessage("");
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
          {mockMessages.map((msg) => (
            <Card key={msg.id} data-testid={`card-message-${msg.id}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {msg.autor.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold" data-testid={`text-message-author-${msg.id}`}>{msg.autor}</p>
                    <p className="text-xs text-muted-foreground" data-testid={`text-message-date-${msg.id}`}>{msg.fecha}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p data-testid={`text-message-content-${msg.id}`}>{msg.contenido}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
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
                  disabled={!message.trim()}
                  data-testid="button-forum-submit"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Publicar Mensaje
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
