import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SitioReciclajeLaDeliciaservice} from "../../service/sitioreciclajeLaDeliciaservice";
import {SitioReciclajeTumbacoservice} from "../../service/sitioreciclajeTumbacoservice";
import {SitioReciclajeEloyAlfaroService} from "../../service/sitioreciclajeEloyAlfaroservice";
import {SitioReciclajeManuelitaSaenzservice} from "../../service/sitioreciclajeManuelitaSaenzservice";
import {GeolocationService} from '@ng-web-apis/geolocation';
import Webcam from 'webcam-easy';


interface Categorie {
  label: string,
  value: string
}

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.scss']
})
export class RecycleComponent implements OnInit, OnDestroy{
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  heighInitial = "200px";
  mapLoading = false;
  mapLoaded = false;
  positionIsWatched = false;
  searchBoxLoaded = false;
  geolocationButonLoaded = false;
  divSearchPRLoeaded = false;
  myCurrentPosition: any;
  markerOrder: any;
  markerPosition: any;
  circlePosition: any;
  acum = 0;
  sidebarBottomVisible: boolean = false;
  idWatchPosition : number;
  markersPR = [];
  arrayPolygons = [];
  modalBasicTittle : string;
  modalBasicParagraph : string;
  buttonReciclaDomicilioVisible : boolean = false;
  allMarkerPRVisible = false;
  buttomShowFormUploadedClicked = false;
  categories!: Categorie[];
  selectedCategories!: Categorie[];
  modalBasicVisible: boolean = false;
  modalFormUploadVisible: boolean = false;
  sideBarFotografiaVisible: boolean = false;
  markersPRIcon = "./assets/img/pixeled/recycle.png";
  webcamElement : any
  canvasElement : any
  snapSoundElement: any
  webcam : any
  zoneCurrentName = "";
    myStyles =[
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];
  mapOptions: google.maps.MapOptions = {
    center: { lat: -0.1770411, lng: -78.4491145 },
    zoom : 11,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    clickableIcons: false,
      disableDefaultUI: true,
      // styles: this.myStyles
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
  markersPolygon : any;
  polygonDrawing : any;
  selectAll = false;

  dateOrder: Date | undefined;

  username: string = '';
  userLastName: string | undefined;

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

    this.categories = [
        { label: 'Papel', value: 'PA' },
        { label: 'Carton', value: 'CAR' },
        { label: 'Plastico', value: 'PLA' },
        { label: 'Vidrio', value: 'VI' },
        { label: 'Chatarra', value: 'CHAT' },
        { label: 'Madera', value: 'MAD' },
        { label: 'Textiles', value: 'TEXT' },
    ];
  }

  clickOnMap(event: any){
    this.markerOrder.setMap(null);
    this.deleteMarkerorder();
    this.setMarkerOrder(event.latLng);
  }

