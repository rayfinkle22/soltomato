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
    <div className="fixed top-14 sm:top-16 right-3 z-40">
      {/* Menu items */}
      <div
        className={`absolute top-10 right-0 flex flex-col gap-1.5 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="flex items-center gap-2 px-3 py-1.5 bg-card/95 backdrop-blur-sm border border-primary/30 rounded-full hover:bg-primary/20 hover:border-primary transition-all group whitespace-nowrap text-xs"
          >
            <item.icon className="w-3 h-3 text-primary" />
            <span className="font-body text-xs text-foreground">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/20 transition-all hover:scale-105"
        aria-label="Navigation menu"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>
    </div>
  );
};
