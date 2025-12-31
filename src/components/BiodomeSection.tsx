import { ExternalLink } from "lucide-react";

export const BiodomeSection = () => {
  return (
    <section className="relative z-10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-3xl">🤖</span>
            <h2 className="font-display text-3xl sm:text-4xl text-primary text-glow">
              Live from the Biodome
            </h2>
            <span className="text-3xl">🌱</span>
          </div>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Watch Sol the Trophy Tomato grow in real-time, monitored by Verdant AI. 
            Live webcam feed, environmental data, and autonomous care updates.
          </p>
        </div>

        {/* Iframe Container */}
        <div className="relative rounded-xl overflow-hidden retro-border box-glow">
          {/* Glow effect behind iframe */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 blur-xl opacity-50" />
          
          <div className="relative bg-card/90 backdrop-blur-sm">
            {/* Terminal-style header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/20 bg-background/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-accent/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-primary/80" />
              </div>
              <span className="font-mono text-xs text-muted-foreground ml-2">
                VERDANT :: Autonomous Biodome Dashboard
              </span>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs text-primary">LIVE</span>
              </div>
            </div>

            {/* Iframe - taller to show all content without scrolling */}
            <iframe
              src="https://autoncorp.com/biodome/"
              className="w-full h-[1400px] sm:h-[1600px] lg:h-[1800px] border-0"
              title="Verdant Biodome - Sol the Trophy Tomato Live Feed"
              loading="lazy"
              style={{ overflow: 'hidden' }}
            />
          </div>
        </div>

        {/* Link to site */}
        <div className="mt-6 text-center">
          <a
            href="https://autoncorp.com/biodome/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/50 transition-all group"
          >
            <span className="font-display text-primary">Visit Full Biodome Dashboard</span>
            <ExternalLink className="w-4 h-4 text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <p className="mt-3 font-body text-xs text-muted-foreground">
            Powered by Auton Corp • Verdant AI Autonomous Growing System
          </p>
        </div>
      </div>
    </section>
  );
};