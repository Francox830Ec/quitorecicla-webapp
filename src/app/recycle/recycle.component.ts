import {Component, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';


@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.scss']
})
export class RecycleComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  selectedCategories: any[] = [];

  categories: any[] = [
    { name: 'Papel', key: 'A' },
    { name: 'Carton', key: 'M' },
    { name: 'Plastico', key: 'P' },
    { name: 'Vidrio', key: 'R' },
    { name: 'Chatarra', key: 'M' },
    { name: 'Madera', key: 'P' },
    { name: 'Textiles', key: 'R' }
  ];


  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  mapOptions: google.maps.MapOptions = {
    center: { lat: -0.1443723, lng: -78.4929763 },
    zoom : 14
  }

  infoContent = '';

  center: google.maps.LatLngLiteral = {lat: -0.1443723, lng: -78.4929763};
  // markerPositions: google.maps.LatLngLiteral[] = [];
  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: -0.1462247, lng: -78.4950935},
    { lat: -0.1443723, lng: -78.4904014 },
    { lat: -0.1324773, lng: -78.496568 },
    { lat: -0.1262516, lng: -78.4825385 },
    { lat: -0.1558873, lng: -78.484601 },
  ];


  markers = [
    {
      lat: -0.1462247, lng: -78.4950935, label: 'Conjunto Los Olivos'
    },
    {
      lat: -0.1443723, lng: -78.4904014, label: 'EMGIRS EP'
    },
    {
      lat: -0.1324773, lng: -78.496568, label: 'Conjunto San Pedro Claver,J1 y J2'
    },
    {
      lat: -0.1262516, lng: -78.4825385, label: 'Complejo Habilitaciónal de la Policia Nacional del Ecuador'
    },
    {
      lat: -0.1558873, lng: -78.484601, label: 'Automotores Continental Labrador'
    }
  ];

  zoom = 14;

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  openInfoWindow(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.infoWindow.open(marker);
  }



  options: any;

  overlays: any[] | undefined;

  ngOnInit() {
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };
  }

}
