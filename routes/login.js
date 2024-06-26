const express = require('express');
const router  = express.Router();
const loggedInUser = require('../db/queries/get_logged_in_user')

router.get('/', (req, res) => {
  const userID = req.body.userId;

  if (userID) {
    res.redirect('/')
  }

  res.render('login')
})

// Log a user in
router.post('/', (req, res) => {
  loggedInUser.getLoggedInUser(req.body.userId)
  .then(data => {
    const user = data[0]
    req.session.userId = user.id
    res.json ( user )
  })
})
module.exports = router;
