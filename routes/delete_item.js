const express = require('express');
const router  = express.Router();
const deleteItem = require('../db/queries/delete_item');

router.post('/', (req, res) => {
  const itemID = req.body.id;

  deleteItem.setAsDeleted(itemID)
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
