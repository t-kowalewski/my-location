export const getCoordsFromAddress = (address) => {
  const urlAddress = encodeURI(address); // convert str into url-friendly one

  return fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${urlAddress}.json?access_token=pk.eyJ1IjoidGtvd2FsZXdza2kiLCJhIjoiY2twcGwxaTlpMDMxZzJwbzFsdzNwb3QydyJ9.lZFcaEceMkO-fRI-GrMxCQ`
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
