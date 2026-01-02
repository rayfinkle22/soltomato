import { ExternalLink } from "lucide-react";

export const UpdatesSection = () => {
  const tweetId = "2006221407340867881";

  return (
    <section id="updates" className="py-6 sm:py-10 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-1">
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
              href={`https://x.com/d33v33d0/status/${tweetId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
            >
              View on X <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Embedded Tweet using Publish embed */}
          <div className="flex justify-center">
            <iframe
              src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark`}
              className="w-full max-w-[550px] min-h-[400px] border-0 rounded-xl"
              allowFullScreen
              title="Tweet from @d33v33d0"
            />
          </div>

          {/* Additional context */}
          <div className="mt-6 pt-6 border-t border-primary/10 text-center">
            <p className="text-sm text-muted-foreground">
              Click the tweet to view the full thread and all replies
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground/60 text-center mt-6 max-w-2xl mx-auto">
          The AI-cultivated plant experiment is an independent scientific project. A community-created meme token was later inspired by the experiment and developed separately. The experiment itself is not affiliated with or operated by any token or cryptocurrency project.
        </p>
      </div>
    </section>
  );
};
