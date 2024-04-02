const express = require('express');
const router  = express.Router();
const usersItemsByList = require('../db/queries/category_list');

router.get('/', (req, res) => {

  const user = req.session.userId
  const category = req.query.categoryId

  if (!user) {
   console.log("yo! u need to log in !!!")
  }
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
