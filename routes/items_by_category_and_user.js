const express = require('express');
const router  = express.Router();
const usersItemsByList = require('../db/queries/category_list');

router.get('/', (req, res) => {

  const user = req.session.userId
  const category = req.query.categoryId

  if (!user) {
   return res.status(403).json({ "status": false })
  }
  usersItemsByList.getCategoryList(user, category)
    .then(data => {
      const titles = data.map(item => item.title);
      const ids = data.map(item => item.id);
      const completed = data.map(item => item.is_completed);
      res.json( {titles, ids, completed} );
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

module.exports = router;
