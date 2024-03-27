const express = require('express');
const router  = express.Router();
const loggedInUser = require('../db/queries/get_logged_in_user')

// Log a user in
router.post("/", (req, res) => {
  const userID = 1;

  req.session.userId = userID;
  res.send(loggedInUser(userID));
});

module.exports = router;
