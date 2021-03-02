const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool();

router.get('/', (req, res) => {
  pool
    .query('SELECT * FROM articles ORDER BY articleid')
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
    text: 'SELECT * FROM articles WHERE articleid=$1',
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

module.exports = router;
