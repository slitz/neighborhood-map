// API docs: http://api.spitcast.com/api/docs/
const api = "http://api.spitcast.com"

const headers = {
  'Accept': 'application/json'
}

export const get = (spotId) =>
  fetch(`${api}/api/spot/forecast/${spotId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getAll = (county) =>
  fetch(`${api}/api/county/spots/${county}`, { headers })
    .then(res => res.json())
    .catch(function(error) {
      console.log('Looks like there was a problem: \n', error);
    });

export const getAllSpots = () =>
  fetch(`${api}/api/spot/all`, { headers })
    .then(res => res.json())
    .catch(function(error) {
      console.log('Looks like there was a problem: \n', error);
    });
