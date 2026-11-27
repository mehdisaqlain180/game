/**
 * Gravity Games Service Worker
 * Maps root /assets/ requests to appropriate game folders if needed
 * and provides offline caching for portal performance
 */

const CACHE_NAME = 'gravity-games-v1';

const ASSET_REWRITES = {
  '/assets/index-D9VmC681.js': "/Don't-Trust-The-Floor/assets/index-D9VmC681.js",
  '/assets/index-DidBH2Kp.css': "/Don't-Trust-The-Floor/assets/index-DidBH2Kp.css",
  '/assets/index-BMwqUhe3.css': '/Neon-Wave-Legends/assets/index-BMwqUhe3.css',
  '/assets/index-B_S9MjvE.js': '/Neon-Wave-Legends/assets/index-B_S9MjvE.js',
  '/assets/index-Cd68nujF.css': '/One-Button-Hell/assets/index-Cd68nujF.css',
  '/assets/index-KVZgtUt5.js': '/One-Button-Hell/assets/index-KVZgtUt5.js',
  '/assets/index-CRz3fB4t.js': '/Prism-Rush/assets/index-CRz3fB4t.js',
  '/assets/index-DvnoxroI.css': '/Prism-Rush/assets/index-DvnoxroI.css',
  '/assets/index-jV_uEiAw.js': '/Reality-Changes/assets/index-jV_uEiAw.js',
  '/assets/index-WJD7Bop8.css': '/Reality-Changes/assets/index-WJD7Bop8.css',
  '/assets/index-BGY81bhI.js': '/Savannah-Sovereign/assets/index-BGY81bhI.js',
  '/assets/index-D2o2slNE.css': '/Savannah-Sovereign/assets/index-D2o2slNE.css',
  '/assets/index-ChNP0ICl.css': '/swingline/assets/index-ChNP0ICl.css',
  '/assets/index-D-MpTOUe.js': '/swingline/assets/index-D-MpTOUe.js',
  '/assets/door-icon.svg': '/the-fake-exit/assets/door-icon.svg',
  '/assets/index-BT-Kubhw.js': '/the-fake-exit/assets/index-BT-Kubhw.js',
  '/assets/index-DdEPpUf8.css': '/the-fake-exit/assets/index-DdEPpUf8.css',
  '/assets/logo-CmA8_L1Q.svg': '/the-fake-exit/assets/logo-CmA8_L1Q.svg',
  '/assets/logo.svg': '/the-fake-exit/assets/logo.svg',
  '/assets/skull-icon.svg': '/the-fake-exit/assets/skull-icon.svg',
  '/assets/index-0mv6DrIp.css': '/threshold-shift/assets/index-0mv6DrIp.css',
  '/assets/index-DhbKtyPW.js': '/threshold-shift/assets/index-DhbKtyPW.js',
  '/assets/index-BOB8fjTq.css': '/trust-issues/assets/index-BOB8fjTq.css',
  '/assets/index-DbnShG_P.js': '/trust-issues/assets/index-DbnShG_P.js',
  '/assets/index-A_vNoe2W.js': '/vector-flip/assets/index-A_vNoe2W.js',
  '/assets/index-B7YF1nYG.css': '/vector-flip/assets/index-B7YF1nYG.css'
};

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const pathname = url.pathname;

  if (ASSET_REWRITES[pathname]) {
    event.respondWith(
      fetch(ASSET_REWRITES[pathname])
    );
    return;
  }

  event.respondWith(fetch(event.request));
});
