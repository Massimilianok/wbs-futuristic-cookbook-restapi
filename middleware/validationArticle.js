const { body, validationResult } = require('express-validator');

const validateArticleParams = [
  body('articleID').notEmpty().isUUID(),
  body('title').notEmpty().trim().escape(),
  body('description').notEmpty().trim().escape(),
  body('category').notEmpty().trim().escape(),
]

const validationArticle = (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({code: 400, error: errors.array() });
    } else {
      return next();
    }
}

module.exports = {validateArticleParams, validationArticle}