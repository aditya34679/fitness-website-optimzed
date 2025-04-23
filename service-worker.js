const CACHE_NAME = "fitness-cache-v1";

const urlsToCache = [
  "/", "/home.html", "/style.css",
  "/images/fit1.jpg", "/images/fit2.jpg", "/images/FIT3.jpg",
  "/images/fit4.jpg", "/images/fit5.jpg", "/images/fit6.jpg",
  "/images/fit7.jpg", "/images/fit8.jpg", "/images/fit9.jpg",
  "/images/fit11.jpg", "/images/image1.webp", "/images/image2.webp",
  "/images/IMG1.png", "/images/img2.jpg", "/images/img3.jpg",
  "/about.html", "/BMI.html", "/buynow.html", "/cart.html",
  "/contact.html", "/chat.html", "/diet.html", "/feedback.html",
  "/fitness-center.html", "/item.html", "/login.html", "/product.html",
  "/service.html", "/signup.html", "/social.html", "/faq.html",
  "/script.js", "/offline.html"
];



self.addEventListener("install", (event) => {
  console.log("Caching assets");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: Serves cached assets
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event: Clears old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
