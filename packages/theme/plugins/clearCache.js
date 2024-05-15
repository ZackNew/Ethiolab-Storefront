if (process.client) {
    if ('caches' in window) {
        setTimeout(function() {
            caches.keys().then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        return caches.open(cacheName).then(function(cache) {
                            return cache.keys().then(function(requests) {
                                return Promise.all(
                                    requests.map(function(request) {
                                        if (request.url.includes('/_nuxt/')) {
                                            return cache.delete(request);
                                        }
                                    })
                                );
                            });
                        });
                    })
                );
            }).then(function() {
            });
        }, 60 * 1000); 
    }
}
