const CACHE_NAME = 'rutua-pwa-v3';
const PRE_CACHE = [
  '/',
  '/css/style.css',
  '/manifest.json',
  '/offline.html',
  '/js/theme-toggle.js',
  '/js/github-repos.js',
  '/js/blog-posts.js',
  '/js/back-to-top.js',
  'https://free.picui.cn/free/2025/12/23/694a5cdac0998.png', // favicon
  'https://free.picui.cn/free/2025/12/19/69454167760c6.jpg'  // avatar
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRE_CACHE))
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  // 只缓存 GET 请求
  if (request.method !== 'GET') return;

  // 先尝试从缓存获取
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) return response;

        // 否则去网络请求，并缓存响应
        return fetch(request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200) return networkResponse;

          // 缓存非动态内容（如 CSS、JS、图片）
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return networkResponse;
        }).catch(() => {
          // 网络失败时返回专门的离线页面
          return caches.match('/offline.html');
        });
      })
  );
});