const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const updateList = require('../db/queries/update_item');

router.post('/', (req, res) => {
  const categoryID = req.body.categoryID;
  const title = req.body.title;

  updateList.updateItemCategory(categoryID, title)
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
