const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// Serve the index.html file and display the form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// POST request
app.post('/submit', (req, res) => {
  let result = `Name: ${req.body.fullname}<br>`
  result = (`${result}Email: ${req.body.email}<br>`)

  result = (
    req.body.message.length === 0
        ? `${result}Comments: n/a<br>`
        : `${result}Comments: ${req.body.message}<br>`
  )

  result =(
    req.body.newsletter === undefined
        ? `${result}Newsletter: No, thank you.<br>`
        : `${result}Newsletter: Yes, I would like to join the newsletter.<br>`
  )

  res
  .status(200)
  .set({ 'Content-Type': 'text/html' })
  .send(result)
});

app.use((req, res, next) => {
  res
  .status(404)
  .sendFile(path.join(__dirname + '/public/error.html'))
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
