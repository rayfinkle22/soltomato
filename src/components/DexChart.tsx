import { useMarketData, formatMarketCap } from "@/hooks/useMarketData";

const CONTRACT_ADDRESS = "jk1T35eWK41MBMM8AWoYVaNbjHEEQzMDetTsfnqpump";

export const DexChart = () => {
  const { marketCap, priceUsd, priceChange, isLoading } = useMarketData();
  const priceChange24h = priceChange.h24;

  return (
    <section id="chart" className="relative z-10 py-6 sm:py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl text-center text-primary text-glow mb-2">
          Live Chart 📈
        </h2>
        <p className="font-body text-center text-muted-foreground mb-6">
          Track $SOL in real-time on Dexscreener
        </p>

        {/* Market Cap Display */}
        <div className="mb-6 p-4 rounded-2xl retro-border bg-card/50 backdrop-blur-sm">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            <div className="text-center">
              <p className="font-body text-sm text-muted-foreground mb-1">Market Cap</p>
              <p className="font-display text-2xl sm:text-3xl text-primary text-glow">
                {isLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : marketCap ? (
                  formatMarketCap(marketCap)
                ) : (
                  "N/A"
                )}
              </p>
            </div>
            <div className="text-center">
              <p className="font-body text-sm text-muted-foreground mb-1">Price</p>
              <p className="font-display text-2xl sm:text-3xl text-accent text-glow-red">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : priceUsd ? (
                  `$${parseFloat(priceUsd).toFixed(8)}`
                ) : (
                  "N/A"
                )}
              </p>
            </div>
            {priceChange24h !== null && (
              <div className="text-center">
                <p className="font-body text-sm text-muted-foreground mb-1">24h Change</p>
                <p className={`font-display text-2xl sm:text-3xl ${priceChange24h >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-2xl retro-border overflow-hidden bg-card/50 backdrop-blur-sm">
          <iframe
            src={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}?embed=1&theme=dark&trades=0&info=0`}
            title="$SOL Trophy Tomato Dexscreener Chart"
            className="w-full border-0 min-h-[300px] sm:min-h-[400px]"
            style={{ height: "100%", maxHeight: 400 }}
          />
        </div>

        <p className="text-center mt-4">
          <a
            href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-primary hover:text-accent transition-colors inline-flex items-center gap-2"
          >
            View full chart on Dexscreener →
          </a>
        </p>
      </div>
    </section>
  );
};
