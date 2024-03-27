const db = require('../connection');

const addItem = (userID, categoryID) => {
  return db
    .query(`INSERT INTO items (title, user_id, category_id) VALUES ($1, $2, $3) RETURNING *;`, [item, userID, categoryID])
    .then((result) => {
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { addItem };
