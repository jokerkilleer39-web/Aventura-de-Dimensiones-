const cacheName = 'aventura-dimensiones-v42';

const assets = [
  './',
  './index.html',
  './niveles.html',
  './manifest.json',

  // ── Iconos generales ──
  './icono.png',

  // ── Imagen de carga ──
  './imagencarga.png',

  // ── Personajes menú ──
  './brandon.png',
  './kleydi.png',
  './nahomy.png',
  './cj.png',

  // ── Naves de héroes ──
  './nave_brandon.png',
  './nave_kleydi.png',
  './nave_nahomy.png',
  './nave_cj.png',

  // ── Avatares de diálogo ──
  './dialogo_brandon.png',
  './dialogo_kleydi.png',
  './dialogo_nahomy.png',
  './dialogo_cj.png',
  './dialogo_sistema.png',
  './dialogo_nordix.png',
  './dialogo_eud.png',

  // ── Proyectiles normales ──
  './proyectil_brandon.png',
  './proyectil_kleydi.png',
  './proyectil_nahomy.png',
  './proyectil_cj.png',

  // ── Proyectiles especiales ──
  './especial_brandon.png',
  './especial_kleydi.png',
  './especial_nahomy.png',
  './especial_cj.png',

  // ── Enemigos y obstáculos ──
  './villano.png',
  './obstaculo.png',
  './proyectil_villano.png',
  './jefe1.png',

  // ── Imágenes de habilidades (modal Archivos E.U.D.) ──
  './blastercool.png',
  './garrafelina.png',
  './cutebomb.png',
  './misilladrido.png',
  './bombaslimon.png',
  './bombaoso.png',
  './pulsoemp.png',
  './ladridodoble.png',

  // ── Audio ──
  './musicfinal.mp3',
  './musicwins.mp3',
  './musicmenu.mp3',

  // ── Fuentes ──
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght=600;700&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Instalando Service Worker v11...');
      const promesasCache = assets.map(url => {
        return cache.add(url).catch(error => {
          console.error(`⚠ Error al guardar en caché: ${url}`, error);
          return Promise.resolve();
        });
      });
      return Promise.all(promesasCache);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheName) {
            console.log('Borrando caché antiguo:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      return cachedResponse || fetch(e.request);
    })
  );
});