const express = require('express');
const bodyParser = require('body-parser');
const articles = require('./blog');

const app = express();
app.use(bodyParser.json());

app.get('/api/articles/:id', (req, res) => {
  const article = articles.find(
    (article) => article.id === parseInt(req.params.id)
  );
  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ message: 'Article does not exist!' });
  }
});

app.get('/api/articles', (req, res) => {
  res.json(articles);
});

app.get('/', (req, res) => {
  console.log(articles);
  res.send('Cookbook API');
});

app.all('*', (req, res) => {
  res.redirect('/');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port: ${port}`));
