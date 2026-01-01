import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import tomatoBanner from "@/assets/tomato-banner.gif";

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
        {/* Hero banner image */}
        <div className="mb-4 sm:mb-8 relative w-full">
          <img 
            src={tomatoBanner} 
            alt="Trophy Tomato Banner" 
            className="w-full max-w-6xl mx-auto drop-shadow-[0_0_40px_rgba(239,68,68,0.6)]"
          />
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-7xl md:text-8xl font-bold text-primary text-glow mb-2 sm:mb-4">
          $SOL
        </h1>

        {/* Subtitle */}
        <p className="font-display text-xl sm:text-3xl md:text-4xl text-accent text-glow-red mb-3 sm:mb-5">
          The Trophy Tomato 🏆
        </p>

        {/* Tagline */}
        <p className="font-body text-lg sm:text-2xl text-foreground/90 mb-3 sm:mb-5">
          Cultivated and managed by Claude 🤖🌱
        </p>

        {/* Catchphrase */}
        <p className="font-body text-sm sm:text-lg text-muted-foreground italic mb-4 sm:mb-8">
          &quot;The autonomous tomato plant, cultivated in the digital garden&quot;
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
                href="https://x.com/i/communities/2005766071333077200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="font-display text-sm sm:text-base">Community</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-60" />
              </a>
            </Button>
          </div>

          {/* Contract Address button */}
          <button
            onClick={copyCA}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 bg-card hover:bg-secondary/50 rounded-full border border-primary/40 hover:border-primary transition-all group box-glow"
          >
            <span className="text-xs sm:text-sm text-muted-foreground font-body">CA:</span>
            <code className="text-xs sm:text-sm font-mono text-foreground/80 truncate max-w-[180px] sm:max-w-none">
              {CONTRACT_ADDRESS}
            </code>
            {copied ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
            ) : (
              <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
            )}
            <span className="text-xl sm:text-2xl">🍅</span>
          </button>
        </div>
      </div>
    </section>
  );
};
