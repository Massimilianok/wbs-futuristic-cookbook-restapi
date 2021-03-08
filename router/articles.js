const express = require('express');
const articleMiddleware = require('../middleware/validationArticle');
const articleController = require('../controller/articleController');

const router = express.Router();

router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getOneArticle);
router.post(
  '/create',
  [
    articleMiddleware.validateArticleParams,
    articleMiddleware.validationArticle,
  ],
  articleController.createOneArticle
);

module.exports = router;
