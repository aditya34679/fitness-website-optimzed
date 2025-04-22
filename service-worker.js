const CACHE_NAME = "fitness-cache-v1";
const urlsToCache = [
  "/",
  "/home.html",
  "/style.css",
  "/images/fit1.jpg",
  "/images/fit2.jpg",
  "/images/FIT3.jpg",
  "/images/fit4.jpg",
  "/images/fit5.jpg",
  "/images/fit6.jpg",
  "/images/fit7.jpg",
  "/images/fit8.jpg",
  "/images/fit9.jpg",
  "/images/fit11.jpg",
  "/images/image1.webp",
  "/images/image2.webp",
  "/images/IMG1.png",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/about.html",
  "/BMI.html",
  "/buynow.html",
  "/cart.html",
  "/contact.html",
  "/chat.html",
  "/diet.html",
  "/feedback.html",
  "/fitness center.html",
  "/item.html",
  "/login.html",
  "/product.html",
  "/service.html",
  "/signup.html",
  "/social.html",
  "/script.js",
  "/faq.html",
  "/offline.html"
];

// Install event: caching all specified assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Activate immediately after install
});

// Activate event: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Control all pages immediately
});

// Fetch event: respond with cached resource or fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request).catch(() => {
        // Return offline.html only for navigation requests (like page loads)
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html");
        }
      });
    })
  );
});
