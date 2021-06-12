import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress } from './Utility/Location';

// Manage buttons for location / finding address
class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.querySelector('#locate-btn');

    addressForm.addEventListener('submit', this.findAddressHandler);
    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
  }

  // Find Place
  findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value;
    if (!address || address.trim() === 0) {
      alert("Address field can't be empty");
      return;
    }

    const modal = new Modal(
      '#loading-modal-content',
      'Loading location - please wait'
    );
    modal.show();

    getCoordsFromAddress(address);
  }

  // Get Current Location
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

        this.selectPlace(coordinates);

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
