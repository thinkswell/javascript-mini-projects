const CACHE_NAME = "online-education-cache-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/images/logo.png",
  "/images/course1.jpg",
  "/images/course2.jpg",
  "/images/course3.webp",
  "/images/instructor.jpg",
  "/images/hero-bg.jpg",
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker and Remove Old Caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch Event: Improved Cache Strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request)
        .then((response) => {
          let responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => caches.match("/index.html")); // Fallback to home page if offline
    })
  );
});

// Sync Event: Retry Sending Form Data When Online
self.addEventListener("sync", (event) => {
  if (event.tag === "sendFormData") {
    event.waitUntil(
      (async () => {
        const data = JSON.parse(localStorage.getItem("pendingMessage"));
        if (data) {
          fetch("/send-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          })
            .then(() => {
              console.log("Form data sent successfully!");
              localStorage.removeItem("pendingMessage"); // Clear stored message
            })
            .catch((error) => console.error("Sync failed:", error));
        }
      })()
    );
  }
});

// Push Notification Event
self.addEventListener("push", (event) => {
  const options = {
    body: "New course updates available! 🎉",
    icon: "/images/logo.png",
    badge: "/images/logo.png",
  };

  event.waitUntil(
    self.registration.showNotification("Online Education", options)
  );
});
