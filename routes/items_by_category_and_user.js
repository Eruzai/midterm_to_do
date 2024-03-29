const express = require('express');
const router  = express.Router();
const usersItemsByList = require('../db/queries/category_list');

// TODO: used logged in user id and change category from button selection on page.

router.get('/', (req, res) => {

  const user = req.session.userId
  const category = req.query.categoryId

  usersItemsByList.getCategoryList(user, category)
    .then(data => {
      const titles = data.map(item => item.title)
      res.json( {titles} );
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

module.exports = router;