  onShowSideBarCamera() {
    console.info("onShowModalCamera");

    this.webcamElement = document.getElementById('webcam');
    this.canvasElement = document.getElementById('canvas');
    this.snapSoundElement = document.getElementById('snapSound');
    this.webcam = new Webcam(this.webcamElement, 'user', this.canvasElement, this.snapSoundElement);

    this.webcam.flip();
    this.webcam.start()
      .then(result =>{
        console.log("webcam started");
      })
      .catch(err => {
        console.error(err);
      });
  }
  clickCameraButton() {
    console.info("clickCameraButton");
    this.sideBarFotografiaVisible = true;
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

  onSelectAllChange(event) {
    this.selectedCategories = event.checked ? [...this.categories] : [];
    this.selectAll = event.checked;
    event.updateModel(this.selectedCategories, event.originalEvent)
  }

  onChange(event) {
    const { originalEvent, value } = event
    if(value) this.selectAll = value.length === this.categories.length;
  }

  showLifeLong(accuracy) {
    this.messageService.add({ severity: 'info', summary: 'Precisión del dispositivo', detail: 'El dispostivo actualmente tiene una precisión de ' +
       this.formatDistance(accuracy) + ' a la redonda.', life: 6000 });
  }

  // clickOnSearchPR(that: any){
  //     // that.deleteMarkerPosition();
  //     that.sidebarVisible4 = true;
  //     console.info("that.arrayPolygons: ", that.arrayPolygons)
  // }

  showAllMarkersPR(){
    this.zoneCurrentName = "";
    this.deleteAllMarkersPR();

        this.eloyAlfatoMarkers.map((marker, i) => {
            this.markersPR.push(new google.maps.Marker({
                map: this.map.googleMap,
                icon: this.markersPRIcon,
                position: marker,
                title: marker.title,
                cursor: this.haversineDistance(this.markerOrder, marker),
            }));
        });

        this.manuelitaSaenzMarkers.map((marker, i) => {
            this.markersPR.push(new google.maps.Marker({
                map: this.map.googleMap,
                icon: this.markersPRIcon,
                position: marker,
                title: marker.title,
                cursor: this.haversineDistance(this.markerOrder, marker),
            }));
        });

        this.tumbacoMarkers.map((marker, i) => {
            this.markersPR.push(new google.maps.Marker({
                map: this.map.googleMap,
                icon: this.markersPRIcon,
                position: marker,
                title: marker.title,
                cursor: this.haversineDistance(this.markerOrder, marker),
            }));
        });



        this.laDeliciaMarkers.map((marker, i) => {
            this.markersPR.push(new google.maps.Marker({
                map: this.map.googleMap,
                icon: this.markersPRIcon,
                position: marker,
                title: marker.title,
                cursor: this.haversineDistance(this.markerOrder, marker),
            }));
        });

        this.markersPR.sort((a, b) => a.cursor - b.cursor);

        this.sidebarBottomVisible = true;
        this.modalBasicVisible = false;

        // console.warn("this.markersPR: ", this.markersPR);
  }

  private formatPosition (item){
      return new google.maps.LatLng({lat: item.lat,
          lng: item.lng});
  }

  private validateMarkersInPolygonCorresponding(){
      let polygon;

      // polygon = this.arrayPolygons.find(value => value.name = 'CEGAM ELOY ALFARO')
      // this.eloyAlfatoMarkers = this.eloyAlfatoMarkers.filter(marker => google.maps.geometry.poly.containsLocation(this.formatPosition(marker),
      //     new google.maps.Polygon({ paths: polygon.polygon })));

      polygon = this.arrayPolygons.find(value => value.name = 'CEGAM LA DELICIA')
      // this.laDeliciaMarkers = this.laDeliciaMarkers.find(marker => google.maps.geometry.poly.containsLocation(this.formatPosition(marker),
      //     new google.maps.Polygon({ paths: polygon.polygon })));
      let valoresConstains = 0;
      let valoresNoConstains = 0;

      this.laDeliciaMarkers.forEach(marker => {
          let contains = google.maps.geometry.poly.containsLocation(this.formatPosition(marker),
              new google.maps.Polygon({ paths: polygon.polygon }))

          if(contains){
            valoresConstains++;
          }else{
            valoresNoConstains++
          }
      })

      console.info("valoresConstains: ", valoresConstains + ", valoresNoConstains:", valoresNoConstains);



      // polygon = this.arrayPolygons.find(value => value.name = 'CEGAM MANUELA SÁENZ')
      // this.manuelitaSaenzMarkers = this.manuelitaSaenzMarkers.filter(marker => google.maps.geometry.poly.containsLocation(this.formatPosition(marker),
      //     new google.maps.Polygon({ paths: polygon.polygon })));


      // polygon = this.arrayPolygons.find(value => value.name = 'CEGAM TUMBACO')
      // this.tumbacoMarkers = this.tumbacoMarkers.filter(marker => google.maps.geometry.poly.containsLocation(this.formatPosition(marker),
      //     new google.maps.Polygon({ paths: polygon.polygon })));

      let nose = 4;

  }

  private showMarkersPRZone(polygon: any){
    this.deleteAllMarkersPR();
    switch (polygon.name) {
      case "CEGAM ELOY ALFARO":
         this.eloyAlfatoMarkers.map((marker, i) => {
              if(google.maps.geometry.poly.containsLocation(this.formatPosition(marker), new google.maps.Polygon({ paths: polygon.polygon }))){
                  this.markersPR.push(new google.maps.Marker({
                      map: this.map.googleMap,
                      icon: this.markersPRIcon,
                      position: marker,
                      title: marker.title,
                      cursor: this.haversineDistance(this.markerOrder, marker),
                  }));

                  // console.info("-- name of marker: ", marker.title);
              }
          });
        break;
      case "CEGAM LA DELICIA":
          this.laDeliciaMarkers.map((marker, i) => {
              if(google.maps.geometry.poly.containsLocation(this.formatPosition(marker), new google.maps.Polygon({ paths: polygon.polygon }))){
                  this.markersPR.push(new google.maps.Marker({
                      map: this.map.googleMap,
                      icon: this.markersPRIcon,
                      position: marker,
                      title: marker.title,
                      cursor: this.haversineDistance(this.markerOrder, marker),

                  }));
              }
          });

          break;
      case "CEGAM MANUELA SÁENZ":
          this.manuelitaSaenzMarkers.map((marker, i) => {
              if(google.maps.geometry.poly.containsLocation(this.formatPosition(marker), new google.maps.Polygon({ paths: polygon.polygon }))){
                  this.markersPR.push(new google.maps.Marker({
                      map: this.map.googleMap,
                      icon: this.markersPRIcon,
                      position: marker,
                      title: marker.title,
                      cursor: this.haversineDistance(this.markerOrder, marker)
                  }));
              }

          });

          break;
      case "CEGAM TUMBACO":
          this.tumbacoMarkers.map((marker, i) => {
              if(google.maps.geometry.poly.containsLocation(this.formatPosition(marker), new google.maps.Polygon({ paths: polygon.polygon }))){
                  this.markersPR.push(new google.maps.Marker({
                      map: this.map.googleMap,
                      icon: this.markersPRIcon,
                      position: marker,
                      title: marker.title,
                      cursor: this.haversineDistance(this.markerOrder, marker)
                  }));
              }
          });

          break;
      default:
        break;
    }

      if(this.zoneCurrentName != polygon.name){
          this.messageService.add({ severity: 'info', summary: 'Zona delimitada', detail: 'El punto indicado pertenece a la Zona '
                  + polygon.name, life: 8000 });

          this.zoneCurrentName = polygon.name;
      }

      this.polygonDrawing.clickable = false;
      this.polygonDrawing.setPath(polygon.polygon);
      this.polygonDrawing.setMap(this.map.googleMap);


      // let bounds = this.polygonBounds(this.polygonDrawing);
      // this.map.googleMap.fitBounds(bounds);
      this.markersPR.sort((a, b) => a.cursor - b.cursor);

      // console.info("Current this.markersPolygon: ", this.markersPolygon);
      // console.warn("this.markersPR: ", this.markersPR);
      this.sidebarBottomVisible = true;
  }

  showFormUpload() {
      console.info("Click en boton. Debe mostrar el firulario de carga");

      this.buttomShowFormUploadedClicked = true;
      this.modalBasicTittle = "Recicla a domicilio"
      this.modalFormUploadVisible = true;
      return;
  }

    callTelphoneNumber() {
        console.info("Click en llamar button");

        this.buttomShowFormUploadedClicked = true;
        return;
    }

  clickItemMarkerPR(marker){
      if(!this.buttomShowFormUploadedClicked ){

          const infowindow = new google.maps.InfoWindow({
              content: "<b>" + marker.title + "</b>",

          });

          let title = marker.title;

          infowindow.open(this.map.googleMap, marker);

          // marker.addListener("click", () => {
          // });

          this.map.googleMap.setCenter(marker.getPosition());
          this.map.googleMap.setZoom(16);
          this.sidebarBottomVisible = false;

      }

      this.buttomShowFormUploadedClicked = false;
  }

    polygonBounds(polygon) {
        var bounds = new google.maps.LatLngBounds();
        for (var i=0; i<polygon.getPaths().getLength(); i++) {
            for (var j=0; j<polygon.getPaths().getAt(i).getLength(); j++) {
                bounds.extend(polygon.getPaths().getAt(i).getAt(j));
            }
        }
        return bounds;
    }

    haversineDistance(mk1, mk2) {
        var R = 6371.0710; // Radius of the Earth in kms
        var rlat1 = mk1.position.lat() * (Math.PI/180); // Convert degrees to radians
        var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (mk2.lng-mk1.position.lng()) * (Math.PI/180); // Radian difference (longitudes)

        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d.toFixed(2);
    }

  private getCorrespondingPolygon (position: google.maps.LatLng){
    return this.arrayPolygons.find(value => google.maps.geometry.poly.containsLocation(position, new google.maps.Polygon({ paths: value.polygon })));
  }

  // private validateContainsLocation (position: google.maps.LatLng){
  //   let isInZone = false;
  //
  //   console.info("//// this.arrayPolygons: ", this.arrayPolygons);
  //
  //   this.arrayPolygons.forEach(polygon => {
  //     let zonaPR = new google.maps.Polygon({ paths: polygon.polygon });
  //     let containsLocation = google.maps.geometry.poly.containsLocation(
  //       position,
  //       zonaPR
  //     )
  //
  //     if(containsLocation){
  //       isInZone = true;
  //       console.info("Polygon name: ", polygon.name + ", polygon coords: ", polygon.polygon)
  //       this.buttonReciclaDomicilioVisible = true;
  //       this.showMarkersPRZone(polygon);
  //
  //     }
  //   })

  //   if(!isInZone){//
  //     this.modalBasicParagraph = "El punto no se encuentra dentro de ninguna zona establecida para la recolección. Se muestran todos los lugares disponibles en la ciudad.";
  //     this.modalBasicTittle = "Zona no establecida";
  //     this.modalBasicVisible = true;
  //
  //     this.showAllMarkersPR();
  //   }
  // }


  addSearchPRButton()
  {
    var that = this;
    const searchPRDiv = document.getElementById("divSearchPR") as HTMLElement;



    searchPRDiv.addEventListener('click', function (){
        // console.info("that.arrayPolygons: ", that.arrayPolygons);
        that.markersPolygon = [];
        // console.info("that.markersPolygon: ", that.markersPolygon);

      if(that.markerOrder.getPosition() != undefined){// MarkerOrder Position
        // console.info("that.markerOrder :", that.markerOrder.getPosition().lat() + ", " + that.markerOrder.getPosition().lng());


          let polygon = that.getCorrespondingPolygon(that.markerOrder.getPosition());


          if(polygon == undefined){//
              that.allMarkerPRVisible = true;
              that.modalBasicParagraph = "El punto no se encuentra dentro de ninguna zona establecida para la recolección. A continuación se muestran todos los lugares disponibles.";
              that.modalBasicTittle = "Zona no establecida";
              that.modalBasicVisible = true;

              // that.showAllMarkersPR();
          }else{
              that.allMarkerPRVisible = false;
              // console.info("****** Polygon name: ", polygon.name + ", polygon coords: ", polygon.polygon)
              that.buttonReciclaDomicilioVisible = true;
              that.showMarkersPRZone(polygon);
              // that.sidebarBottomVisible = true;
          }

          // that.sidebarBottomVisible = true;

      }else{
        that.modalBasicTittle = "Ubicar el punto del pedido";
        that.modalBasicParagraph = "Debe ubicar el sitio del pedido para mostrar los puntos de recilaje cercanos.";
        that.modalBasicVisible = true;
      }


      if(that.markerPosition.getPosition() != undefined){// MarkerPosition Position
        // console.info("that.markerPosition:", that.markerPosition.getPosition().lat() + ", " + that.markerPosition.getPosition().lng());
      }

      //To do containsLocations

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

    addMarker(position: google.maps.LatLng) {
        this.markersPR.push({
            // position: {
            //     lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
            //     lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
            // },
            position: position
        });
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

  deleteMarkerorder(){
      this.markerOrder.setMap(null);
  }

  setPolygonDrawing(){
      this.polygonDrawing = new google.maps.Polygon({
          fillColor: "#1275bb",
          strokeColor: "#1275bb",
          fillOpacity: 0.1,
          strokeOpacity: 0.8,
          strokeWeight: 2,
          clickable: false,
      });
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
          clickable: false
      });
  }

  setCirclePosition() {
    this.circlePosition = new google.maps.Circle({
      // center: center,
      map: this.map.googleMap,
      // radius: 10000,          // IN METERS.
      fillColor: '#6ebce9',
      fillOpacity: 0.2,
      strokeColor: "#FFF",
      strokeWeight: 0,         // DON'T SHOW CIRCLE BORDER.
      strokeOpacity: 0.8,
      clickable: false
    });
  }

  setMarkerOrder(position?){
    // this.deleteMarkerorder();
    var that = this;
    this.markerOrder = new google.maps.Marker({
      // icon: {
      //   url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      // },
      // anchorPoint: new google.maps.Point(0, -29),
      position: position,
      map: this.map.googleMap,
      draggable: true,
      animation: google.maps.Animation.BOUNCE,
      label: {
        color: 'yellow',
        text: ' ',
      },
      clickable: false
    });
  }

    // setMarkerspolygon(){
    //     var that = this;
    //     this.markerPosition = new google.maps.Marker[]({
    //         icon: {
    //             url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    //         },
    //         anchorPoint: new google.maps.Point(0, -29),
    //         map: this.map.googleMap,
    //         draggable: true,
    //         animation: google.maps.Animation.BOUNCE,
    //         label: {
    //             color: 'yellow',
    //             text: ' '
    //         },
    //     });
    // }

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
                 // that.markerOrder.setPosition(pos);


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

    private getArrayPolygon2(items: any){
        const arrayCoord = items.Placemark.Polygon.outerBoundaryIs.LinearRing.coordinates.split("|");
        let arrayCoordPolygon = [];
        arrayCoord.map(value => {
            arrayCoordPolygon.push({
                lat: parseFloat(value.split(",")[1]),
                lng: parseFloat(value.split(",")[0])
            })
        })

        return arrayCoordPolygon;
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

    private validateMarkersLaDeliciaInPolygon(itemsMarkers){
        this.sitioReciclajeLaDeliciaservice.getZona().then((items) => {
            let arrayPolygon = this.getArrayPolygon2(items);

            itemsMarkers.forEach(item => {

                let position = new google.maps.LatLng({lat: parseFloat(item.Point.coordinates.toString().split(',')[1].toString()),
                    lng: parseFloat(item.Point.coordinates.toString().split(',')[0].toString())});

                if(google.maps.geometry.poly.containsLocation(position, new google.maps.Polygon({ paths: arrayPolygon }))){
                    this.laDeliciaMarkers.push(
                        {label: item.name,
                            lat: parseFloat(item.Point.coordinates.toString().split(',')[1].toString()),
                            lng: parseFloat(item.Point.coordinates.toString().split(',')[0].toString())
                        });
                }
            });
        });
    }

  listSitioReciclajeLaDeliciaService(){
      this.sitioReciclajeLaDeliciaservice.getSitios().then((items) => {
          items.map((item, i) => {
              this.laDeliciaMarkers.push(
                  {title: item.name,
                      lat: parseFloat(item.Point.coordinates.toString().split(',')[1].toString()),
                      lng: parseFloat(item.Point.coordinates.toString().split(',')[0].toString())
                  });
          });
      });
  }

    listSitioReciclajeEloyAlfaroService(){
        this.sitioReciclajeEloyAlfaroService.getSitios().then((items) => {
            items.map((item, i) => {
                this.eloyAlfatoMarkers.push(
                    {title: item.name,
                        lat: parseFloat(item.Point.coordinates.toString().split(',')[1].toString()),
                        lng: parseFloat(item.Point.coordinates.toString().split(',')[0].toString())
                    });
            });
        });
    }

    listSitioReciclajeManuelitaSaenzService(){
        this.sitioReciclajeManuelitaSaenzservice.getSitios().then((items) => {
            items.map((item, i) => {
                this.manuelitaSaenzMarkers.push(
                    {title: item.name,
                        lat: parseFloat(item.Point.coordinates.toString().split(',')[1].toString()),
                        lng: parseFloat(item.Point.coordinates.toString().split(',')[0].toString())
                    });
            });
        });
    }

    listSitioReciclajeTumbacoService(){
        this.sitioReciclajeTumbacoservice.getSitios().then((items) => {
            items.map((item, i) => {
                this.tumbacoMarkers.push(
                    {title: item.name,
                        lat: parseFloat(item.Point.coordinates.toString().split(',')[1].toString()),
                        lng: parseFloat(item.Point.coordinates.toString().split(',')[0].toString())
                    });
            });
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
        this.modalBasicVisible = true;
    }

  openInfoWindow(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.infoWindow.open(marker);
  }

    openInfo(marker: MapMarker, content) {
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
        clickable: false
      });
    }

    private validatePertinencePolygon(){

    }

    validatePosition(animationInterval, secondChild, position: GeolocationPosition){
      this.acum++;

      const latLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
      }


      /*validate accuracy*/
      if(this.acum >= 0 || position.coords.accuracy <= 35){
        if(position.coords.accuracy <= 35){//in meters
          this.messageService.clear();
          // console.warn("Only here must put the maker position")
          // console.warn("--------> Fecha Hora de fin: ", new Date())

            this.setMarkerPositionExact();


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
        this.circlePosition.clickable = false;

          if(this.acum == 1){
              // console.info("--------> Fecha Hora de inicio: ", new Date())
              this.deleteMarkerorder();
              this.setMarkerOrder(latLng);
              this.map.googleMap.fitBounds(this.circlePosition.getBounds());
              this.map.googleMap.setCenter(latLng);
          }

        // this.deleteAllMarkersPR();

        // this.map.googleMap.setCenter(latLng);
        // this.map.googleMap.setZoom(12);
        // this.map.googleMap.fitBounds(this.circlePosition.getBounds());

        clearInterval(animationInterval);
        secondChild.style['background-position'] = '-240px 0';



        // this.map.googleMap.fitBounds(this.circlePosition.getBounds());
      }

    }

  userLocationService(animationInterval, secondChild){
    if(!this.positionIsWatched){
      this.geolocation$.subscribe(position => {
        this.positionIsWatched = true;
        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // console.info("geolocation$.subscribe: ", position.coords.latitude + ", " + position.coords.longitude + ", "
        //   + position.coords.accuracy + ' meters, ' + new Date(position.timestamp));

        this.validatePosition(animationInterval, secondChild, position);
      });
    }else{
      let newCenter = new google.maps.LatLng({lat: this.myCurrentPosition.coords.latitude,
        lng: this.myCurrentPosition.coords.longitude});
      this.map.googleMap.setCenter(newCenter);
      clearInterval(animationInterval);
      secondChild.style['background-position'] = '-240px 0';
      this.polygonDrawing.clickable = false;
      this.polygonDrawing.setMap(null);

    }


  }

  userLocationTrack(animationInterval, secondChild){
        var that = this;

        if(!this.positionIsWatched){
          that.idWatchPosition = navigator.geolocation.watchPosition(position => {
              that.positionIsWatched = true;
              // console.info("**** watchPosition: ", position.coords + ", " + new Date(position.timestamp) + ", "  + position.coords.accuracy + ' meters.');
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

  private deleteAllMarkersPR(){
      this.markersPR.forEach(markerPR => {
          markerPR.setMap(null);
      });

      this.markersPR = [];
      this.polygonDrawing.clickable = false;
      this.polygonDrawing.setMap(null);
  }

  addElementsOnMap(){
    var that = this;

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
        this.modalBasicVisible = true;
        this.modalBasicTittle = "Lugar no disponible";
        this.modalBasicParagraph = "No existe información registrada para " + place.name
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        that.sidebarBottomVisible = false;
        let position = new google.maps.LatLng({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()});
        // this.markerOrder.setPosition(position);
        // this.markerOrder.setVisible(true);
          this.deleteMarkerorder();
          this.setMarkerOrder(position);
        this.map.googleMap.fitBounds(place.geometry.viewport);

        this.deleteAllMarkersPR();
        // this.validateContainsLocation(position);
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
    this.setPolygonDrawing();
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

  protected readonly Array = Array;
}
