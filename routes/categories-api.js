// get routes for the tables

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/movies', (req, res) => {
  const query = `SELECT * FROM categories WHERE name = 'To watch'`;
  db.query(query)
    .then(data => {
      const categories = data.rows;
      res.json({ categories });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/books', (req, res) => {
  const query = `SELECT * FROM categories WHERE name = 'To read'`;
  db.query(query)
    .then(data => {
      const categories = data.rows;
      res.json({ categories });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/foods', (req, res) => {
  const query = `SELECT * FROM categories WHERE name = 'To eat'`;
  db.query(query)
    .then(data => {
      const categories = data.rows;
      res.json({ categories });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/products', (req, res) => {
  const query = `SELECT * FROM categories WHERE name = 'To buy'`;
  db.query(query)
    .then(data => {
      const categories = data.rows;
      res.json({ categories });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
