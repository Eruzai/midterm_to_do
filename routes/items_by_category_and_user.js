const express = require('express');
const router  = express.Router();
const usersItemsByList = require('../db/queries/category_list');

// TODO: used logged in user id and change category from button selection on page.
const user = 1;
const category = 1;

router.get('/', (req, res) => {
  usersItemsByList.getCategoryList(user, category)
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

module.exports = router;
