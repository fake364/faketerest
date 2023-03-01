const CACHE_VERSION = 'v1';

const imagesFolders = ['dinnerIdea', 'homeDecor', 'newOutfit', 'thumbIdea'];

const getImagePath = (type, num) =>
  `/public/images/main-slider/${type}/${num}.jpeg`;
const indexes = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
];
const urls = imagesFolders
  .map((type) => indexes.map((index) => getImagePath(type, index)))
  .flat();

const cachePaths = ['/public/images/main-slider/'];

const addAllCache = async () => {
  const cache = await caches.open(CACHE_VERSION);
  return cache.addAll(urls);
};

const makeCall = async (event) => {
  return (await caches.match(event.request)) || (await fetch(event.request));
};

self.addEventListener('install', (event) => {
  event.waitUntil(addAllCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(makeCall(event));
});

self.addEventListener('activate', (event) => {
  return self.clients.claim();
});
