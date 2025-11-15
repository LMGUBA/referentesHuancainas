import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavigationProps {
  activeSection?: string;
}

export default function Navigation({ activeSection = "home" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Inicio", path: "/" },
    { id: "referentes", label: "Referentes", path: "/#referentes" },
    { id: "cursos", label: "Cursos", path: "/#cursos" },
    { id: "mapa", label: "Mapa Wanka", path: "/#mapa" },
    { id: "foro", label: "Comunidad", path: "/#foro" },
    { id: "chat", label: "Chatbot", path: "/#chat" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <h2 className="font-serif text-xl font-semibold cursor-pointer hover-elevate active-elevate-2 px-2 py-1 rounded-md" data-testid="link-home">
            Referentes Huancaínas 2.0
          </h2>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className={`px-4 py-2 rounded-md hover-elevate active-elevate-2 transition-colors font-medium ${
                activeSection === item.id ? "bg-primary-foreground/10" : ""
              }`}
              data-testid={`link-${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-menu-toggle"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10">
          <div className="px-6 py-4 flex flex-col gap-2">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                className={`px-4 py-3 rounded-md hover-elevate active-elevate-2 transition-colors ${
                  activeSection === item.id ? "bg-primary-foreground/10" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
