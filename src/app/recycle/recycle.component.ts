import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {ConfirmationService} from 'primeng/api';
import {SitioReciclajeLaDeliciaservice} from "../../service/sitioreciclajeLaDeliciaservice";
import {SitioReciclajeTumbacoservice} from "../../service/sitioreciclajeTumbacoservice";
import {SitioReciclajeEloyAlfaroService} from "../../service/sitioreciclajeEloyAlfaroservice";
import {SitioReciclajeManuelitaSaenzservice} from "../../service/sitioreciclajeManuelitaSaenzservice";

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.scss']
})
export class RecycleComponent implements OnInit{
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  // @ViewChild(MapMarker, { static: false }) mapMarker: MapMarker;

  heighInitial = "200px";
  mapLoading = false;
  mapLoaded = false;
  searchBoxLoaded = false;
  selectedCategories: any[] = [];
  zoom = 14;

  orderMarker = [];


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
  siteNoAvailable: string = "";



  mapOptions: google.maps.MapOptions = {
    center: { lat: -0.1443723, lng: -78.4929763 },
    zoom : 14,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
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

  laDeliciaMarkers = [];
  eloyAlfatoMarkers = [];
  tumbacoMarkers = [];
  manuelitaSaenzMarkers = [];

  constructor(private confirmationService: ConfirmationService,
              private sitioReciclajeLaDeliciaservice: SitioReciclajeLaDeliciaservice,
              private sitioReciclajeEloyAlfaroService: SitioReciclajeEloyAlfaroService,
              private sitioReciclajeManuelitaSaenzservice: SitioReciclajeManuelitaSaenzservice,
              private sitioReciclajeTumbacoservice: SitioReciclajeTumbacoservice,
              ) {
  }

  ngOnInit() {
    this.getCurrentPosition();
    this.loadMap();
    this.listSitioReciclajeLaDeliciaService();
    this.listSitioReciclajeManuelitaSaenzService();
    this.listSitioReciclajeEloyAlfaroService();
    this.listSitioReciclajeTumbacoService();
  }

  addMarker() {
        this.orderMarker.push({
            position: {
                lat: this.center.lat,
                lng: this.center.lng,
            },
            // label: {
            //     color: 'red',
            //     text: 'Marker label ' + (this.orderMarker.length + 1),
            // },
            title: 'Marker title ' + (this.orderMarker.length + 1),
            info: 'Marker info ' + (this.orderMarker.length + 1),
            options: {
                animation: google.maps.Animation.BOUNCE,
                draggable: true,
            },
        });
  }

  getCurrentPosition(){
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position: GeolocationPosition) => {
                  const pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                  };

              },
              () => {
                  //handleLocationError(true, infoWindow, map.getCenter()!);
              }
          );
      } else {
          // Browser doesn't support Geolocation
          //handleLocationError(false, infoWindow, map.getCenter()!);
      }
  }

    handleLocationError(
        browserHasGeolocation: boolean,
        infoWindow: google.maps.InfoWindow,
        pos: google.maps.LatLng
    ) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(
            browserHasGeolocation
                ? "Error: The Geolocation service failed."
                : "Error: Your browser doesn't support geolocation."
        );
        // infoWindow.open(this.map);
    }

  listSitioReciclajeLaDeliciaService(){
      this.sitioReciclajeLaDeliciaservice.getSitios().then((items) => {
        items.forEach(item => {
          this.laDeliciaMarkers.push(
            {label: item.name,
             lat: parseFloat(item.Point.coordinates.toString().split(',')[1].toString()),
             lng: parseFloat(item.Point.coordinates.toString().split(',')[0].toString())
            });
        });
          // console.info("this.laDeliciaMarkers: ", this.laDeliciaMarkers);
      });
  }

    listSitioReciclajeEloyAlfaroService(){
        this.sitioReciclajeEloyAlfaroService.getSitios().then((items) => {
            items.forEach(item => {
                this.eloyAlfatoMarkers.push(
                    {label: item.name,
                        lat: parseFloat(item.Point.coordinates.toString().split(',')[1].toString()),
                        lng: parseFloat(item.Point.coordinates.toString().split(',')[0].toString())
                    });
            });

            // console.info("this.eloyAlfatoMarkers: ", this.eloyAlfatoMarkers);

        });
    }

    listSitioReciclajeManuelitaSaenzService(){
        this.sitioReciclajeManuelitaSaenzservice.getSitios().then((items) => {
            items.forEach(item => {
                this.manuelitaSaenzMarkers.push(
                    {label: item.name,
                        lat: parseFloat(item.Point.coordinates.toString().split(',')[1].toString()),
                        lng: parseFloat(item.Point.coordinates.toString().split(',')[0].toString())
                    });
            });
            // console.info("this.manuelitaSaenzMarkers: ", this.manuelitaSaenzMarkers);

        });
    }

    listSitioReciclajeTumbacoService(){
        this.sitioReciclajeTumbacoservice.getSitios().then((items) => {
            items.forEach(item => {
                this.tumbacoMarkers.push(
                    {label: item.name,
                        lat: parseFloat(item.Point.coordinates.toString().split(',')[1].toString()),
                        lng: parseFloat(item.Point.coordinates.toString().split(',')[0].toString())
                    });
            });

            // console.info("this.tumbacoMarkers: ", this.tumbacoMarkers);

        });
    }

  // addMarker(event: google.maps.MapMouseEvent) {
  //   this.markerPositions.push(event.latLng.toJSON());
  // }

    logCenter() {
        console.log(JSON.stringify(this.map.getCenter()))
        console.info("map", this.map);
    }

    showDialog() {
        this.visible = true;
    }

  openInfoWindow(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.infoWindow.open(marker);
  }

  calculateScreenHeight(){
    var body = document.body, html = document.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    this.heighInitial = (height - 45) + "px";
  }

  loadMap() {
    if (this.mapLoaded || this.mapLoading) {
      return;
    }

    // One way of doing this: dynamically load a script tag.
    this.mapLoading = true;
    const mapsScript = document.createElement('script')
    mapsScript.async = true;
    mapsScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA1BZLKzN8I1ApAr4BDliNHFf9vpBZMxas&libraries=places";
    mapsScript.addEventListener('load', () => {
      this.calculateScreenHeight();
      this.mapLoaded = true;
      this.mapLoading = false;
      this.addMarker();
    })
    document.head.appendChild(mapsScript);

  }
  addSearcBoxOnMap(){
    const options = {
      componentRestrictions: { country: 'EC' },
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };

    const searchBox = document.getElementById("searchBox") as HTMLElement;
    var address = document.getElementById('address') as HTMLInputElement;

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBox);
    const autocomplete = new google.maps.places.Autocomplete(address, options);
    this.searchBoxLoaded = true;

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      // console.info("place_changed: ", place);

      if (!place.geometry || !place.geometry.location) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        this.siteNoAvailable = place.name;
        this.visible = true;
        // console.info("buttonShowNoAvailableDetailsDialog...");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        // console.info("place.geometry.viewport");
        this.map.fitBounds(place.geometry.viewport);
      } else {
        // console.info("NOT place.geometry.viewport");
        this.map.center = place.geometry.location;
        this.map.zoom = 17;
      }
    });


    /*Marker gps */
    //this.mapMarker.marker.setD


  }

  showNoAvailableDetailsDialog(message: string) {
    this.confirmationService.confirm({
      message: 'No hay detalles para ' + message,
      header: 'Lugar no disponible',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Aceptar',
      rejectVisible: false,
      acceptIcon: ' '
    });
  }
}
