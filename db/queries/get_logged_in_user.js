const db = require('../connection');

const getLoggedInUser = (userID) => {
  return db.query('SELECT first_name, last_name, email, id FROM users WHERE id = $1;', [userID])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getLoggedInUser };
