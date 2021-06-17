// API Key
const API_KEY =
  'pk.eyJ1IjoidGtvd2FsZXdza2kiLCJhIjoiY2twcGwxaTlpMDMxZzJwbzFsdzNwb3QydyJ9.lZFcaEceMkO-fRI-GrMxCQ';

// Will return promise resolved with coordinates
export const getCoordsFromAddress = (address) => {
  const urlAddress = encodeURI(address); // convert str into url-friendly one

  return fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${urlAddress}.json?types=address&access_token=${API_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          'Failed to fetch coordinates. Server-side error. Please try again'
        );
      }

      return response.json().then((geoData) => {
        return geoData.features[0].geometry.coordinates;
      });
    })
    .catch((error) => {
      console.log('Sending request failed', error);
      throw new Error('Sending HTTP request failed');
    });
};

// Will return promise resolved with address
export const getAddressFromCoords = (coords) => {
  return fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.lng},${coords.lat}.json?types=address&access_token=${API_KEY}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          'Failed to fetch address. Server-side error. Please try again'
        );
      }

      return response.json().then((geoData) => {
        return geoData.features[0].place_name;
      });
    })
    .catch((error) => {
      console.log('Sending request failed', error);
      throw new Error('Sending HTTP request failed');
    });
};
