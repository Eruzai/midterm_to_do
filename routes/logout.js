const express = require('express');
const router  = express.Router();

// Log a user out
router.post("/", (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
