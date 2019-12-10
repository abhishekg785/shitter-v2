const tweetForm = document.getElementById('new-tweet');
const tweetInput = document.getElementById('newTweetContent');
const tweets = document.getElementById('tweets');

tweetForm.addEventListener('submit', event => {
  event.preventDefault();

  const content = tweetInput.value;
  const tweet = { id: Date.now(), content, unsynced: true, deleted: false };

  fetch('/tweets', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(tweet)
  })
  .then(() => {
    clearForm();
    apppendTweetToPage(createTweetElement(tweet));
  })
  .catch(error => console.error(error));
});

const createTweetElement = (tweet) => {
  const element = document.createElement('article');
  const title = document.createElement('p');

  element.classList.add('tweet');
  element.dataset.id = tweet.id;

  title.innerText = tweet.content;

  element.appendChild(title);

  return element;
};

const createTweetElements = dreams => dreams.map(createTweetElement);

const apppendTweetToPage = (tweet) => {
    tweets.append(tweet);
};

const appendTweet = tweets => tweets.forEach(apppendTweetToPage);

const fetchTweets = () => {
  fetch('/tweets.json')
    .then(response => response.json())
    .then(createTweetElements)
    .then(appendTweet);
}

const clearForm = () => {
  tweetInput.value = '';
  tweetInput.focus();
};

fetchTweets();
