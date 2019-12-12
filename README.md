## Shitter
Note: Code is bad, just for learning purposes.

Shitty version of something like twitter (Nah!)

Implemented in vanilla JS.

What does it do ?

    User service workers, as basic one.

    Use indexdb to store your tweets.

    Use `idb` lib to work with indexdb.

    Supports background sync using service workers , so if you go offline and post something, do not worry, service worker will take care of it and post it once you are online.

    Use caches api, to store static assets.

How to run:

Install dependencies:
```
    npm install
```

Run server
```
    node server.js
```

will start serving on port 4000, open localhost:4000 in your browser.

Hope it works :p 
