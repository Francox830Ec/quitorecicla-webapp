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
  title = 'quitorecicla-webapp';
  products: Product[] = [];
  products2: Product[] = [];
  images: any[] | undefined;
  // responsiveOptions: any[] | undefined;
  cols: any[] | undefined;
  tutorials: Tutorial[] = [];


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

    console.info("app.component");

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

  initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.749933, lng: -73.98633 },
      zoom: 13,
      mapTypeControl: false,
    });
    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const biasInputElement = document.getElementById("use-location-bias");
    const strictBoundsInputElement = document.getElementById("use-strict-bounds");
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
  }
}
