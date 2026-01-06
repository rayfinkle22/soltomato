import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

const shoutOuts = [
  { id: "2008337335495090233", author: "TBC_on_X" },
];

export const ShoutOutsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    script.onload = () => {
      if (window.twttr && containerRef.current) {
        window.twttr.widgets.load(containerRef.current);
      }
    };

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
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
                <blockquote className="twitter-tweet" data-theme="dark" data-conversation="none">
                  <a href={`https://twitter.com/${shoutOut.author}/status/${shoutOut.id}`}>
                    Loading...
                  </a>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
