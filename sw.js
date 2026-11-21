// Offline support: serve the app from the on-device cache and refresh it in the background.
// Bump VERSION when the list of core files changes.
const VERSION = "bills-v2";
const CORE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "firebase-config.js",
  "vendor/firebase-app-compat.js",
  "vendor/firebase-auth-compat.js",
  "vendor/firebase-firestore-compat.js",
  "icons/icon-192.png",
  "icons/icon-512.png"
];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  // Firebase sign-in and database traffic is never cached here; Firestore keeps its own offline copy.
  if (!sameOrigin && !FONT_HOSTS.includes(url.hostname)) return;
  if (sameOrigin && url.pathname.includes("/__/")) return;

  const key = req.mode === "navigate" ? new Request(new URL("./", self.location).href) : req;
  event.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(key, { ignoreSearch: req.mode === "navigate" });
      const fresh = fetch(req).then(res => {
        if (res && (res.ok || res.type === "opaque")) cache.put(key, res.clone());
        return res;
      }).catch(() => cached);
      // cached copy first so the app opens instantly offline; the update is picked up next launch
      if (cached) { event.waitUntil(fresh); return cached; }
      return fresh;
    })
  );
});
