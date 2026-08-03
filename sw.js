// Kill-switch: this service worker exists only to destroy its predecessors.
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    const ks=await caches.keys();
    await Promise.all(ks.map(k=>caches.delete(k)));
    await self.registration.unregister();
    const cs=await self.clients.matchAll({type:'window'});
    cs.forEach(c=>c.navigate(c.url));   // reload every open page onto the live network version
  })());
});
// no fetch handler: never intercepts anything
