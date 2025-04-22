const CACHE_NAME = "fitness-cache-v1";
const OFFLINE_URL = "/offline.html";

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
  "/offline.html",
  "/faq.html"
];

// Install: Cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate: Delete old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch: Respond with cache or fallback to offline
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match(OFFLINE_URL);
      });
    })
  );
});
