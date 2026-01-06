import { ExternalLink } from "lucide-react";
import shoutoutVideo from "@/assets/shoutout-video.mp4";

export const ShoutOutsSection = () => {
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

          {/* Video */}
          <div className="flex flex-col items-center gap-4">
            <video
              src={shoutoutVideo}
              controls
              className="w-full max-w-lg rounded-xl border border-border/50"
              playsInline
            />
            
            {/* Link to tweet */}
            <a
              href="https://x.com/tbc_on_x/status/2008337335495090233"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-sm text-foreground hover:bg-background/60 transition-colors"
            >
              View on X: @tbc_on_x <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
