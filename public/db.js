async function getDB() {
    return await idb.openDB('shitter', 1, {
        upgrade(db) {
            db.createObjectStore('tweets')
        }
    })
}

async function putTweet(tweet, key) {
    try {
        const db = await getDB();

        await db.put('tweets', tweet, key);
    } catch(err) {
        console.log('Error', err);
    }
};

async function getAllTweets() {
    const db = await getDB();

    const keys = await db.getAllKeys('tweets');

    const tweets = await Promise.all(keys.map(key => {
        return db.get('tweets', key);
    }))

    console.log(tweets);
    return tweets;
}

async function getTweet(id) {
    const db = await getDB();

    const tweet = await db.get('tweets', id);

    console.log(tweet);
    return tweet;
}
