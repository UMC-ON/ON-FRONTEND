// const addResourcesToCache = async (resources) => {
//   // 오프라인 데이터 저장을 위해 Cache Storage 활용
//   const cache = await caches.open('my-cache');
//   await cache.addAll(resources);
// };

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     addResourcesToCache([
//       // 캐시하려는 모든 리소스를 나열..
//       '/index.html',
//       '/assets/index.css',
//       '/static/bear.png',
//       '/static/chicken.png',
//       '/static/dog.png',
//       '/static/giraffe.png',
//       '/static/meerkat.png',
//       '/static/panda.png',
//     ]),
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     // 캐시 우선 전략 (그 외 다른 전략에 대해서는 후술)
//     // -> 캐시된 응답에서 먼저 검색하고, 찾지 못한 경우 네트워크에서 로드
//     caches.match(event.request).then((cachedResponse) => {
//       return cachedResponse || fetch(event.request);
//     }),
//   );
// });

self.addEventListener('install', (e) => {
  console.log('[Service Worker] installed', e);
});

// activate event
self.addEventListener('activate', (e) => {
  console.log('[Service Worker] actived', e);
});

// fetch event
self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] fetched resource ' + e.request.url);
});
