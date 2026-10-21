/* CAT Prep service worker: opens offline, installs as an app, shows reminders.
   Your data is never cached here: Firebase handles its own sync. */
const CACHE="cat-prep-v5";
const SHELL=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"];
const STATIC_HOSTS=["www.gstatic.com","fonts.googleapis.com","fonts.gstatic.com"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url);
  /* the page: network first so updates show up, the saved copy when offline */
  if(r.mode==="navigate"&&u.origin===location.origin){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put("./index.html",cp));return res;}).catch(()=>caches.match("./index.html").then(m=>m||caches.match("./"))));return;}
  /* icons, manifest, Firebase SDK files and fonts: cache first */
  const own=u.origin===location.origin&&/\.(png|webmanifest)$/.test(u.pathname);
  if(own||STATIC_HOSTS.includes(u.hostname)){
    e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp));}return res;})));}
  /* everything else (Firestore, Google sign-in, push) goes straight to the network */
});
/* reminders sent by the GitHub job (through Firebase Cloud Messaging) */
self.addEventListener("push",e=>{
  let d={};try{d=e.data?e.data.json():{};}catch(_){d={data:{title:"CAT Prep",body:e.data?e.data.text():""}};}
  const n=Object.assign({},d.notification||{},d.data||{});
  const title=n.title||"CAT Prep",link=n.link||(d.fcmOptions&&d.fcmOptions.link)||"./";
  e.waitUntil(Promise.all([
    self.registration.showNotification(title,{body:n.body||"",icon:"icon-192.png",badge:"icon-192.png",tag:n.tag||undefined,renotify:!!n.tag,data:{link}}),
    self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>cs.forEach(c=>c.postMessage({type:"nudge",title,body:n.body||""})))]));});
self.addEventListener("notificationclick",e=>{
  e.notification.close();const url=new URL((e.notification.data&&e.notification.data.link)||"./",self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if(c.url.startsWith(self.registration.scope)&&"focus" in c){return c.focus().then(w=>w&&w.navigate?w.navigate(url):w).catch(()=>{});}}
    return self.clients.openWindow(url);}));});
