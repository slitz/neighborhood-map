// API docs: http://api.spitcast.com/api/docs/
const api = "http://api.spitcast.com"

const headers = {
  'Accept': 'application/json'
}

// Fetches details about one beach
export const get = (spotId) =>
  fetch(`${api}/api/spot/forecast/${spotId}/`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch(function(error) {
      console.log('Looks like there was a problem: \n', error);
    });

// Fetches all beaches
export const getAllSpots = () =>
  fetch(`${api}/api/spot/all`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch(function(error) {
      console.log('Looks like there was a problem: \n', error);
    });
