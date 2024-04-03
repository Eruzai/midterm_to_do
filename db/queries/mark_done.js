const db = require('../connection');

const markAsDone = (itemID) => {
  return db
    .query(`UPDATE items SET is_completed = true WHERE id = $1 RETURNING *;`, [itemID])
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

module.exports = { markAsDone };
