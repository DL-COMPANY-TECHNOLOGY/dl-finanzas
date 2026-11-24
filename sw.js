// DL FINANZAS - Service worker: funciona sin conexión y se actualiza solo
const CACHE = 'dl-finanzas-v20-iphone';
const SHELL = ['./', './index.html', './legal.html', './firebase-config.js', './manifest.webmanifest', './logo.svg', './icon.svg', './dl-company.png', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Las llamadas a Firebase (login y base de datos) nunca pasan por la caché
  if (/googleapis\.com$|firebaseapp\.com$|er-api\.com$/.test(url.hostname)) return;

  // Archivos de la app: primero la red (para recibir actualizaciones); sin conexión, la copia guardada
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req.mode === 'navigate' ? './index.html' : req, copy)); }
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || (req.mode === 'navigate' ? caches.match('./index.html') : undefined)))
    );
    return;
  }

  // Externos (fuentes, librerías de Firebase): copia guardada y se refresca en segundo plano
  e.respondWith(
    caches.match(req).then((cached) => {
      const net = fetch(req).then((res) => {
        if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
