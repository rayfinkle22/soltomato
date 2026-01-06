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
  tweetIds: string[];
  theme?: TwitterTheme;
  conversation?: "none" | "all";
  timeoutMs?: number;
}): Promise<boolean> {
  const {
    container,
    tweetIds,
    theme = "dark",
    conversation = "none",
    timeoutMs = 6500,
  } = params;

  await ensureTwitterWidgets();

  const waitForEmbeds = () =>
    new Promise<void>((resolve, reject) => {
      const start = Date.now();
      const tick = () => {
        const rendered = container.querySelectorAll(
          "iframe.twitter-tweet-rendered"
        ).length;

        if (rendered >= Math.max(1, tweetIds.length)) return resolve();
        if (Date.now() - start > timeoutMs)
          return reject(new Error("X embeds timed out"));

        window.setTimeout(tick, 250);
      };
      tick();
    });

  // Prefer createTweet (most reliable); fallback to widgets.load on blockquotes.
  const createTweet = window.twttr?.widgets.createTweet;

  container.innerHTML = "";

  if (createTweet) {
    for (const id of tweetIds) {
      const mount = document.createElement("div");
      mount.className = "flex justify-center";
      container.appendChild(mount);

      await createTweet(id, mount, {
        theme,
        conversation,
        align: "center",
        dnt: true,
      });
    }

    await waitForEmbeds();
    return true;
  }

  // Fallback path
  for (const id of tweetIds) {
    const mount = document.createElement("div");
    mount.className = "flex justify-center";
    mount.innerHTML = `<blockquote class="twitter-tweet" data-theme="${theme}" data-conversation="${conversation}"><a href="https://x.com/i/status/${id}">Loading…</a></blockquote>`;
    container.appendChild(mount);
  }

  window.twttr?.widgets.load(container);
  await waitForEmbeds();
  return true;
}
