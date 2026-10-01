// App-shell cache only. API responses are never cached (payment data must be live).
const C='fg-shell-v1';
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./icon.png']))));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin||e.request.method!=='GET')return;
e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});
