const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5001;

// Use the express-session module
app.use(session({
  store: new session.MemoryStore(),
  secret: 'something very secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000,
  },
}));

app.get('/*', (req, res) => {
  const homeUrl = new URL(req.url, `http://${req.headers.host}`)
  let result = ''

  result = `${result}Currently on route: ${req.url}\n\n`

  if (req.session.example === undefined) {
    result = `${result}Welcome to ${homeUrl}`

    req.session.example = [];
    req.session.example.push(req.url)
  } else {
    result = `${result}Previously visited:\n`
    result = `${result}${req.session.example.join('\n')}`
    
    req.session.example.push(req.url)
  }

  res.status(200)
  res.set({ 'Content-Type': 'text/plain' })
  res.send(result)
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
