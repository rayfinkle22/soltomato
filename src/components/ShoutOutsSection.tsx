import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { renderTweets } from "@/lib/twitterWidgets";

const shoutOuts = [
  { id: "2008337335495090233", author: "tbc_on_x" },
  { id: "2008304020717277546", author: "json1444" },
];

export const ShoutOutsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [embedFailed, setEmbedFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!containerRef.current) return;

      try {
        await renderTweets({
          container: containerRef.current,
          tweetIds: shoutOuts.map((s) => ({ id: s.id, author: s.author })),
          theme: "dark",
          conversation: "none",
        });
      } catch {
        if (!cancelled) setEmbedFailed(true);
      }
    })();

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

          {embedFailed ? (
            <div className="space-y-3">
              {shoutOuts.map((s) => (
                <a
                  key={s.id}
                  href={`https://x.com/i/status/${s.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-sm text-foreground hover:bg-background/60 transition-colors"
                >
                  View on X: @{s.author} / {s.id}
                </a>
              ))}
              <p className="text-xs text-muted-foreground/70">
                If you’re using an ad/tracker blocker, it may prevent embeds from loading.
              </p>
            </div>
          ) : (
            <>
              <div
                ref={containerRef}
                className="flex flex-col items-center gap-6"
              />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {shoutOuts.map((s) => (
                  <a
                    key={s.id}
                    href={`https://x.com/i/status/${s.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-sm text-foreground hover:bg-background/60 transition-colors"
                  >
                    View on X: @{s.author}
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
