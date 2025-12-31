import { Link } from "react-router-dom";
import { useMarketData, formatMarketCap } from "@/hooks/useMarketData";

export const Header = () => {
  const { marketCap, isLoading } = useMarketData();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b-4 border-primary/30">
      <div className="max-w-6xl mx-auto px-3 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <span className="text-2xl sm:text-3xl">🍅</span>
              <span className="font-display text-xl sm:text-2xl font-bold text-primary">$TOMATO</span>
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
            <div className="flex items-center gap-2">
              <span className="font-body text-xs sm:text-sm text-muted-foreground">MCap:</span>
              <span className="font-display text-sm sm:text-lg text-accent">
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
