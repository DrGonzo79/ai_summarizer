# API credential remediation

The previous browser build embedded a RapidAPI billing credential. Removing the
file does not revoke copies in Git history or already published JavaScript.

1. Revoke the exposed RapidAPI key and review its usage and billing history.
2. Remove or rebuild any published version that included the old credential.
3. Keep the replacement key only in a backend environment variable, never in a
   Vite variable or a browser request header.
4. Deploy a same-origin server proxy that authenticates callers, validates article
   URLs and applies per-user rate and spending limits before calling RapidAPI.
5. Set `VITE_SUMMARIZER_PROXY_PATH` to that backend route only after it is secured.

Summarization remains disabled by default. This repository does not include the
backend proxy; a blank proxy setting makes no external request. Existing saved
summaries remain available in the browser.

Use Node.js 22.23.4, 24.22.1, or 26.12.1 (or a later patched release in the same
major). Rebuild without cached container layers to refresh certificate stores.
