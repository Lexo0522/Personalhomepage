const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate'
};

const CACHE_CONFIG = {
  '/': CACHE_STRATEGIES.NETWORK_FIRST,
  '/css/': CACHE_STRATEGIES.CACHE_FIRST,
  '/js/': CACHE_STRATEGIES.CACHE_FIRST,
  '/img/': CACHE_STRATEGIES.CACHE_FIRST,
  '/manifest.json': CACHE_STRATEGIES.CACHE_FIRST,
  '/offline.html': CACHE_STRATEGIES.CACHE_FIRST
};

const CACHE_DURATIONS = {
  '/': 3600,
  '/css/': 31536000,
  '/js/': 31536000,
  '/img/': 31536000,
  '/manifest.json': 31536000,
  '/offline.html': 31536000
};

function getCacheStrategy(url) {
  const path = new URL(url).pathname;
  
  for (const [pattern, strategy] of Object.entries(CACHE_CONFIG)) {
    if (path.startsWith(pattern)) {
      return strategy;
    }
  }
  
  return CACHE_STRATEGIES.NETWORK_FIRST;
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  
  if (networkResponse && networkResponse.status === 200) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return caches.match('/offline.html');
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  
  return cachedResponse || fetchPromise;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;

  const strategy = getCacheStrategy(url);
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      event.respondWith(cacheFirst(request));
      break;
    case CACHE_STRATEGIES.NETWORK_FIRST:
      event.respondWith(networkFirst(request));
      break;
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      event.respondWith(staleWhileRevalidate(request));
      break;
    default:
      event.respondWith(networkFirst(request));
  }
});