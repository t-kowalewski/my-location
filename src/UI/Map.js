export class Map {
  constructor(coords) {
    this.render(coords);
  }

  render(coordinates) {
    if (!mapboxgl) {
      alert('Could not load map - please try again later');
      return;
    }

    mapboxgl.accessToken =
      'pk.eyJ1IjoidGtvd2FsZXdza2kiLCJhIjoiY2twcGwxaTlpMDMxZzJwbzFsdzNwb3QydyJ9.lZFcaEceMkO-fRI-GrMxCQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coordinates.lng, coordinates.lat],
      zoom: 13,
    });

    new mapboxgl.Marker()
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(map);
  }
}
