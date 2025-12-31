import { Link } from "react-router-dom";
import { useMarketData, formatMarketCap } from "@/hooks/useMarketData";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { marketCap, isLoading } = useMarketData();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-lg border-b border-primary/20">
      <div className="max-w-6xl mx-auto px-3 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl sm:text-3xl animate-pulse-glow-red">🍅</span>
              <span className="font-display text-xl sm:text-2xl font-bold text-primary text-glow">$SOL</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-2">
              <Link
                to="/"
                className="font-display text-sm px-3 py-1 rounded-lg transition-colors bg-primary/20 text-primary"
              >
                Home
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 px-2 sm:px-3 py-1 rounded-lg bg-card/50 border border-primary/20">
              <span className="font-body text-xs sm:text-sm text-muted-foreground">MCap:</span>
              <span className="font-display text-sm sm:text-lg text-primary text-glow">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : marketCap ? (
                  formatMarketCap(marketCap)
                ) : (
                  "N/A"
                )}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary"
            >
              <a
                href="https://x.com/i/communities/2005766071333077200"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="hidden sm:inline text-xs font-display">Community</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
