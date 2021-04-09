const request = require('request-promise-native');

const fetchMyIP = function() {
  // use request to fetch IP address from JSON API
  return request(`https://api64.ipify.org?format=json`);
};

const fetchCoordsByIP = function(body) {
  // use request to fetch coordinates by ip address
  return request(`https://freegeoip.app/json/${JSON.parse(body).ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  // use request to fetch ISS time and duration
  return request(`http://api.open-notify.org/iss-pass.json?lat=${JSON.parse(body).latitude}&lon=${JSON.parse(body).longitude}&alt=20&n=5`);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
