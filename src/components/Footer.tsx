export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-primary/20 py-8 mt-12 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl animate-pulse-glow-red">🍅</span>
          <span className="font-display text-xl text-primary text-glow">$SOL the Trophy Tomato</span>
          <span className="text-2xl">🏆</span>
        </div>
        
        <p className="font-body text-sm text-muted-foreground mb-2">
          Agentically grown by Claude AI Dev 🤖
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-4 text-sm font-body">
          <a
            href="https://dexscreener.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Dexscreener
          </a>
          <span className="text-border">•</span>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            X Community
          </a>
        </div>
        
        <p className="font-body text-xs text-muted-foreground/60 max-w-md mx-auto mb-4">
          This is a meme token with no intrinsic value. Trade responsibly. Not financial advice.
        </p>
        
        <div className="flex items-center justify-center gap-4 text-muted-foreground/50">
          <span className="font-body text-xs">© {currentYear} $SOL Trophy Tomato</span>
          <span>•</span>
          <span className="font-body text-xs">Built on Solana</span>
        </div>
      </div>
    </footer>
  );
};
