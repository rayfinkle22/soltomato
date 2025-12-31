import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const CONTRACT_ADDRESS = "jk1T35eWK41MBMM8AWoYVaNbjHEEQzMDetTsfnqpump";

export const HeroSection = () => {
  const [copied, setCopied] = useState(false);

  const copyCA = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setCopied(true);
      toast.success("Contract address copied! 🍅");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center px-3 sm:px-4 py-8 sm:py-16 overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        {/* Hero emoji banner */}
        <div className="mb-4 sm:mb-8 relative">
          <div className="text-6xl sm:text-9xl animate-float">
            🍅
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-7xl md:text-8xl font-bold text-accent text-outline mb-2 sm:mb-4">
          $TOMATO
        </h1>

        {/* Tagline */}
        <p className="font-body text-lg sm:text-2xl md:text-3xl text-foreground mb-3 sm:mb-5">
          Fresh from the garden, straight to the moon! 🚀
        </p>

        {/* Catchphrase */}
        <p className="font-body text-sm sm:text-lg text-muted-foreground italic mb-4 sm:mb-8">
          &quot;Plant your seeds today, harvest tomatoes tomorrow!&quot; 🌱
        </p>

        {/* Buttons Section */}
        <div className="flex flex-col items-center gap-3 sm:gap-5">
          {/* DEX and Community buttons */}
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
            <Button
              variant="fun"
              size="default"
              asChild
              className="group h-9 sm:h-12 px-4 sm:px-6"
            >
              <a
                href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-lg sm:text-2xl group-hover:animate-bounce">📊</span>
                <span className="font-display text-sm sm:text-base">DEX</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-60" />
              </a>
            </Button>

            <Button
              variant="fun"
              size="default"
              asChild
              className="group h-9 sm:h-12 px-4 sm:px-6"
            >
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-lg sm:text-2xl group-hover:animate-bounce">🐦</span>
                <span className="font-display text-sm sm:text-base">Community</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-60" />
              </a>
            </Button>
          </div>

          {/* Contract Address button */}
          <button
            onClick={copyCA}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 bg-card hover:bg-secondary/50 rounded-full border-2 border-dashed border-primary/40 hover:border-accent transition-all group"
          >
            <span className="text-xs sm:text-sm text-muted-foreground font-body">CA:</span>
            <code className="text-xs sm:text-sm font-mono text-foreground/80 truncate max-w-[180px] sm:max-w-none">
              {CONTRACT_ADDRESS}
            </code>
            {copied ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
            ) : (
              <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-accent flex-shrink-0 transition-colors" />
            )}
            <span className="text-xl sm:text-2xl">🍅</span>
          </button>
        </div>
      </div>
    </section>
  );
};
