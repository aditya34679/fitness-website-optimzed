const CACHE_NAME = "fitness-cache-v1";
const urlsToCache = [
  "/",
  "/home.html",
  "/style.css",
  "/images/fit1.jpg",
  "/images/fit2.jpg",
  "/images/fit3.jpg",  // Make sure this matches the actual file name
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

// Install event
self.addEventListener("install", event => {
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("[ServiceWorker] Caching app shell");
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener("activate", event => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        if (event.request.mode === "navigate") {
          return caches.match("/offline.html");
        }
      });
    })
  );
});
