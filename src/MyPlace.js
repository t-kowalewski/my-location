import { Map } from './UI/Map';

class LoadedPlace {
  constructor() {
    // Get data from URL - query parameters(key-value pairs), values are returned as strings
    const url = new URL(location.href);
    const queryParams = url.searchParams;
    // const coords = {
    //   lat: +queryParams.get('lat'),
    //   lng: +queryParams.get('lng'),
    // };
    // const address = queryParams.get('address'); //url is auto formatted into regular string

    const locId = queryParams.get('location');

    fetch('http://localhost:3000/place/' + locId)
      .then((response) => {
        if (response.status === 404 || response.status === 500) {
          throw new Error('Could not find location!');
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);

        const headerTitleEl = document.querySelector('header h1');
        headerTitleEl.textContent = data.address;

        new Map(data.coords);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}

new LoadedPlace();
