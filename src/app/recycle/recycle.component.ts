import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SitioReciclajeLaDeliciaservice} from "../../service/sitioreciclajeLaDeliciaservice";
import {SitioReciclajeTumbacoservice} from "../../service/sitioreciclajeTumbacoservice";
import {SitioReciclajeEloyAlfaroService} from "../../service/sitioreciclajeEloyAlfaroservice";
import {SitioReciclajeManuelitaSaenzservice} from "../../service/sitioreciclajeManuelitaSaenzservice";
import {GeolocationService} from '@ng-web-apis/geolocation';


@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.scss']
})
export class RecycleComponent implements OnInit, OnDestroy{
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  // @ViewChild(MapMarker, { static: false }) mapMarker: MapMarker;

  heighInitial = "200px";
  mapLoading = false;
  mapLoaded = false;
  positionIsWatched = false;
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
  circlePosition: any;
  acum = 0;
  sidebarVisible4: boolean = false;
  idWatchPosition : number;
  orderMarker = [];
  arrayPolygons = [];


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
              private readonly geolocation$: GeolocationService,
              private messageService: MessageService
              ) {
  }

    ngOnDestroy() {
        navigator.geolocation.clearWatch(this.idWatchPosition);
        console.info("navigator.geolocation.clearWatch");
    }

  ngOnInit() {
    this.loadMap();
    this.listSitioReciclajeLaDeliciaService();
    this.listSitioReciclajeManuelitaSaenzService();
    this.listSitioReciclajeEloyAlfaroService();
    this.listSitioReciclajeTumbacoService();

    this.getPolygonEloyAlfaroService();
    this.getPolygonLaDeliciaService();
    this.getPolygonManuelitaSaenzService();
    this.getPolygonTumbacoService();
  }


  formatDistance (accurancy) {
    if (accurancy >= 1000) {
      return Math.round(accurancy / 1000) + " Km."
    } else if (accurancy >= 100) {
      return Math.round(accurancy) + " m."
    } else {
      return accurancy.toFixed(1) + " m."
    }
  };

  showLifeLong(accuracy) {
    this.messageService.add({ severity: 'info', summary: 'Precisión del dispositivo', detail: 'El dispostivo actualmente tiene una precisión de ' +
       this.formatDistance(accuracy) + ' a la redonda.', life: 20000 });
  }

  // clickOnSearchPR(that: any){
  //     // that.deleteMarkerPosition();
  //     that.sidebarVisible4 = true;
  //     console.info("that.arrayPolygons: ", that.arrayPolygons)
  // }

  addSearchPRButton()
  {
    var that = this;
    const searchPRDiv = document.getElementById("divSearchPR") as HTMLElement;

    searchPRDiv.addEventListener('click', function (){
        that.sidebarVisible4 = true;
        console.info("that.arrayPolygons: ", that.arrayPolygons)

      if(that.markerOrder.getPosition() != undefined){
        console.info("that.markerOrder :", that.markerOrder.getPosition().lat() + ", " + that.markerOrder.getPosition().lng());
      }


      if(that.markerPosition.getPosition() != undefined){
        console.info("that.markerPosition:", that.markerPosition.getPosition().lat() + ", " + that.markerPosition.getPosition().lng());
      }
    });

    this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(searchPRDiv);
    this.divSearchPRLoeaded = true;
  }

  addGeoLocationButton(map, marker)
  {
      var that = this;
      var divGeoLocation = document.createElement('div');

      var buttonGeoLocation = document.createElement('button');
      buttonGeoLocation.style.backgroundColor = '#fff';
      buttonGeoLocation.style.border = 'none';
      buttonGeoLocation.style.outline = 'none';
      buttonGeoLocation.style.width = '40px';
      buttonGeoLocation.style.height = '40px';
      buttonGeoLocation.style.borderRadius = '2px';
      buttonGeoLocation.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
      buttonGeoLocation.style.cursor = 'pointer';
      buttonGeoLocation.style.marginRight = '10px';
      buttonGeoLocation.style.padding = '0';
      buttonGeoLocation.title = 'Tu localización';
      divGeoLocation.appendChild(buttonGeoLocation);

      var secondChild = document.createElement('div');
      secondChild.style.margin = '5px';
      secondChild.style.width = '30px';
      secondChild.style.height = '30px';
      secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
      secondChild.style.backgroundSize = '300px 30px';
      secondChild.style.backgroundPosition = '0 0';
      secondChild.style.backgroundRepeat = 'no-repeat';
      buttonGeoLocation.appendChild(secondChild);

      google.maps.event.addListener(this.map.googleMap, 'center_changed', function () {
          secondChild.style['background-position'] = '0 0';
      });



      buttonGeoLocation.addEventListener('click', function () {
          var imgX = '0',
              animationInterval = setInterval(function () {
                  imgX = imgX === '-30' ? '0' : '-30';
                  secondChild.style['background-position'] = imgX+'px 0';
              }, 500);

          that.userLocationService(animationInterval,secondChild);
      });

      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(divGeoLocation);
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

  deleteMarkerPosition(){
    this.markerPosition.setMap(null);
  }

  setMarkerPosition(){
    // #757575  #616161 #607D8B
      this.markerPosition = new google.maps.Marker({
          icon: {
              fillColor: '#607D8B',
              fillOpacity: 1,
              path: google.maps.SymbolPath.CIRCLE,
              // rotation: userDirection,               // ADDED
              scale: 8,
              // strokeColor: color['white 100'],
              strokeColor: 'white',
              strokeWeight: 2,
          },
          // visible: false
      });
  }

  setCirclePosition() {
    this.circlePosition = new google.maps.Circle({
      // center: center,
      map: this.map.googleMap,
      // radius: 10000,          // IN METERS.
      fillColor: '#6ebce9',
      fillOpacity: 0.35,
      strokeColor: "#FFF",
      strokeWeight: 0,         // DON'T SHOW CIRCLE BORDER.
      strokeOpacity: 0.8
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
  }

  getCurrentLocation2(animationInterval, secondChild){
    var that = this;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position: GeolocationPosition){

          console.info( "geolocation.getCurrentPosition2 ->-> ", position.coords.latitude + ", " + position.coords.longitude + ", : ", position.coords.accuracy + ' meters.');
          that.myCurrentPosition = position;
        /*------------------------------------------------*/

        that.validatePosition(animationInterval, secondChild, position);


        /*------------------------------------------------*/



        },
        () => {
          this.handleLocationError(true, this.infoWindow.infoWindow, this.map.getCenter()!);
        }, {enableHighAccuracy: true, timeout: 10000, maximumAge: 0}

      );


    } else {
      // Browser doesn't support Geolocation
      clearInterval(animationInterval);
      secondChild.style['background-position'] = '0 0';
      this.handleLocationError(false, this.infoWindow.infoWindow, this.map.getCenter()!);
    }


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
              (err) => {
                  console.error("Error en Geolocation: ", err);

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

    private setArrayPolygon(items: any){
        const arrayCoord = items.Placemark.Polygon.outerBoundaryIs.LinearRing.coordinates.split("|");
        let arrayCoordPolygon = [];
        arrayCoord.map(value => {
            arrayCoordPolygon.push({
                lat: parseFloat(value.split(",")[1]),
                lng: parseFloat(value.split(",")[0])
            })
        })

        this.arrayPolygons.push({id: null, name: items.name, polygon: arrayCoordPolygon});
    }

    getPolygonTumbacoService(){
        this.sitioReciclajeTumbacoservice.getZona().then((items) => {

            this.setArrayPolygon(items);
            // console.info("sitioReciclajeTumbacoservice.getZona(): ", items.Placemark.Polygon.outerBoundaryIs.LinearRing.coordinates);
        });
    }

    getPolygonManuelitaSaenzService(){
        this.sitioReciclajeManuelitaSaenzservice.getZona().then((items) => {

            this.setArrayPolygon(items);
            // console.info("sitioReciclajeManuelitaSaenzservice.getZona(): ", items.Placemark.Polygon.outerBoundaryIs.LinearRing.coordinates);
        });
    }

    getPolygonEloyAlfaroService(){
        this.sitioReciclajeEloyAlfaroService.getZona().then((items) => {
            this.setArrayPolygon(items);
            // console.info("sitioReciclajeEloyAlfaroService.getZona(): ", items.Placemark.Polygon.outerBoundaryIs.LinearRing.coordinates);
        });
    }


    getPolygonLaDeliciaService(){
        this.sitioReciclajeLaDeliciaservice.getZona().then((items) => {
            this.setArrayPolygon(items);
            // console.info("sitioReciclajeLaDeliciaservice.getZona(): ", items.Placemark.Polygon.outerBoundaryIs.LinearRing.coordinates);
        });
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

    private setMarkerPositionExact(){
      this.deleteMarkerPosition();
      this.markerPosition = new google.maps.Marker({
        icon: {
          fillColor: 'blue',
          fillOpacity: 1,
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          strokeColor: 'white',
          strokeWeight: 2,
        },
        // visible: true
      });
    }

    private validatePertinencePolygon(){

    }

    validatePosition(animationInterval, secondChild, position: GeolocationPosition){
      this.acum++;

      if(this.acum <= 1){
        console.info("--------> Fecha Hora de inicio: ", new Date())
      }

      /*validate accuracy*/
      if(this.acum <= 1 || position.coords.accuracy <= 35){
        if(position.coords.accuracy <= 35){//in meters
          this.messageService.clear();
          console.warn("Only here must put the maker position")
          console.warn("--------> Fecha Hora de fin: ", new Date())
          this.setMarkerPositionExact();
        }else{
          this.showLifeLong(position.coords.accuracy);
        }

        const latLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        this.myCurrentPosition = position;

        // Mark the current location
        this.markerPosition.setPosition(latLng);
        this.markerPosition.setMap(this.map.googleMap);

        this.circlePosition.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        this.circlePosition.setRadius(position.coords.accuracy);

        this.map.googleMap.setCenter(latLng);
        this.map.googleMap.setZoom(17);

        clearInterval(animationInterval);
        secondChild.style['background-position'] = '-240px 0';

        this.markerOrder.setPosition(latLng);

        this.map.googleMap.fitBounds(this.circlePosition.getBounds());
      }

    }

  userLocationService(animationInterval, secondChild){
    if(!this.positionIsWatched){
      this.geolocation$.subscribe(position => {
        this.positionIsWatched = true;
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.info("geolocation$.subscribe: ", position.coords.latitude + ", " + position.coords.longitude + ", "
          + position.coords.accuracy + ' meters, ' + new Date(position.timestamp));

        this.validatePosition(animationInterval, secondChild, position);
      });
    }else{
      let newCenter = new google.maps.LatLng({lat: this.myCurrentPosition.coords.latitude,
        lng: this.myCurrentPosition.coords.longitude});
      this.map.googleMap.setCenter(newCenter);
      clearInterval(animationInterval);
      secondChild.style['background-position'] = '-240px 0';
    }


  }



  userLocationTrack(animationInterval, secondChild){
        var that = this;

        if(!this.positionIsWatched){
          that.idWatchPosition = navigator.geolocation.watchPosition(position => {
              that.positionIsWatched = true;
              console.info("**** watchPosition: ", position.coords + ", " + new Date(position.timestamp) + ", "  + position.coords.accuracy + ' meters.');
              that.validatePosition(animationInterval, secondChild, position);
            },
            () => {
              // this.handleLocationError(true, this.infoWindow.infoWindow, this.map.getCenter()!);
            }, {enableHighAccuracy: true, timeout: 5000, maximumAge: 0}

          );

        }else{
            let newCenter = new google.maps.LatLng({lat: this.myCurrentPosition.coords.latitude,
              lng: this.myCurrentPosition.coords.longitude});
            this.map.googleMap.setCenter(newCenter);
            clearInterval(animationInterval);
            secondChild.style['background-position'] = '-240px 0';
        }
    }

  addElementsOnMap(){
    const options = {
      componentRestrictions: { country: 'EC'},
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

    // this.geolocation$.subscribe(position => {
    //     var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //     console.info("geolocation$.subscribe: ", position.coords.latitude + ", " + position.coords.longitude + ", "
    //         + position.coords.accuracy + ' meters.');
    // });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      // this.markerOrder.setVisible(false);
      // this.markerOrder.setMap(null);

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
        const latLng = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }

        console.info("latLng:", latLng);

        this.markerOrder.setPosition(latLng);
        this.markerOrder.setVisible(true);
        this.map.googleMap.fitBounds(place.geometry.viewport);

        console.info("place.geometry.viewport: ", place.geometry.viewport);
        console.info("place.geometry.location.lat(): ", place.geometry.location.lat());
        console.info("place.geometry.location.lng(): ", place.geometry.location.lng());

      } else {
        console.info("NOT place.geometry.viewport");
        this.map.center = place.geometry.location;
        this.map.zoom = 17;
      }


    });

    this.setMarkerPosition();
    this.setCirclePosition();
    this.setMarkerOrder();
    this.addGeoLocationButton(this.map, this.markerOrder);
    this.addSearchPRButton();
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
