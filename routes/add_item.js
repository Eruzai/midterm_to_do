const express = require('express');
const router = express.Router();
const addItem = require('../db/queries/addItems');
const isBook = require('../route_helpers/book_search_api');
const isMovie = require('../route_helpers/movie_search_api');
const isRestaurant = require('../route_helpers/restaurant_search_api');
const convert = require('../route_helpers/convert_spaces');

router.post('/', (req, res) => {
  const title = req.body.title;
  convert(title);
  let user = req.session.userId;
  let category = 4;

  if (!user) {
    return res.json({ status: false });
  }

  isBook.findIfBookExists(title)
    .then(data => {
      if (data) {
        category = 2;
        return Promise.resolve(); // Return a resolved promise to continue the chain
      } else {
        return isMovie.findIfMovieExists(title);
      }
    })
    .then(data => {
      if (data) {
        category = 1;
        return Promise.resolve();
      } else {
        return isRestaurant.findIfRestaurantExists(title);
      }
    })
    .then(data => {
      if (data) {
        category = 3;
      }
      return addItem.addItem(title, user, category);
    })
    .then(data => {
      res.json({ data });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
