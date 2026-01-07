import { useMarketData, formatMarketCap } from "@/hooks/useMarketData";

const CONTRACT_ADDRESS = "jk1T35eWK41MBMM8AWoYVaNbjHEEQzMDetTsfnqpump";

export const DexChart = () => {
  const { marketCap, txns24h, priceChange, isLoading } = useMarketData();
  const priceChange24h = priceChange.h24;
  const totalTxns = txns24h ? txns24h.buys + txns24h.sells : null;

  return (
    <section id="chart" className="relative z-10 py-6 sm:py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl text-center text-white mb-1">
          Live Chart 📈
        </h2>
        <p className="font-body text-center text-white/70 mb-4">
          Track $SOL in real-time on Dexscreener
        </p>

        {/* Market Stats Display */}
        <div className="mb-6 p-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="font-body text-sm text-white/70 mb-1">Market Cap</p>
              <p className="font-display text-xl sm:text-2xl text-white">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : marketCap ? (
                  formatMarketCap(marketCap)
                ) : (
                  "N/A"
                )}
              </p>
            </div>
            <div className="text-center">
              <p className="font-body text-sm text-white/70 mb-1">24h Txns</p>
              <p className="font-display text-xl sm:text-2xl text-white">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : totalTxns !== null ? (
                  totalTxns.toLocaleString()
                ) : (
                  "N/A"
                )}
              </p>
            </div>
            <div className="text-center">
              <p className="font-body text-sm text-white/70 mb-1">24h Change</p>
              <p className="font-display text-xl sm:text-2xl text-white">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : priceChange24h !== null ? (
                  `${priceChange24h >= 0 ? '+' : ''}${priceChange24h.toFixed(2)}%`
                ) : (
                  "N/A"
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/20 overflow-hidden bg-white/10 backdrop-blur-sm">
          <iframe
            src="https://dexscreener.com/solana/CcYbXbMHr2o9Vyz2wmJcRvi59wh42xkXf6qrzChbHPN5?embed=1&theme=dark&trades=0&info=0"
            title="$SOL Trophy Tomato Dexscreener Chart"
            className="w-full border-0 min-h-[300px] sm:min-h-[400px]"
            style={{ height: "100%", maxHeight: 400 }}
            allow="clipboard-write"
          />
        </div>

        <p className="text-center mt-4">
          <a
            href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-white hover:text-white/80 transition-colors inline-flex items-center gap-2 underline underline-offset-2"
          >
            View full chart on Dexscreener →
          </a>
        </p>
      </div>
    </section>
  );
};
