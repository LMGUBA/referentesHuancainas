import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
}

export default function ChatbotSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content: "Sutiyki warmi, ¡bienvenida! Estoy aquí para ayudarte con cursos, mentorías o información sobre la cultura Wanka. ¿En qué puedo asistirte hoy?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes("curso")) {
      return "Te recomiendo el curso de Liderazgo Femenino Wanka. Es poderoso y transformador 🌄✨ Desarrollarás habilidades mientras honras tu identidad cultural.";
    } else if (msg.includes("mentora") || msg.includes("mentor")) {
      return "Puedes conectar con Sara Huamán, una de nuestras mejores mentoras. También tenemos a Julia Quispe, especialista en STEM.";
    } else if (msg.includes("hola") || msg.includes("buenos") || msg.includes("buenas")) {
      return "¡Hola! Es un placer saludarte. ¿Te gustaría conocer nuestros cursos, conectar con mentoras o aprender sobre la cultura Wanka?";
    } else if (msg.includes("ayuda") || msg.includes("información")) {
      return "Puedo ayudarte con: información sobre cursos interculturales, conectarte con mentoras Wanka, o compartir sobre nuestra cultura y tradiciones. ¿Qué te interesa?";
    } else {
      return "Sutiyki warmi, estoy aquí para ayudarte con cursos, mentorías o cultura Wanka. ¿Qué necesitas saber?";
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getBotResponse(inputMessage),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="py-20 px-6" id="chat">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-semibold mb-4" data-testid="text-chatbot-title">
            Chatbot Intercultural Wanka
          </h2>
          <p className="text-muted-foreground">
            Pregunta sobre cursos, mentorías o cultura Wanka
          </p>
        </div>

        <Card>
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-chart-2" />
              Asistente Wanka
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px] p-6" ref={scrollRef} data-testid="chatbox">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    data-testid={`message-${msg.type}-${msg.id}`}
                  >
                    {msg.type === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-chart-2 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`rounded-lg px-4 py-3 max-w-[80%] ${
                        msg.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                    {msg.type === "user" && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-6 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Escribe tu pregunta..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  data-testid="input-chat-message"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  data-testid="button-send-message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
