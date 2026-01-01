import { useState } from "react";
import { Link } from "react-router-dom";
import { useMarketData, formatMarketCap } from "@/hooks/useMarketData";
import { Menu, X, ChartLine, MessageSquare, Leaf, Home } from "lucide-react";

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "chart", label: "Chart", icon: ChartLine },
  { id: "updates", label: "Updates", icon: MessageSquare },
  { id: "biodome", label: "Biodome", icon: Leaf },
];

export const Header = () => {
  const { marketCap, isLoading } = useMarketData();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/90 backdrop-blur-lg border-b border-primary/20">
      <div className="max-w-6xl mx-auto px-3 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-xl sm:text-2xl animate-pulse-glow-red">🍅</span>
              <span className="font-display text-base sm:text-xl font-bold">
                <span className="text-primary text-glow">$SOL</span>
                <span className="text-foreground text-glow ml-1">the Trophy Tomato</span>
              </span>
            </Link>
            <nav className="hidden sm:flex items-center gap-2">
              <Link
                to="/"
                className="font-display text-sm px-3 py-1 rounded-lg transition-colors bg-primary/20 text-primary"
              >
                Home
              </Link>
              <a
                href="#updates"
                className="font-display text-sm px-3 py-1 rounded-lg transition-colors hover:bg-primary/10 text-muted-foreground hover:text-primary"
              >
                Updates
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center px-2 sm:px-3 h-8 rounded-md bg-card/50 border border-primary/20">
              <span className="font-display text-sm sm:text-base text-foreground text-glow">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : marketCap ? (
                  formatMarketCap(marketCap)
                ) : (
                  "N/A"
                )}
              </span>
            </div>

            {/* X Community Button */}
            <a
              href="https://x.com/i/communities/2005766071333077200"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-md border border-primary/30 bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all"
              aria-label="X Community"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-foreground drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Quick Nav Menu Button */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-8 h-8 rounded-md border border-primary/30 bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-all"
                aria-label="Quick navigation"
              >
                {menuOpen ? (
                  <X className="w-4 h-4 text-foreground drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]" />
                ) : (
                  <Menu className="w-4 h-4 text-foreground drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]" />
                )}
              </button>

              {/* Dropdown menu */}
              <div
                className={`absolute top-10 right-0 z-50 flex flex-col gap-1 p-2 bg-card border border-primary/30 rounded-lg shadow-lg transition-all duration-200 min-w-[120px] ${
                  menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/20 transition-all text-left"
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    <span className="font-body text-sm text-foreground">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
