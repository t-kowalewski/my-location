import { Modal } from './UI/Modal';

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

    const modal = new Modal(
      '#loading-modal-content',
      'Loading location - please wait'
    );
    modal.show();

    navigator.geolocation.getCurrentPosition(
      (successResp) => {
        modal.hide();
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
        modal.hide();
        alert('Autolocation failed. Please enter address manually');
      }
    );
  }
}

new PlaceFinder();
