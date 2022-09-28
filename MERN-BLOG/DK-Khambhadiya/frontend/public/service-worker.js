const cacheName = "v25";

// Install a service worker
self.addEventListener("install", (event) => {
    console.log("Service Workers: Installed");
});

// Cache and return requests
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then((res) => {
                //Make clone of response
                const resClone = res.clone();
                // Open cache
                caches.open(cacheName).then((cache) => {
                    // Add response to the cache
                    cache.put(event.request, resClone);
                });
                return res;
            })
            .catch((err) =>
                caches
                    .match(event.request)
                    .then((res) => res)
                    .catch((err) => console.error(err))
            )
    );
});

// Update a service worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
