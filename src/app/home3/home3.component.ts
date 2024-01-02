import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ResponsiveService} from "../responsive/responsive.service";
import {ProductService2} from "../../service/productservice2";

@Component({
  selector: 'app-home3',
  templateUrl: './home3.component.html',
  styleUrls: ['./home3.component.scss']
})
export class Home3Component implements OnInit{
  logoAlcaldiaMaxHeightCalculated: number = 150;
  maxHeighCard: any;
  offsetHeight: any;
  clientHeight: any;
  windowInnerHeight: any;
  windowOuterHeight: any;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private responsiveService:ResponsiveService,
              private productService2: ProductService2,) {
  }

  ngOnInit(): void {
    this.setResponsiveElements()
  }

  private setResponsiveElements(){
    // this.responsiveService.setElementToScreenHeightCalculated(document.getElementById("cardScreenHeigth"));
    // this.maxHeighCard = this.responsiveService.getScreenHeightCalculated();
    // this.logoAlcaldiaMaxHeightCalculated = this.responsiveService.getMaxHeightByPercentageOfElement(0.3);
    // console.info("logoAlcaldiaMaxHeightCalculated: ", this.logoAlcaldiaMaxHeightCalculated);


    this.windowInnerHeight = window.innerHeight;
    this.windowOuterHeight = window.outerHeight;
    this.offsetHeight = document.getElementById('cardScreenHeigth').offsetHeight;
    this.clientHeight = document.getElementById('cardScreenHeigth').clientHeight;
    this.maxHeighCard = this.offsetHeight;
    // this.maxHeighCard = this.windowInnerHeight - 462;
    // this.logoAlcaldiaMaxHeightCalculated = Math.round(this.maxHeighCard * 0.3);

    if(this.offsetHeight < 100 || this.offsetHeight > window.innerHeight){
      this.logoAlcaldiaMaxHeightCalculated = Math.round((window.innerHeight * 0.3) - 8);
    }else{
      this.logoAlcaldiaMaxHeightCalculated = Math.round(this.maxHeighCard * 0.3);
    }

    console.warn("*** maxHeighCard: ", this.maxHeighCard);
    console.warn("*** logoAlcaldiaMaxHeightCalculated: ", this.logoAlcaldiaMaxHeightCalculated);
  }
}
