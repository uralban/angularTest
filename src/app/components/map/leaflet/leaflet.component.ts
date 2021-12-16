import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {Driver} from "../../../services/data.service";
import * as L from "leaflet";
import {icon, Marker} from "leaflet";

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss']
})
export class LeafletComponent implements OnInit, DoCheck {

  @Input('driver') driver: Driver;
  currentDriver: Driver;

  private map;
  private marker;

  constructor() {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    Marker.prototype.options.icon = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
  }

  ngOnInit() {

  }

  ngDoCheck(): void {
      if (this.currentDriver !== this.driver) {
        this.currentDriver = this.driver

        if (!this.map) this.initMap();

        this.map.panTo([this.driver.latitude, this.driver.longitude]);
        if (this.marker && this.map.hasLayer(this.marker)) this.map.removeLayer(this.marker);
        this.marker = L.marker([this.driver.latitude, this.driver.longitude]).bindPopup(this.driver.name);
        this.marker.addTo(this.map).openPopup();
      }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [
        0,
        0
      ],
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

}
