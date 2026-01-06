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
    <section className="py-8 sm:py-12 px-4 bg-background/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-primary text-glow">
            Shout Outs
          </h2>
          <a
            href="https://x.com/TBC_on_X"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Follow @TBC_on_X</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div ref={containerRef} className="flex flex-col gap-6">
          {shoutOuts.map((shoutOut) => (
            <div key={shoutOut.id} className="rounded-lg overflow-hidden">
              <blockquote className="twitter-tweet" data-theme="dark" data-conversation="none">
                <a href={`https://twitter.com/${shoutOut.author}/status/${shoutOut.id}`}>
                  Loading...
                </a>
              </blockquote>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Community highlights and mentions
        </p>
      </div>
    </section>
  );
};
