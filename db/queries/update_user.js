const db = require('../connection');

const updateUserEmail =  (email, userID) => {
  return db
    .query(`UPDATE users SET email = $1 WHERE id = $2 RETURNING *`, [email, userID])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { updateUserEmail };
