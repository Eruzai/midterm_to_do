const express = require('express');
const router  = express.Router();
const addItem = require('../db/queries/addItems');
const usersItemsByList = require('../db/queries/category_list');

router.post('/', (req, res) => {
  const { title } = req.body;
  const user = 1;
  const category = 1;

  addItem.addItem(title, user, category)
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;

// API suggestions
// https://www.googleapis.com/books/v1/volumes?q=<book title>
// https://www.omdbapi.com/?apikey=52640320&t=<movie title>
