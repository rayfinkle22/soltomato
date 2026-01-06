import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
      ready: (callback: () => void) => void;
    };
  }
}

const shoutOuts = [
  { id: "2008422258017268025", author: "d33v33d0" },
  { id: "2008337335495090233", author: "TBC_on_X" },
  { id: "2008304020717277546", author: "json1444" },
];

export const ShoutOutsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadWidgets = (attempt = 0) => {
      if (!containerRef.current || !window.twttr?.widgets) return;

      window.twttr.widgets.load(containerRef.current);
      setIsLoaded(true);

      // If X returns a temporary "Not found" state, a quick retry usually fixes it.
      if (attempt < 2) {
        window.setTimeout(() => {
          const renderedEmbeds = containerRef.current?.querySelectorAll(
            "iframe.twitter-tweet-rendered"
          ).length;
          if (!renderedEmbeds) loadWidgets(attempt + 1);
        }, 900);
      }
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    
    if (existingScript) {
      // Script already loaded, just reload widgets
      if (window.twttr?.ready) {
        window.twttr.ready(loadWidgets);
      } else {
        loadWidgets();
      }
      return;
    }

    // Create and load script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    
    script.onload = () => {
      if (window.twttr?.ready) {
        window.twttr.ready(loadWidgets);
      } else {
        // Fallback with small delay
        setTimeout(loadWidgets, 500);
      }
    };

    document.body.appendChild(script);
  }, []);

  return (
    <section className="py-6 sm:py-10 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-1">
            📣 Shout Outs
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Community highlights and mentions
          </p>
        </div>

        {/* Shout Out Container */}
        <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              Featured Mentions
            </h3>
            <a
              href="https://x.com/TBC_on_X"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
            >
              Follow @TBC_on_X <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div ref={containerRef} className="flex flex-col items-center gap-6">
            {shoutOuts.map((shoutOut) => (
              <div key={shoutOut.id} className="w-full flex justify-center">
                <blockquote
                  className="twitter-tweet"
                  data-theme="dark"
                  data-conversation="none"
                >
                  <a href={`https://x.com/${shoutOut.author}/status/${shoutOut.id}`}>Loading…</a>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
