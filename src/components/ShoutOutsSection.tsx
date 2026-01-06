import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
      ready?: (callback: () => void) => void;
    };
    __twitterWidgetsPromise?: Promise<void>;
  }
}

const TWITTER_WIDGETS_SRC = "https://platform.twitter.com/widgets.js";

function ensureTwitterWidgets(): Promise<void> {
  if (window.twttr?.widgets) return Promise.resolve();

  if (window.__twitterWidgetsPromise) return window.__twitterWidgetsPromise;

  window.__twitterWidgetsPromise = new Promise<void>((resolve, reject) => {
    // X sometimes injects a hashed script (platform.twitter.com/js/tweet.*.js), so look broadly.
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://platform.twitter.com/widgets.js"], script[src^="https://platform.twitter.com/js/tweet"]'
    );

    const waitForTwttr = () => {
      if (window.twttr?.widgets) resolve();
    };

    if (existing) {
      // Script is present (or was swapped by X); wait a tick for window.twttr.
      window.setTimeout(waitForTwttr, 0);
      // Also poll briefly in case twttr attaches slightly later.
      let tries = 0;
      const i = window.setInterval(() => {
        tries += 1;
        if (window.twttr?.widgets) {
          window.clearInterval(i);
          resolve();
        } else if (tries >= 20) {
          window.clearInterval(i);
          reject(new Error("Twitter widgets script present but twttr not available"));
        }
      }, 150);
      return;
    }

    const script = document.createElement("script");
    script.src = TWITTER_WIDGETS_SRC;
    script.async = true;
    script.charset = "utf-8";

    script.onload = () => {
      // twttr may attach after onload; poll briefly.
      let tries = 0;
      const i = window.setInterval(() => {
        tries += 1;
        if (window.twttr?.widgets) {
          window.clearInterval(i);
          resolve();
        } else if (tries >= 20) {
          window.clearInterval(i);
          reject(new Error("Twitter widgets loaded but twttr not available"));
        }
      }, 150);
    };

    script.onerror = () => reject(new Error("Failed to load Twitter widgets script"));

    document.head.appendChild(script);
  });

  return window.__twitterWidgetsPromise;
}

const shoutOuts = [
  { id: "2008422258017268025", author: "d33v33d0" },
  { id: "2008337335495090233", author: "TBC_on_X" },
  { id: "2008304020717277546", author: "json1444" },
];

export const ShoutOutsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const render = (attempt = 0) => {
      if (cancelled || !containerRef.current || !window.twttr?.widgets) return;

      window.twttr.widgets.load(containerRef.current);

      if (attempt < 3) {
        window.setTimeout(() => {
          const rendered = containerRef.current?.querySelectorAll(
            "iframe.twitter-tweet-rendered"
          ).length;
          if (!rendered) render(attempt + 1);
        }, 900);
      }
    };

    ensureTwitterWidgets()
      .then(() => {
        if (cancelled) return;
        // Prefer twttr.ready when available for more reliable playback.
        if (window.twttr?.ready) window.twttr.ready(() => render(0));
        else render(0);
      })
      .catch(() => {
        // Keep the plain links visible if embeds are blocked.
      });

    return () => {
      cancelled = true;
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
