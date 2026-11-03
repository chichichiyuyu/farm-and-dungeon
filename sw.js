const CACHE = "farm-1871f29f"
const FILES = ["./index.html","./assets/index-Drg91m3o.js","./assets/App-B29cPorX.js","./assets/GameMenu-DFnBFDdy.js","./assets/boot-Blx_QN8O.js","./assets/index-7GRPiJAx.css","./manifest.webmanifest","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png"]
self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting())))
self.addEventListener('activate', (e) =>
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  )
)
self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return
  e.respondWith(
    req.mode === 'navigate'
      ? fetch(req).catch(() => caches.match('./index.html'))
      : caches.match(req).then((hit) => hit || fetch(req))
  )
})
