const express = require('express');
const router  = express.Router();
const updateList = require('../db/queries/update_item');

router.post('/', (req, res) => {
  const categoryID = req.body.categoryID;
  const itemID = req.body.id;

  updateList.updateItemCategory(categoryID, itemID)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

module.exports = router;
