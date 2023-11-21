import { Component } from '@angular/core';
import {Product} from "../../domain/product";
import {ProductService2} from "../../service/productservice2";

@Component({
  selector: 'app-quito-eps-carousel',
  templateUrl: './quito-eps-carousel.component.html',
  styleUrls: ['./quito-eps-carousel.component.scss']
})
export class QuitoEpsCarouselComponent {
  products2: Product[] = [];

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
  ]

  constructor(private productService2: ProductService2,
  ) {}

  ngOnInit() {
    this.productService2.getProductsSmall().then((products) => {
      this.products2 = products;
    });
  }
}
