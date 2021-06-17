import { Map } from './UI/Map';

class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);

    const headerTitleEl = document.querySelector('header h1');
    headerTitleEl.textContent = address;
  }
}

// Get data from URL - query parameters(key-value pairs), values are returned as strings
const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
  lat: +queryParams.get('lat'),
  lng: +queryParams.get('lng'),
};
const address = queryParams.get('address'); //url is auto formatted into regular string

new LoadedPlace(coords, address);
