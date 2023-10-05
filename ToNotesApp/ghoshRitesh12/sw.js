const CACHE_NAME = "ver-1.0";
const assets = [
	'/',
	'/index.html',
	'/styles.css',
	'/app.js',
	'/localforage.js',
	'/icon-192x192.png'
];

// Install
self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				return cache.addAll(assets);
			})
	);
});

// Listen for requests
self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request)
			.then(response => {
				return response || fetch(e.request);
			})
	);
});

// Activation
// self.addEventListener('activate', (e) => {
//     const cacheWhiteList = [];
//     cacheWhiteList.push(CACHE_NAME);

//     e.waitUntil(
//         caches.keys().then(chacheNames => Promise.all(
//             chacheNames.map(cacheName => {
//                 if(!cacheWhiteList.includes(cacheName)) {
//                     return caches.delete(cacheName);
//                 }
//             })
//         ))
//     )
// });