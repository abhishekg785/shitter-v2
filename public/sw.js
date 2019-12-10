const cacheVersion = 1;

const shitterCache = `shitter-assets-${cacheVersion}`;

const expectedCaches = [
    shitterCache,
    'shitter-data',
];

self.addEventListener('install', event => {
    self.importScripts('https://unpkg.com/idb@4.0.4/build/iife/index-min.js', 'db.js');
    event.waitUntil(
        caches.open(shitterCache).then(cache => {
            return cache.addAll(
                [
                    '/',
                    'main.js',
                    'db.js',
                ]
            );
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(cacheNames.map(cacheName => {
                if (!/shitter-/.test(cacheName)) return

                if (expectedCaches.indexOf(cacheName) == -1) {
                    return caches.delete(cacheName)
                }
            }))
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).then(response => {
            return caches.open('shitter-data').then(cache => {
                cache.put(event.request, response.clone());

                return response;
            })
        }).catch(() => {
            return caches.match(event.request);
        })
    );
});

self.addEventListener('sync', (event) => {
    console.log('syncing tweet', event.tag);

    event.waitUntil(
        getAllTweets().then(tweets => {
            const unsyncedTweets = tweets.filter(tweet => tweet.unsynced);

            console.log('toSync', unsyncedTweets);
            return Promise.all(
                unsyncedTweets.map(tweet => {
                    fetch('/tweets', {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(tweet),
                    }).then(() => {
                        console.log('sent to server', tweet);
                        return putTweet({ ...tweet, unsynced: false }, tweet.id)
                    })
                })
            )
        })
    )
});
