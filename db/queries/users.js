const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users ORDER BY id;')
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getUsers };
