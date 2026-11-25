/* 毛球防线 · Service Worker
 * 目标：首次联网打开后，把 demo 与 assets 全部预缓存，之后离线可玩（iOS 添加到主屏幕 / 安卓安装）。
 * 策略：
 *   - 核心外壳（html/js/css）安装时缓存，导航走 network-first 以便更新
 *   - 图片 / 音频走 cache-first，命中直接返回，未命中回源并写入缓存
 *   - 安装后后台按 precache.json 补齐整个资源包（并发 3，失败不阻断）
 */
const VERSION = 'furple-v3';
const CACHE = VERSION;

const SHELL = [
  './index.html',
  './battle.html',
  './data.js',
  './audio.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon-180.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await Promise.allSettled(SHELL.map((u) => c.add(new Request(u, { cache: 'reload' }))));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

const ASSET_RE = /\.(png|jpe?g|webp|gif|mp3|wav|ogg|m4a|json|woff2?)$/i;

let warming = null;

async function warm() {
  if (warming) return warming;
  warming = (async () => {
    let list;
    try {
      const r = await fetch('./precache.json', { cache: 'no-cache' });
      list = (await r.json()).files || [];
    } catch (e) { return; }
    const c = await caches.open(CACHE);
    let i = 0;
    const worker = async () => {
      while (i < list.length) {
        const url = list[i++];
        try {
          const req = new Request(url, { cache: 'reload' });
          if (!(await c.match(req))) {
            const resp = await fetch(req);
            if (resp && resp.ok) await c.put(req, resp);
          }
        } catch (e) { /* 单个资源失败不影响其它 */ }
      }
    };
    await Promise.all([worker(), worker(), worker()]);
  })();
  return warming;
}

self.addEventListener('message', (e) => {
  const d = e.data || {};
  if (d.type === 'warm') { e.waitUntil(warm()); }
  if (d.type === 'version' && e.ports && e.ports[0]) e.ports[0].postMessage({ version: VERSION });
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 导航请求：网络优先，断网回缓存
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const c = await caches.open(CACHE);
        c.put(req, fresh.clone());
        return fresh;
      } catch (err) {
        const cached = await caches.match(req, { ignoreSearch: true });
        return cached || (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  // 静态资源：缓存优先
  if (ASSET_RE.test(url.pathname) || url.pathname.indexOf('/assets/') >= 0) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      const hit = await c.match(req);
      if (hit) return hit;
      try {
        const resp = await fetch(req);
        if (resp && resp.ok) c.put(req, resp.clone());
        return resp;
      } catch (err) {
        return (await c.match(req, { ignoreSearch: true })) || Response.error();
      }
    })());
    return;
  }

  // 其它：网络优先 + 缓存兜底
  e.respondWith((async () => {
    try { return await fetch(req); }
    catch (err) { return (await caches.match(req)) || Response.error(); }
  })());
});
