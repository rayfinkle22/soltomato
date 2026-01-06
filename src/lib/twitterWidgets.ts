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

  container.innerHTML = "";

  // Try to load X widgets, but never block rendering forever (ad blockers can stall script loads).
  const widgetsReady = await (async () => {
    try {
      await Promise.race([
        ensureTwitterWidgets(),
        new Promise<void>((_, reject) =>
          window.setTimeout(() => reject(new Error("X widgets load timeout")), timeoutMs)
        ),
      ]);
      return true;
    } catch {
      return false;
    }
  })();

  const tweets = tweetIds.map((t) =>
    typeof t === "string" ? { id: t, author: "i" } : t
  );

  const createTweet = widgetsReady ? window.twttr?.widgets.createTweet : undefined;

  const renderAsLinkCard = (mount: HTMLElement, tweet: { id: string; author: string }) => {
    mount.innerHTML = `
      <a
        href="https://x.com/i/status/${tweet.id}"
        target="_blank"
        rel="noopener noreferrer"
        style="display:block;text-decoration:none"
      >
        <div style="border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:14px 16px">
          <div style="font-size:12px;opacity:0.8">Open on X</div>
          <div style="font-size:14px;font-weight:600;word-break:break-word">@${tweet.author} · ${tweet.id}</div>
        </div>
      </a>
    `;
  };

  const renderAsBlockquote = (mount: HTMLElement, tweet: { id: string; author: string }) => {
    // Use /i/status/ to avoid username mismatches and handle renames.
    mount.innerHTML = `<blockquote class="twitter-tweet" data-theme="${theme}" data-conversation="${conversation}"><a href="https://x.com/i/status/${tweet.id}">View tweet</a></blockquote>`;
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

  const fixIfNotFound = (mount: HTMLElement, tweet: { id: string; author: string }) => {
    // Some embeds render a visible "Not found" message in the mount node.
    // If that happens, replace the embed with a reliable link card.
    window.setTimeout(() => {
      const text = mount.textContent?.toLowerCase() ?? "";
      if (text.includes("not found")) {
        renderAsLinkCard(mount, tweet);
      }
    }, 2500);
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
        // If X widgets times out, use a link card instead of leaving it empty.
        renderAsLinkCard(mount, tweet);
        continue;
      }

      fixIfNotFound(mount, tweet);
    }

    return true;
  }

  // No createTweet API available: render link cards so the section never looks empty.
  for (const tweet of tweets) {
    const mount = document.createElement("div");
    mount.className = "flex justify-center";
    renderAsLinkCard(mount, tweet);
    container.appendChild(mount);
  }

  return true;
}
