// Einfalt offline-skyndiminni. Netið fyrst, svo skyndiminni ef netið er ekki til staðar.
const CACHE = 'bom-v3';
const CORE = ['./', './index.html', './manifest.json', './img/maja-happy.jpg', './img/maja-annoyed.jpg', './img/maja-angry.jpg', './img/neutral.jpg', './img/icon-192.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); if (r.ok && new URL(e.request.url).origin === location.origin) caches.open(CACHE).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
});
