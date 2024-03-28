const request = require('request-promise-native');
const convertSpaces = require('./convert_spaces');

const findIfBookExists = (string) => {
  const book = convertSpaces(string)
  return request(`https://www.googleapis.com/books/v1/volumes?q=${book}`);
};

module.exports = { findIfBookExists };
