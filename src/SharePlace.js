import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

// Manage buttons for location / finding address
class PlaceFinder {
  constructor() {
    this.shareBtn = document.querySelector('#share-btn');
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.querySelector('#locate-btn');

    this.shareBtn.addEventListener('click', this.sharePlaceHandler);
    addressForm.addEventListener('submit', this.findAddressHandler.bind(this));
    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
  }

  // Select & Copy to Clipboard Share Link
  sharePlaceHandler() {
    const sharedLinkInputElement = document.querySelector('#share-link');

    sharedLinkInputElement.focus();
    if (!navigator.clipboard) {
      sharedLinkInputElement.select(); //selects input
      return;
    }

    navigator.clipboard
      .writeText(sharedLinkInputElement.value)
      .then(() => {
        alert('Copied to clipboard');
      })
      .catch((error) => {
        console.log(error);
        sharedLinkInputElement.select();
      });
  }

  // Render Map & Create Sharable link
  selectPlace(coordinates, address) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }

    // Call to backend API
    fetch('http://localhost:3000/add-place', {
      method: 'POST',
      body: JSON.stringify({
        address: address,
        lat: coordinates.lat,
        lng: coordinates.lng,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        const locationId = data.locationId;

        this.shareBtn.disabled = false;

        const sharedLinkInputElement = document.querySelector('#share-link');
        sharedLinkInputElement.value = `${location.origin}/my-place?location=${locationId}`;
      });
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

    getCoordsFromAddress(address)
      .then((data) => {
        modal.hide();
        const coordinates = {
          lat: data[1],
          lng: data[0],
        };

        this.selectPlace(coordinates, address);
      })
      .catch((error) => {
        modal.hide();
        alert(error.message);
      });
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
        const coordinates = {
          lat: successResp.coords.latitude,
          lng: successResp.coords.longitude,
        };

        getAddressFromCoords(coordinates)
          .then((address) => {
            modal.hide();
            this.selectPlace(coordinates, address);
          })
          .catch((error) => {
            modal.hide();
            alert(error.message);
          });
      },
      (errorResp) => {
        modal.hide();
        alert('Autolocation failed. Please enter address manually');
      }
    );
  }
}

new PlaceFinder();
