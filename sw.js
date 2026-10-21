/* CAT Prep service worker: lets the page open offline and installs as an app.
   Your data is never cached here: Firebase handles its own sync. */
const CACHE="cat-prep-v4";
const SHELL=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
const STATIC_HOSTS=["www.gstatic.com","fonts.googleapis.com","fonts.gstatic.com"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url);
  /* the page itself: always try the network first so updates show up, fall back to the saved copy offline */
  if(r.mode==="navigate"&&u.origin===location.origin){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put("./index.html",cp));return res;}).catch(()=>caches.match("./index.html").then(m=>m||caches.match("./"))));return;}
  /* icons and manifest from this site, Firebase SDK files and fonts: cache first */
  const own=u.origin===location.origin&&/\.(png|webmanifest|js)$/.test(u.pathname)&&!u.pathname.endsWith("/sw.js");
  if(own||STATIC_HOSTS.includes(u.hostname)){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;})));}
  /* everything else (Firestore, Google sign-in) goes straight to the network */
});
