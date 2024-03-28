const request = require('request-promise-native');
const convert = require('./convert_spaces');

// Looks up string to see if it exactly matches the returned restaurant title
const findIfRestaurantExists = (string) => {
  const restaurant = convert(string)
  return request(``)
  .then((body) => {
    const data = JSON.parse(body).Title;
    if(data === string) {
      return true;
    } else {
      return false;
    }
  })
};

module.exports = { findIfRestaurantExists };
