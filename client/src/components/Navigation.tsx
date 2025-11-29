import { Link } from "wouter";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoginDialog from "./LoginDialog";

interface NavigationProps {
  activeSection?: string;
}

export default function Navigation({ activeSection = "home" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { id: "home", label: "Inicio", path: "/" },
    { id: "referentes", label: "Referentes", path: "/#referentes" },
    { id: "cursos", label: "Cursos", path: "/#cursos" },
    { id: "mapa", label: "Mapa Wanka", path: "/#mapa" },
    { id: "foro", label: "Comunidad", path: "/#foro" },
    { id: "chat", label: "Chatbot", path: "/#chat" },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-vibrant shadow-lg">
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
                className={`px-4 py-2 rounded-md hover-elevate active-elevate-2 transition-colors font-medium ${activeSection === item.id ? "bg-primary-foreground/10" : ""
                  }`}
                data-testid={`link-${item.id}`}
              >
                {item.label}
              </a>
            ))}

            {user ? (
              <div className="flex items-center gap-2 ml-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-primary-foreground/10 rounded-md">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.username}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Salir
                </Button>
              </div>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setLoginDialogOpen(true)}
                className="ml-4 gap-2"
              >
                <LogIn className="h-4 w-4" />
                Iniciar Sesión
              </Button>
            )}
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
                  className={`px-4 py-3 rounded-md hover-elevate active-elevate-2 transition-colors ${activeSection === item.id ? "bg-primary-foreground/10" : ""
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.id}`}
                >
                  {item.label}
                </a>
              ))}

              {user ? (
                <div className="border-t border-primary-foreground/10 pt-4 mt-2 space-y-2">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-md">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{user.username}</span>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <Button
                  variant="secondary"
                  className="mt-2 gap-2"
                  onClick={() => {
                    setLoginDialogOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <LogIn className="h-4 w-4" />
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>

      <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} />
    </>
  );
}
