const request = require('request-promise-native');
const convert = require('./convert_spaces');

// Looks up string to see if it exactly matches the returned restaurant title
const findIfRestaurantExists = (string) => {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer Ylv_u1fLkFegCR7Z-ATQ0fMh0H0DUsT49JH3fYG5993Hfc1kRIDTgv9S0g96bQoUOHIhqvt7SoBhhhVjGRu695QZtZBlcHKiwdm7CTNlu_AndQRowEhck3yFLBgHZnYx'
    }
  };

  // const restaurant = convert(string)
  return request(`https://api.yelp.com/v3/businesses/search?location=Canada&term=${string}&sort_by=best_match&limit=20`, options)
  .then((body) => {
    const data = JSON.parse(body).businesses[0].name;
    if(data == string) {
      return true;
    } else {
      return false;
    }
  })
};

module.exports = { findIfRestaurantExists };
