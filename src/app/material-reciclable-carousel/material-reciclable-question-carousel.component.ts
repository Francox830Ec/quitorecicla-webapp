import {Component, Input} from '@angular/core';
import {ProductService2} from "../../service/productservice2";
import {Product} from "../../domain/product";

@Component({
  selector: 'app-material-reciclable-carousel',
  templateUrl: './material-reciclable-question-carousel.component.html',
  styleUrls: ['./material-reciclable-question-carousel.component.scss']
})
export class MaterialReciclableQuestionCarouselComponent {

  products: Product[] = [];

  @Input() imageMaxHeight = "150px";

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '300px',
      numVisible: 3,
      numScroll: 1
    }
  ]


  constructor(private productService2: ProductService2,
  ) {}



  ngOnInit() {
    this.productService2.getRecycableProducts().then((products) => {
      this.products = products;
    });
  }

}
