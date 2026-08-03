const C='cadence-v6';
const CORE=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png',
 'https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const isShell=e.request.mode==='navigate'||e.request.url.endsWith('/index.html')||e.request.url.endsWith('/');
  if(isShell){
    // network-first: always try for the newest app; fall back to cache offline
    e.respondWith(fetch(e.request).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put('./index.html',cp));return n})
      .catch(()=>caches.match('./index.html')));
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(e.request,cp));return n})));
  }
});