// Shared helper for reliably loading and rendering X (Twitter) embeds.

export type TwitterTheme = "dark" | "light";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
        createTweet?: (
          id: string,
          element: HTMLElement,
          options?: Record<string, unknown>
        ) => Promise<unknown>;
      };
      ready?: (callback: () => void) => void;
    };
    __twitterWidgetsPromise?: Promise<void>;
  }
}

const TWITTER_WIDGETS_SRC = "https://platform.twitter.com/widgets.js";

export function ensureTwitterWidgets(): Promise<void> {
  if (window.twttr?.widgets) return Promise.resolve();
  if (window.__twitterWidgetsPromise) return window.__twitterWidgetsPromise;

  window.__twitterWidgetsPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://platform.twitter.com/widgets.js"], script[src^="https://platform.twitter.com/js/tweet"]'
    );

    const pollForTwttr = () => {
      let tries = 0;
      const i = window.setInterval(() => {
        tries += 1;
        if (window.twttr?.widgets) {
          window.clearInterval(i);
          resolve();
        } else if (tries >= 30) {
          window.clearInterval(i);
          reject(new Error("X widgets not available"));
        }
      }, 150);
    };

    if (existing) {
      pollForTwttr();
      return;
    }

    const script = document.createElement("script");
    script.src = TWITTER_WIDGETS_SRC;
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => pollForTwttr();
    script.onerror = () => reject(new Error("Failed to load X widgets script"));
    document.head.appendChild(script);
  });

  return window.__twitterWidgetsPromise;
}

export async function renderTweets(params: {
  container: HTMLElement;
  tweetIds: { id: string; author: string }[] | string[];
  theme?: TwitterTheme;
  conversation?: "none" | "all";
  timeoutMs?: number;
}): Promise<boolean> {
  const {
    container,
    tweetIds,
    theme = "dark",
    conversation = "none",
    timeoutMs = 15000,
  } = params;

  await ensureTwitterWidgets();

  container.innerHTML = "";

  const tweets = tweetIds.map((t) =>
    typeof t === "string" ? { id: t, author: "i" } : t
  );

  const createTweet = window.twttr?.widgets.createTweet;

  const renderAsBlockquote = (mount: HTMLElement, tweet: { id: string; author: string }) => {
    mount.innerHTML = `<blockquote class="twitter-tweet" data-theme="${theme}" data-conversation="${conversation}"><a href="https://x.com/${tweet.author}/status/${tweet.id}">View tweet</a></blockquote>`;
    window.twttr?.widgets.load(mount);
  };

  const withTimeout = async <T,>(p: Promise<T>): Promise<T | null> => {
    let t: number | undefined;
    const timeout = new Promise<null>((resolve) => {
      t = window.setTimeout(() => resolve(null), timeoutMs);
    });

    const result = await Promise.race([p, timeout]);
    if (t) window.clearTimeout(t);
    return result as T | null;
  };

  if (createTweet) {
    for (const tweet of tweets) {
      const mount = document.createElement("div");
      mount.className = "flex justify-center";
      container.appendChild(mount);

      const result = await withTimeout(
        createTweet(tweet.id, mount, {
          theme,
          conversation,
          align: "center",
          dnt: true,
        })
      );

      if (!result) {
        renderAsBlockquote(mount, tweet);
      }
    }

    return true;
  }

  // Fallback path using widgets.load
  for (const tweet of tweets) {
    const mount = document.createElement("div");
    mount.className = "flex justify-center";
    renderAsBlockquote(mount, tweet);
    container.appendChild(mount);
  }

  window.twttr?.widgets.load(container);
  return true;
}
