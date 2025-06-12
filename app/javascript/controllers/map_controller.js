import { Controller } from "@hotwired/stimulus"
import "leaflet"
import "leaflet-css"

// Connects to data-controller="map"
export default class extends Controller {
  static values = {latitude: Number, longitude: Number };

  connect(){
    var map = L.map('map').setView([this.latitudeValue,  this.longitudeValue], 17);
    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  }

  disconnect(){
    this.map.remove()
  }
}