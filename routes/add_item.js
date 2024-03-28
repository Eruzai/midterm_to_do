const express = require('express');
const router  = express.Router();
const addItem = require('../db/queries/addItems');
const usersItemsByList = require('../db/queries/category_list');

router.post('/', (req, res) => {
  const { title } = req.body;
  const user = 1;
  const category = 1;

  addItem.addItem(title, user, category)
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

// API suggestions
// https://www.googleapis.com/books/v1/volumes?q=<book title>
// https://www.omdbapi.com/?apikey=52640320&t=<movie title>

// const request = require('request');

// const options = {
//   method: 'POST',
//   url: 'https://worldwide-restaurants.p.rapidapi.com/search',
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded',
//     'X-RapidAPI-Key': 'bfd2ae10dcmsh0782860466907c5p113f17jsn4f8868665966',
//     'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
//   },
//   form: {
//     language: 'en_US',
//     location_id: '297704',
//     currency: 'USD',
//     offset: '0'
//   }
// };

// request(options, function (error, response, body) {
// 	if (error) throw new Error(error);

// 	console.log(body);
// });
