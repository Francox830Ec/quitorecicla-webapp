import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'quitorecicla-webapp2';
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
}
