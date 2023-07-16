const request = require("request");

function forecast(long, lat, callback) {
  const url = `http://api.weatherstack.com/current?access_key=3e713edd4fe689761fd94bb6a968ecc8&query=${lat},${long}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} outside. It feels like ${body.current.feelslike}`
      );
    }
  });
}

module.exports = forecast;
