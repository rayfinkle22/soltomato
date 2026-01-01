import { useState } from "react";
import { Menu, X, ChartLine, MessageSquare, Leaf, Home } from "lucide-react";

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "chart", label: "Chart", icon: ChartLine },
  { id: "updates", label: "Updates", icon: MessageSquare },
  { id: "biodome", label: "Biodome", icon: Leaf },
];

export const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu items */}
      <div
        className={`absolute bottom-16 right-0 flex flex-col gap-2 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="flex items-center gap-3 px-4 py-2.5 bg-card/95 backdrop-blur-sm border border-primary/30 rounded-full hover:bg-primary/20 hover:border-primary transition-all group whitespace-nowrap"
          >
            <item.icon className="w-4 h-4 text-primary" />
            <span className="font-body text-sm text-foreground">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 transition-all hover:scale-105"
        aria-label="Navigation menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  );
};
