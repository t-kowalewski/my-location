// Manage buttons for location / finding address
class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.querySelector('#locate-btn');

    addressForm.addEventListener('submit', this.findAddressHandler);
    locateUserBtn.addEventListener('click', this.locateUserHandler);
  }

  findAddressHandler() {}

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        'Your browser is outdated. Please update it or manually type your address'
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (successResp) => {
        const coordinates = {
          lat: successResp.coords.latitude,
          lng: successResp.coords.longitude,
        };

        console.log(
          '🚀 ~ PlaceFinder ~ locateUserHandler ~ coordinates',
          coordinates
        );
      },
      (errorResp) => {
        alert('Autolocation failed. Please enter address manually');
      }
    );
  }
}

new PlaceFinder();
