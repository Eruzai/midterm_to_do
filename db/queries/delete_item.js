const db = require('../connection');

const setAsDeleted = (itemID) => {
  return db
    .query(`UPDATE items SET is_deleted = true WHERE id = $1 RETURNING *;`, [itemID])
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

module.exports = { setAsDeleted };
