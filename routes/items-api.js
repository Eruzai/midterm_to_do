const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  const query = `SELECT * FROM items`;
  db.query(query)
    .then(data => {
      const items = data.rows;
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

module.exports = router;
// GET -> /login:id

// GET -> /

// GET -> api/users
// GET -> api/items
// POST -> api/items
// GET -> api/category

// I need to connect backend and database
// then connect front-end to back-end
