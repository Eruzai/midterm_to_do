const express = require('express');
const router  = express.Router();
const addItem = require('../db/queries/addItems');
const usersItemsByList = require('../db/queries/category_list');

const item = 'How to Train Your Dragon';
const user = 1;
const category = 1;

router.get('/', (req, res) => {
  addItem.addItem(item, user, category)
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  const { title } = req.body;

  return db.query('INSERT INTO items (title) VALUES ($1)', [title])
  .then(res => {
    console.log(res)
    return res.rows[0]
  })
  .catch(err => {
    console.log(err.message)
  })
})

module.exports = router;
