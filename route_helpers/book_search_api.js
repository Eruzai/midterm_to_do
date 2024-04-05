const request = require('request-promise-native');
const convert = require('./convert_spaces');

// Looks up string to see if it exactly matches the returned book title
const findIfBookExists = (string) => {
  return request(`https://www.googleapis.com/books/v1/volumes?q=${string}`)
  .then((body) => {
    const data = JSON.parse(body).items[0].volumeInfo.title;
    if(data == string) {
      return true;
    } else {
      return false;
    }
  })
};

module.exports = { findIfBookExists };
