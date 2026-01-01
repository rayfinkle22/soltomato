import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

declare global {
  interface Window {
    twttr: any;
  }
}

export const UpdatesSection = () => {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widget script
    const loadTwitterWidget = () => {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load(tweetRef.current);
      }
    };

    if (window.twttr) {
      loadTwitterWidget();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      script.onload = loadTwitterWidget;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="updates" className="py-16 sm:py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            🌱 Project Updates
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow along with the latest developments from the Biodome experiment
          </p>
        </div>

        {/* Tweet Embed Container */}
        <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              Live Thread from @d33v33d0
            </h3>
            <a
              href="https://x.com/d33v33d0/status/2006221407340867881"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
            >
              View on X <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Embedded Tweet */}
          <div ref={tweetRef} className="flex justify-center overflow-x-auto">
            <blockquote 
              className="twitter-tweet" 
              data-theme="dark"
              data-width="100%"
            >
              <a href="https://x.com/d33v33d0/status/2006221407340867881?ref_src=twsrc%5Etfw">
                Loading tweet...
              </a>
            </blockquote>
          </div>

          {/* Additional context */}
          <div className="mt-6 pt-6 border-t border-primary/10 text-center">
            <p className="text-sm text-muted-foreground">
              Click the tweet to view the full thread and all replies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
