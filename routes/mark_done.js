const express = require('express');
const router  = express.Router();
const itemCompleted = require('../db/queries/mark_done');

router.post('/', (req, res) => {
  const itemID = req.body.id;

  itemCompleted.markAsDone(itemID)
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
