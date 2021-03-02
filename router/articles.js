const express = require('express');
const articles = require('../blog');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ code: 200, message: 'OK', data: articles });
});

router.get('/:id', (req, res) => {
  const article = articles.find(
    (article) => article.id === parseInt(req.params.id)
  );
  if (article) {
    res.status(200).json({ code: 200, message: 'OK', data: article });
  } else {
    res.status(404).json({ code: 404, error: 'Article does not exist!' });
  }
});

module.exports = router;
