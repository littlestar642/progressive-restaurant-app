let staticCache='restaurant-cache-v1';

self.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(staticCache).then(cache=>{
            return cache.addAll([
                '/img/1.jpg','/img/2.jpg','/img/3.jpg','/img/4.jpg','/img/5.jpg','/img/6.jpg','/img/7.jpg','/img/8.jpg','/img/9.jpg','/img/10.jpg',
                '/data/restaurants.json',
                '/css/styles.css',
                '/js/main.js',
                '/js/dbhelper.js',
                '/js/restaurant_info.js',
                '/index.html',
                '/restaurant.html'
            ])
        })
    )
});

self.addEventListener('activate',()=>{
    caches.keys().then(cacheArr=>{
        return Promise.all(cacheArr.map((cache)=>{
            if(cache!=staticCache && cache.startsWith('restaurant'))cache.delete();
        }))
    })
})

self.addEventListener('fetch',(event)=>{
    event.respondWith(
        caches.match(event.request).then((response)=>{
            if(response)return response;
            return fetch(event.request);
        })
    )
})