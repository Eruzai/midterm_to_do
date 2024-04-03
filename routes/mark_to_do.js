const express = require('express');
const router  = express.Router();
const itemNotCompleted = require('../db/queries/mark_to_do');

router.post('/', (req, res) => {
  const itemID = req.body.id;

  itemNotCompleted.markToDo(itemID)
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
