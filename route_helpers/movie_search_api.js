const request = require('request-promise-native');
const convert = require('./convert_spaces');

// Looks up string to see if it exactly matches the returned movie title
const findIfMovieExists = (string) => {
  return request(`https://www.omdbapi.com/?apikey=52640320&t=${string}`)
  .then((body) => {
    const data = JSON.parse(body).Title;
    if(data == string) {
      return true;
    } else {
      return false;
    }
  })
};

module.exports = { findIfMovieExists };
