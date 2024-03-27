const db = require('../connection');

const getCategoryList = (userID, categoryID) => {
  return db
    .query(`SELECT * FROM items WHERE user_id = $1 AND category_id = $2`, [userID, categoryID])
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

module.exports = { getCategoryList };
