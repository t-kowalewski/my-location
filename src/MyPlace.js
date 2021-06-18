import { Map } from './UI/Map';

class LoadedPlace {
  constructor() {
    // Get data from URL - query parameters(key-value pairs), values are returned as strings
    const url = new URL(location.href);
    const queryParams = url.searchParams;
    const coords = {
      lat: +queryParams.get('lat'),
      lng: +queryParams.get('lng'),
    };
    const address = queryParams.get('address'); //url is auto formatted into regular string

    const headerTitleEl = document.querySelector('header h1');
    headerTitleEl.textContent = address;

    new Map(coords);
  }
}

new LoadedPlace();
