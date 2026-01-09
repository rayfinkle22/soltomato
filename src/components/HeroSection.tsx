import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import solVideo from "@/assets/SOL_1.mp4";

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
    <section id="hero" className="relative flex flex-col items-center justify-center px-3 sm:px-4 py-6 sm:py-10 overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        {/* Video */}
        <div className="mb-4 sm:mb-8 w-full">
          <video 
            src={solVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-5xl mx-auto rounded-lg shadow-lg"
          />
        </div>


        {/* Buttons Section */}
        <div className="flex flex-col items-center gap-3 sm:gap-5">
          {/* DEX and Community buttons */}
          <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
            <Button
              variant="fun"
              size="default"
              asChild
              className="group h-9 sm:h-12 px-4 sm:px-6 bg-white/80 hover:bg-white text-background border-white/20"
            >
              <a
                href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-lg sm:text-2xl group-hover:animate-bounce">📊</span>
                <span className="font-display text-sm sm:text-base text-background">DEX</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-60 text-background" />
              </a>
            </Button>

            <Button
              variant="fun"
              size="default"
              asChild
              className="group h-9 sm:h-12 px-4 sm:px-6 bg-white/80 hover:bg-white text-background border-white/20"
            >
              <a
                href={`https://pump.fun/coin/${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-lg sm:text-2xl group-hover:animate-bounce">🚀</span>
                <span className="font-display text-sm sm:text-base text-background">Pump.fun</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-60 text-background" />
              </a>
            </Button>

            <Button
              variant="fun"
              size="default"
              asChild
              className="group h-9 sm:h-12 px-4 sm:px-6 bg-white/80 hover:bg-white text-background border-white/20"
            >
              <a
                href="https://x.com/i/communities/2005766071333077200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-background">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="font-display text-sm sm:text-base text-background">Community</span>
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-60 text-background" />
              </a>
            </Button>
          </div>

          {/* Contract Address button */}
          <button
            onClick={copyCA}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 bg-white/80 hover:bg-white rounded-full border border-white/20 transition-all group"
          >
            <span className="text-xs sm:text-sm text-background/70 font-body">CA:</span>
            <code className="text-xs sm:text-sm font-mono text-background truncate max-w-[180px] sm:max-w-none">
              {CONTRACT_ADDRESS}
            </code>
            {copied ? (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-background flex-shrink-0" />
            ) : (
              <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-background/70 group-hover:text-background flex-shrink-0 transition-colors" />
            )}
            <span className="text-xl sm:text-2xl">🍅</span>
          </button>
        </div>
      </div>
    </section>
  );
};
