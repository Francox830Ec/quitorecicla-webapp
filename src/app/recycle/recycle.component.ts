import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {ConfirmationService} from 'primeng/api';
import {SitioReciclajeLaDeliciaservice} from "../../service/sitioreciclajeLaDeliciaservice";
import {SitioReciclajeTumbacoservice} from "../../service/sitioreciclajeTumbacoservice";
import {SitioReciclajeEloyAlfaroService} from "../../service/sitioreciclajeEloyAlfaroservice";
import {SitioReciclajeManuelitaSaenzservice} from "../../service/sitioreciclajeManuelitaSaenzservice";
// import GeolocationMarker from "geolocation-marker";
import {GeolocationService} from '@ng-web-apis/geolocation';


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
  divSearchPRLoeaded = false;
  selectedCategories: any[] = [];
  zoom = 14;
  myCurrentPosition: any;
  myFirstGeoPosition: any;
  // userLocation: {current: any};
  markerOrder: any;
  markerPosition: any;

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
    center: { lat: -0.1770411, lng: -78.4491145 },
    zoom : 11,
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
              private readonly geolocation$: GeolocationService
              ) {
  }

  ngOnInit() {
    // this.getCurrentLocation();
    this.loadMap();
    this.listSitioReciclajeLaDeliciaService();
    this.listSitioReciclajeManuelitaSaenzService();
    this.listSitioReciclajeEloyAlfaroService();
    this.listSitioReciclajeTumbacoService();
  }

  addSearchPRButton()
  {
    const searchPRDiv = document.getElementById("divSearchPR") as HTMLElement;
    this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(searchPRDiv);
    this.divSearchPRLoeaded = true;

  }

  addYourLocationButton(map, marker)
  {
      var that = this;
      var controlDiv = document.createElement('div');
      var firstChild = document.createElement('button');

      firstChild.style.backgroundColor = '#fff';
      firstChild.style.border = 'none';
      firstChild.style.outline = 'none';
      firstChild.style.width = '40px';
      firstChild.style.height = '40px';
      firstChild.style.borderRadius = '2px';
      firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
      firstChild.style.cursor = 'pointer';
      firstChild.style.marginRight = '10px';
      firstChild.style.padding = '0';
      firstChild.title = 'Tu localización';
      controlDiv.appendChild(firstChild);

      var secondChild = document.createElement('div');
      secondChild.style.margin = '5px';
      secondChild.style.width = '30px';
      secondChild.style.height = '30px';
      secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
      secondChild.style.backgroundSize = '300px 30px';
      secondChild.style.backgroundPosition = '0 0';
      secondChild.style.backgroundRepeat = 'no-repeat';
      firstChild.appendChild(secondChild);

      google.maps.event.addListener(this.map.googleMap, 'center_changed', function () {
          secondChild.style['background-position'] = '0 0';
      });



      firstChild.addEventListener('click', function () {
          var imgX = '0',
              animationInterval = setInterval(function () {
                  imgX = imgX === '-30' ? '0' : '-30';
                  secondChild.style['background-position'] = imgX+'px 0';
              }, 500);

          let currentLocation2 = that.getCurrentLocation2(animationInterval, secondChild);
          console.info("Result of getCurrentLocation2: ", currentLocation2);

          //that.userLocationTrack(animationInterval, secondChild);
      });

      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
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

  setMarkerPosition(){
      this.markerPosition = new google.maps.Marker({
          icon: {
              fillColor: 'blue',
              fillOpacity: 1,
              path: google.maps.SymbolPath.CIRCLE,
              // rotation: userDirection,               // ADDED
              scale: 8,
              // strokeColor: color['white 100'],
              strokeColor: 'white',
              strokeWeight: 2,
          },
      });

  }
  setMarkerOrder(){
    var that = this;
    this.markerOrder = new google.maps.Marker({
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

    google.maps.event.addListener(this.markerOrder, 'dragend', function() {
      console.info("this.markerOrder -> dragend: ", that.markerOrder.getPosition().lat() + ", " + that.markerOrder.getPosition().lng());
    });

  }

  getCurrentLocation2(animationInterval, secondChild){
    var that = this;
    var is_echo = false;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position: GeolocationPosition){
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          console.info( "geolocation.getCurrentPosition2 ->-> ", pos.lat + ", " + pos.lng + ", : ", position.coords.accuracy + ' meters.');
          // that.map.googleMap.setCenter(pos);
          // that.map.googleMap.setZoom(17);
          // clearInterval(animationInterval);
          // secondChild.style['background-position'] = '-240px 0';
          // that.markerOrder.setPosition(pos);

          that.myCurrentPosition = pos;
          // that.userLocationTrack();

        /*------------------------------------------------*/

          that.markerPosition.setPosition(pos);
          that.markerPosition.setMap(that.map.googleMap);


          that.map.googleMap.setCenter(pos);
          that.map.googleMap.setZoom(17);
          clearInterval(animationInterval);
          secondChild.style['background-position'] = '-240px 0';
          that.markerOrder.setPosition(pos);

          /*------------------------------------------------*/



          return pos;

        },
        () => {
          this.handleLocationError(true, this.infoWindow.infoWindow, this.map.getCenter()!);
        }, {enableHighAccuracy: true, timeout: 5000, maximumAge: 60000}

      );


    } else {
      // Browser doesn't support Geolocation
      clearInterval(animationInterval);
      secondChild.style['background-position'] = '0 0';
      this.handleLocationError(false, this.infoWindow.infoWindow, this.map.getCenter()!);
    }

    return null;
  }

  getCurrentLocation(animationInterval, secondChild){
    var that = this;
    var is_echo = false;

      // Try HTML5 geolocation.
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position: GeolocationPosition){
                  const pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                  };

                  if (is_echo){ return; }
                  is_echo = true;

                console.info( pos.lat + ", " + pos.lng + ", More or less: ", position.coords.accuracy + ' meters.');
                that.map.googleMap.setCenter(pos);
                that.map.googleMap.setZoom(17);
                clearInterval(animationInterval);
                secondChild.style['background-position'] = '-240px 0';
                that.markerOrder.setPosition(pos);


                //that.myCurrentPosition = pos;
                // that.userLocationTrack();

              },
              () => {
                  this.handleLocationError(true, this.infoWindow.infoWindow, this.map.getCenter()!);
              }, {enableHighAccuracy: true, timeout: 5000, maximumAge: 60000}

          );


      } else {
          // Browser doesn't support Geolocation
          clearInterval(animationInterval);
          secondChild.style['background-position'] = '0 0';
          this.handleLocationError(false, this.infoWindow.infoWindow, this.map.getCenter()!);
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
        this.infoWindow.infoWindow.open(this.map.googleMap);
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

    loadGeolocationMarker() {
        // One way of doing this: dynamically load a script tag.
        this.mapLoading = true;
        const mapsScript = document.createElement('script')
        mapsScript.async = true;
        mapsScript.src = "https://github.com/ChadKillingsworth/geolocation-marker/releases/download/v2.0.5/geolocation-marker.js";
        mapsScript.addEventListener('load', () => {
            console.info("*** loadGeolocationMarker is loaded");
            // var GeoMarker = new GeolocationMarker(this.map.googleMap);
        })

        document.head.appendChild(mapsScript);
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
    controlButton.style.backgroundColor = '#28367f';
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

  addGeoLocationButtoOnMap(){
    // // Create the DIV to hold the control.
    // const centerControlDiv = document.createElement('div');
    // // Create the control.
    // const centerControl = this.createCenterControl(this.map.googleMap);
    // // Append the control to the DIV.
    // centerControlDiv.appendChild(centerControl);
    // this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);


    const geolocationButon = document.getElementById("divGeolocation") as HTMLElement;
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(geolocationButon);
    this.geolocationButonLoaded = true;


  }

    convertToDegrees(radian) {
        return (radian * 180) / Math.PI;
    }

    getCurrentDirection(previousCoordinates, currentCoordinates) {
        const diffLat = currentCoordinates.lat - previousCoordinates.lat;
        const diffLng = currentCoordinates.lng - previousCoordinates.lng;
        const anticlockwiseAngleFromEast = this.convertToDegrees(
            Math.atan2(diffLat, diffLng)
        );
        const clockwiseAngleFromNorth = 90 - anticlockwiseAngleFromEast;
        return clockwiseAngleFromNorth;
        // helper function

    }

    userLocationTrack(animationInterval, secondChild){
        // Keep track of user location

        var that = this;

        var userLocation = {current: undefined};
        //var userLocation = {current: null};
        // var userLocation = {current: this.myCurrentPosition};

        // console.info("inside userLocationTrack before watchPosition (is this.myFirstGeoPosition): ", userLocation.current);


        navigator.geolocation.watchPosition(position => {
            // Record the previous user location
            // const previousCoordinates = userLocation.current;

            // Update the user location
            userLocation.current = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };


            console.info("**** watchPosition: ", userLocation.current + ", " + position.coords.accuracy + ' meters.');
            // this.myCurrentPosition = userLocation.current;

            // Calculate the direction
            // const userDirection = this.getCurrentDirection(   // ADDED
            //     previousCoordinates,                       // ADDED
            //     userLocation.current
            // );                                           // ADDED

                // Construct marker
                // that.markerPosition = new google.maps.Marker({
                //     icon: {
                //         fillColor: 'blue',
                //         fillOpacity: 1,
                //         path: google.maps.SymbolPath.CIRCLE,
                //         // rotation: userDirection,               // ADDED
                //         scale: 8,
                //         // strokeColor: color['white 100'],
                //         strokeColor: 'white',
                //         strokeWeight: 2,
                //     },
                //     position:  userLocation.current,
                //     title: 'You are here!',
                // });
                // Mark the current location
                that.markerPosition.setPosition(userLocation.current);
                that.markerPosition.setMap(this.map.googleMap);


              that.map.googleMap.setCenter(userLocation.current);
              that.map.googleMap.setZoom(17);
              clearInterval(animationInterval);
              secondChild.style['background-position'] = '-240px 0';
              that.markerOrder.setPosition(userLocation.current);

        },
            () => {
                // this.handleLocationError(true, this.infoWindow.infoWindow, this.map.getCenter()!);
            }, {enableHighAccuracy: true, timeout: 10000, maximumAge: 60000}

        );
    }

  addElementsOnMap(){
    // const markerPosition = new google.maps.Marker({
    //   anchorPoint: new google.maps.Point(0, -29),
    //   map: this.map.googleMap,
    //   draggable: true,
    //   animation: google.maps.Animation.BOUNCE,
    //   label: {
    //     color: 'yellow',
    //     text: ' '
    //   },
    //   // icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    // });

    // if(this.myCurrentPosition != undefined){
    //   this.map.googleMap.setCenter(this.myCurrentPosition);
    //   markerPosition.setPosition(this.fillPosition(this.myCurrentPosition.lat, this.myCurrentPosition.lng));
    //   markerPosition.setVisible(true);
    // }

    this.setMarkerOrder();
    this.setMarkerPosition();

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
    // this.geolocationButonLoaded = true;

    // ----------------------------------
    this.addYourLocationButton(this.map, this.markerOrder);
    this.addSearchPRButton();

    // this.geolocation$.subscribe(position => {
    //     var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //     console.info("geolocation$.subscribe: ", position.coords.latitude + ", " + position.coords.longitude + ", "
    //         + position.coords.accuracy + ' meters.');
    // });

      // var GeoMarker = new GeolocationMarker(this.map.googleMap);
      // this.loadGeolocationMarker();

      // this.userLocationTrack();

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      // console.info("place_changed: ", place);

      this.markerOrder.setVisible(false);

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

      this.markerOrder.setPosition(place.geometry.location);
      this.markerOrder.setVisible(true);
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
