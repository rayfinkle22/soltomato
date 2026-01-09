import { ExternalLink } from "lucide-react";

export const BiodomeSection = () => {
  return (
    <section id="biodome" className="relative z-10 py-6 sm:py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-3xl">🤖</span>
            <h2 className="font-display text-3xl sm:text-4xl text-primary">
              Live from the Biodome
            </h2>
            <span className="text-3xl">🌱</span>
          </div>
          <p className="font-body text-foreground/70 max-w-2xl mx-auto">
            Watch Sol the Trophy Tomato grow in real-time, monitored by Verdant AI. 
            Live webcam feed, environmental data, and autonomous care updates.
          </p>
        </div>

        {/* Iframe Container */}
        <div className="relative rounded-xl overflow-hidden border border-primary/30">
          <div className="relative bg-black/20 backdrop-blur-sm">
            {/* Terminal-style header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/20 bg-black/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="font-mono text-xs text-white/70 ml-2">
                VERDANT :: Autonomous Biodome Dashboard
              </span>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-white">LIVE</span>
              </div>
            </div>

            {/* Iframe - full width, external site handles responsive stacking */}
            <iframe
              src="https://autoncorp.com/biodome/"
              className="w-full h-[1400px] sm:h-[1600px] lg:h-[1800px] border-0"
              title="Verdant Biodome - Sol the Trophy Tomato Live Feed"
              allow="autoplay; encrypted-media"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Disclaimer and Link */}
        <div className="mt-6 text-center">
          <p className="font-body text-xs text-foreground/50 mb-4">
            ⚠️ We are not affiliated with Verdant Biodome or Auton Corp. This is a live embed of their public website.
          </p>
          <a
            href="https://autoncorp.com/biodome/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary border border-primary hover:bg-secondary transition-all group"
          >
            <span className="font-display text-white">Visit Full Biodome Dashboard</span>
            <ExternalLink className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};