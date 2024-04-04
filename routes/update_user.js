const express = require('express');
const router  = express.Router();
const updateUser = require('../db/queries/update_user');

router.post('/', (req, res) => {
  const userID = req.session.userId;
  const email = req.body.email;

  updateUser.updateUserEmail(email, userID)
    .then(data => {
      const user = data[0]
      res.status(200).json({ user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
})

module.exports = router;
