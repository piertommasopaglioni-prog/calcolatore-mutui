const NOME_CACHE = 'mutui-pwa-v1';
const FILE_DA_CACHARE = [
    './',
    './index.html',
    './manifest.json'
];

// Installa il Service Worker e salva i file in cache
self.addEventListener('install', evento => {
    evento.waitUntil(
        caches.open(NOME_CACHE)
            .then(cache => {
                console.log('Cache aperta');
                return cache.addAll(FILE_DA_CACHARE);
            })
    );
});

// Intercetta le richieste: se non c'è internet, usa i file salvati in cache
self.addEventListener('fetch', evento => {
    evento.respondWith(
        caches.match(evento.request)
            .then(risposta => {
                // Se trova il file in cache lo restituisce, altrimenti lo scarica da internet
                return risposta || fetch(evento.request);
            })
    );
});