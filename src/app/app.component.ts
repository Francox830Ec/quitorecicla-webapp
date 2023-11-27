import {Component, OnInit} from '@angular/core';
import { Product } from '../domain/product';
import { ProductService } from '../service/productservice';
import { ProductService2 } from '../service/productservice2';
import {PhotoService} from "../service/photoservice";

export interface Tutorial {
  title?: string;
  category?: string;
  rating?: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'quitorecicla-webapp2';
  products: Product[] = [];
  products2: Product[] = [];
  images: any[] | undefined;
  // responsiveOptions: any[] | undefined;
  cols: any[] | undefined;
  tutorials: Tutorial[] = [];

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555
  };
  zoom = 6;

  options: any;


  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];


  constructor(private productService: ProductService,
              private productService2: ProductService2,
              private photoService: PhotoService
  ) {}

  ngOnInit() {


    // Initialize and add the map
    let map;
    async function initMap(): Promise<void> {
      // The location of Uluru
      const position = { lat: -25.344, lng: 131.031 };

      // Request needed libraries.
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerView } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

      // The map, centered at Uluru
      map = new Map(
        document.getElementById('map') as HTMLElement,
        {
          zoom: 4,
          center: position,
          mapId: 'DEMO_MAP_ID',
        }
      );

      // The marker, positioned at Uluru
      const marker = new AdvancedMarkerView({
        map: map,
        position: position,
        title: 'Uluru'
      });
    }

    initMap();



    this.options = {
      center: { lat: 22.72105, lng: 88.373459 },
      zoom: 12,
    };

    this.tutorials = [
      {
        title: "Queue",
        category: "Data Structure",
        rating: 8
      },
      {
        title: "Circularly LinkedList",
        category: "Data Structure",
        rating: 1
      },
      {
        title: "Doubly LinkedList",
        category: "Data Structure",
        rating: 3
      },
    ];

    this.cols = [
      { field: "title", header: "Title" },
      { field: "category", header: "Category" },
      { field: "rating", header: "Rating" }
    ];

    this.productService.getProductsSmall().then((products) => {
      this.products = products;
    });

    this.productService2.getProductsSmall().then((products) => {
      this.products2 = products;
    });

    this.photoService.getImages().then((images) => {
      this.images = images;
    });

    // this.responsiveOptions = [
    //   {
    //     breakpoint: '1400px',
    //     numVisible: 3,
    //     numScroll: 3
    //   },
    //   {
    //     breakpoint: '1220px',
    //     numVisible: 2,
    //     numScroll: 2
    //   },
    //   {
    //     breakpoint: '1100px',
    //     numVisible: 1,
    //     numScroll: 1
    //   }
    // ];

  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }

  /*------------------------------------------
--------------------------------------------
moveMap()
--------------------------------------------
--------------------------------------------*/
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  /*------------------------------------------
  --------------------------------------------
  move()
  --------------------------------------------
  --------------------------------------------*/
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
}
