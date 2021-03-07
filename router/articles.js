const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool();

router.get('/', (req, res) => {
  pool
    .query('SELECT * FROM blogarticles ORDER BY articleid')
    .then((data) =>
      res.status(200).json({ code: 200, message: 'OK', data: data.rows })
    )
    .catch((err) =>
      res.status(500).json({ code: 500, error: 'Internal server errors!' })
    );
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const getOneArticle = {
    text: 'SELECT * FROM blogarticles WHERE articleid=$1',
    values: [id],
  };

  pool
    .query(getOneArticle)
    .then((data) => {
      if (data.rows.length !== 0) {
        res.status(200).json({ code: 200, message: 'OK', data: data.rows });
      } else {
        res.status(404).json({ code: 404, error: 'Article does not exist!' });
      }
    })
    .catch((err) =>
      res.status(500).json({ code: 500, error: 'Internal server errors!' })
    );
});

router.post('/create', (req, res) => {
  const { articleID, title, description, category } = req.body;
  const createOneArticle = {
    text:
      'INSERT INTO blogarticles (articleID, title, description, category) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [articleID, title, description, category],
  };

  pool
    .query(createOneArticle)
    .then((data) =>
      res
        .status(201)
        .json({ code: 201, message: 'Article created', data: data.rows })
    )
    .catch((err) =>
      res.status(500).json({ code: 500, error: 'Internal server errors!' })
    );
});

module.exports = router;
