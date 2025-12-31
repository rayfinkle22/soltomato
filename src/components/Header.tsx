import { Link } from "react-router-dom";
import { useMarketData, formatMarketCap } from "@/hooks/useMarketData";

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
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-card/50 border border-primary/20">
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
          </div>
        </div>
      </div>
    </header>
  );
};
