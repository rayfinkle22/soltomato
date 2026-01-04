import { ExternalLink } from "lucide-react";

const tweets = [
  { id: "2007656914772259128", label: "Latest Update" },
  { id: "2007280874354864585", label: "Previous Update" },
  { id: "2006221407340867881", label: "Initial Thread" },
];

export const UpdatesSection = () => {
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
          <p className="text-xs text-muted-foreground/60 max-w-2xl mx-auto mt-2">
            The AI-cultivated plant experiment is an independent scientific project. A community-created meme token was later inspired by the experiment and developed separately. The experiment itself is not affiliated with or operated by any token or cryptocurrency project.
          </p>
        </div>

        {/* Tweet Embed Container */}
        <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-4 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              Live Thread from @d33v33d0
            </h3>
            <a
              href={`https://x.com/d33v33d0/status/${tweets[0].id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
            >
              View on X <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Embedded Tweets */}
          <div className="flex flex-col gap-10">
            {tweets.map((tweet) => (
              <div key={tweet.id} className="flex justify-center">
                <iframe
                  src={`https://platform.twitter.com/embed/Tweet.html?id=${tweet.id}&theme=dark`}
                  className="w-full max-w-[550px] min-h-[400px] border-0 rounded-xl"
                  allowFullScreen
                  title={`Tweet: ${tweet.label}`}
                />
              </div>
            ))}
          </div>

          {/* Additional context */}
          <div className="mt-6 pt-6 border-t border-primary/10 text-center">
            <p className="text-sm text-muted-foreground">
              Click the tweets to view the full threads and all replies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
