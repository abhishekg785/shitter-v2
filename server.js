process.env.PORT = 4000;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const tweets = [
    { id: 1, content: "wtf is this!", },
    { id: 2, content: "where am i ?" },
    { id: 3, content: "what is he trying to say?" }
  ];

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/src/index.html');
});

app.get("/index.html", function (request, response) {
  response.sendFile(__dirname + '/src/index.html');
});

app.get("/tweets", function (request, response) {
  response.send(tweets);
});

app.get("/tweets.json", function (request, response) {
  response.json(tweets);
});

app.post("/tweets", function (request, response) {
  const { id, content } = request.body;
  tweets.push({ id, content });
  response.sendStatus(200);
});

app.delete("/tweets", function (request, response) {
  dreams = [];
  response.sendStatus(202);
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
