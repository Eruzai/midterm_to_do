const db = require('../connection');

const updateItemCategory = (categoryID, title) => {
  return db
    .query(`UPDATE items SET category_id = $1 WHERE title = $2 RETURNING *;`, [categoryID, title])
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

module.exports = { updateItemCategory };
