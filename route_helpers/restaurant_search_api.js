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

  return request(`https://api.yelp.com/v3/businesses/search?location=Canada&term=${string}&sort_by=best_match&limit=1`, options)
  .then((body) => {
    const dataArray = JSON.parse(body).businesses
    let data = null;

    if (dataArray.length > 0) {
      data = dataArray[0].name;
    }
    
    if(data == string) {
      return true;
    } else {
      return false;
    }
  })
};

module.exports = { findIfRestaurantExists };
