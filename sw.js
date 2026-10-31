var V="dextcg-v1", SHELL=["./","index.html","manifest.json","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png","icons/favicon-32.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V&&x.indexOf("dextcg-")===0&&x!=="dextcg-sprites"}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
 var r=e.request; if(r.method!=="GET")return;
 var u=new URL(r.url);
 if(u.hostname==="raw.githubusercontent.com"){
  e.respondWith(caches.open("dextcg-sprites").then(function(c){return c.match(u.href).then(function(hit){
   if(hit)return hit;
   return fetch(u.href,{mode:"cors"}).then(function(res){if(res.ok)c.put(u.href,res.clone());return res}).catch(function(){return fetch(r)})})}));
  return}
 if(u.origin===location.origin){
  e.respondWith(fetch(r).then(function(res){if(res.ok){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp)})}return res}).catch(function(){return caches.match(r).then(function(m){return m||caches.match("index.html")})}))}
});
