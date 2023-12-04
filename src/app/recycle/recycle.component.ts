import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {ConfirmationService} from 'primeng/api';
import {SitioReciclajeLaDeliciaservice} from "../../service/sitioreciclajeLaDeliciaservice";
import {SitioReciclajeTumbacoservice} from "../../service/sitioreciclajeTumbacoservice";
import {SitioReciclajeEloyAlfaroService} from "../../service/sitioreciclajeEloyAlfaroservice";
import {SitioReciclajeManuelitaSaenzservice} from "../../service/sitioreciclajeManuelitaSaenzservice";
import Animation = google.maps.Animation;

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
  geolocationButonLoaded = false;
  selectedCategories: any[] = [];
  zoom = 14;
  myCurrentPosition: any;


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

  buttonPosition: google.maps.ControlPosition.TOP_LEFT;

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

  addMarker(position: any) {
        // this.orderMarker.push({
        //     position: {
        //         lat: this.center.lat,
        //         lng: this.center.lng,
        //     },
        //     /* label: {
        //          color: 'red',
        //          text: 'Marker label ' + (this.orderMarker.length + 1),
        //      },*/
        //     title: 'Marker title ' + (this.orderMarker.length + 1),
        //     info: 'Marker info ' + (this.orderMarker.length + 1),
        //     options: {
        //         animation: google.maps.Animation.BOUNCE,
        //         draggable: true,
        //     },
        // });


      this.orderMarker.push({
        position: {
          lat: position.lat,
          lng: position.lng,
        },
        //position: position,

        /* label: {
             color: 'red',
             text: 'Marker label ' + (this.orderMarker.length + 1),
         },*/
        title: 'Marker title ',
        info: 'Marker info ' ,
        options: {
          animation: google.maps.Animation.BOUNCE,
          draggable: true,
        },
      });

      let newCenter = new google.maps.LatLng({lat: position.lat, lng: position.lng});
      // this.map.center = newCenter;
      this.map.googleMap.setCenter(newCenter);
  }

  private fillPosition(lat: number, lng: number){
    return {
      lat: lat,
      lng: lng,
    };
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

                this.myCurrentPosition = this.fillPosition(position.coords.latitude, position.coords.longitude);

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
    })
    document.head.appendChild(mapsScript);

  }

  createCenterControl(map) {
    const controlButton = document.createElement('button');

    // Set CSS for the control.
    controlButton.style.backgroundColor = '#fff';
    controlButton.style.border = '2px solid #fff';
    controlButton.style.borderRadius = '3px';
    controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlButton.style.color = 'rgb(25,25,25)';
    controlButton.style.cursor = 'pointer';
    controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlButton.style.fontSize = '16px';
    controlButton.style.lineHeight = '38px';
    controlButton.style.margin = '8px 0 22px';
    controlButton.style.padding = '0 5px';
    controlButton.style.textAlign = 'center';

    controlButton.textContent = 'GL     ';
    controlButton.title = 'Click to recenter the map';
    controlButton.type = 'button';

    return controlButton;
  }


  addSearchBoxOnMap(){

    const markerPosition = new google.maps.Marker({
      anchorPoint: new google.maps.Point(0, -29),
      map: this.map.googleMap,
      draggable: true,
      animation: google.maps.Animation.BOUNCE,
      label: {
        color: 'yellow',
        text: ' '
      },
      // icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    });

    if(this.myCurrentPosition != undefined){
      this.map.googleMap.setCenter(this.myCurrentPosition);
      markerPosition.setPosition(this.fillPosition(this.myCurrentPosition.lat, this.myCurrentPosition.lng));
      markerPosition.setVisible(true);
    }


    const options = {
      componentRestrictions: { country: 'EC' },
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };

    const searchBox = document.getElementById("searchBox") as HTMLElement;
    var address = document.getElementById('address') as HTMLInputElement;
    //const geolocationButon = document.getElementById("geolocationButon") as HTMLElement;

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBox);
    // this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(geolocationButon);
    const autocomplete = new google.maps.places.Autocomplete(address, options);
    this.searchBoxLoaded = true;
    // this.geolocationButonLoaded = true;



    // Create the DIV to hold the control.
    const centerControlDiv = document.createElement('div');
    // Create the control.
    const centerControl = this.createCenterControl(this.map.googleMap);
    // Append the control to the DIV.
    centerControlDiv.appendChild(centerControl);
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);


    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      // console.info("place_changed: ", place);

      markerPosition.setVisible(false);

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
        // this.map.fitBounds(place.geometry.viewport);
        this.map.googleMap.fitBounds(place.geometry.viewport);

        console.info("place.geometry.viewport: ", place.geometry.viewport);
        console.info("place.geometry.location.lat(): ", place.geometry.location.lat());
        console.info("place.geometry.location.lng(): ", place.geometry.location.lng());

      } else {
        console.info("NOT place.geometry.viewport");
        this.map.center = place.geometry.location;
        this.map.zoom = 17;
      }

      var position = this.fillPosition(place.geometry.location.lat(), place.geometry.location.lng());
      console.info("position of searchBox", position);
      //this.addMarker(position);

      markerPosition.setPosition(place.geometry.location);
      markerPosition.setVisible(true);
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
