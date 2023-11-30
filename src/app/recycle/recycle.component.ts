import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.scss']
})
export class RecycleComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

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

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
    console.info("map", this.map);
  }

  showDialog() {
    this.visible = true;
  }

  mapOptions: google.maps.MapOptions = {
    center: { lat: -0.1443723, lng: -78.4929763 },
    zoom : 14,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true
  }

  infoContent = '';

  center: google.maps.LatLngLiteral = {lat: -0.1443723, lng: -78.4929763};
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


  map22: google.maps.Map;
  async initMap(): Promise<void> {
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    this.map22 = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }

  mapLoading = false;
  mapLoaded = false;

  loadMap() {
    if (this.mapLoaded || this.mapLoading) {
      return;
    }

    // One way of doing this: dynamically load a script tag.
    this.mapLoading = true;
    const mapsScript = document.createElement('script')
    mapsScript.setAttribute('async', '');
    mapsScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA1BZLKzN8I1ApAr4BDliNHFf9vpBZMxas&libraries=places";
    mapsScript.addEventListener('load', () => {
      this.mapLoaded = true;
      this.mapLoading = false;
    })
    document.head.appendChild(mapsScript);
  }

  ngOnInit() {
    // navigator.geolocation.getCurrentPosition((position) => {
    // });

    this.loadMap();
  }


  handleOnTilesLoaded(){
    console.log("Tiles have loaded.");
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };

    const searchBox = document.getElementById("searchBox") as HTMLElement;
    var address = document.getElementById('address') as HTMLInputElement;

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(searchBox);
    const autocomplete = new google.maps.places.Autocomplete(address, options);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      console.info("place_changed: ", place);

      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        console.info("place.geometry.viewport");
        this.map.fitBounds(place.geometry.viewport);
      } else {
        console.info("NOT place.geometry.viewport");
        this.map.center = place.geometry.location;
        // this.map.zoom = 17;
      }
    });
  }

}
