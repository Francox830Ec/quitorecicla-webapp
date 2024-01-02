import {Component, Input, OnInit, Output} from '@angular/core';
import {ResponsiveService} from "../responsive/responsive.service";

@Component({
  selector: 'app-home3',
  templateUrl: './home3.component.html',
  styleUrls: ['./home3.component.scss']
})
export class Home3Component implements OnInit{
  logoAlcaldiaMaxHeightCalculated: number = 150;
  @Output() numVisibleItemsRecyclables: number = 2;
  @Output() marginBottomQuitoRecicla: number = -3.3;
  @Output() widthHeightQuitoRecicla: number = 6;
  @Output() widthMainColumn: number = 12;

  @Output() marginTopBorderTop: number = 8;
  @Output() textSizeTitleCarousel: string = "xl";

  @Output() marginTopButtonQuieroReciclar: number = 6;
  @Output() sizeButtonQuieroReciclar: string = "large";

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

  constructor(private responsiveService:ResponsiveService) {
  }

  ngOnInit(): void {
    this.setResponsiveElements()
  }

  private setResponsiveElements(){
      let element = document.getElementById("cardScreenHeigth") as HTMLElement;
      console.warn("getScreenHeightCalculated: ", this.responsiveService.getScreenHeightCalculated());
      this.logoAlcaldiaMaxHeightCalculated = this.responsiveService.getHeightCalculatedOfElement(element, 0.3)

      console.warn("*** logoAlcaldiaMaxHeightCalculated: ", this.logoAlcaldiaMaxHeightCalculated);
      console.warn("**** this.responsiveService.screenSize: ", this.responsiveService.screenSize);
      console.warn("**** this.responsiveService.deviceType: ", this.responsiveService.deviceType);

      if(this.responsiveService.screenSize == 'XSmall' && this.responsiveService.deviceType == 'Handset'
        && this.responsiveService.getScreenHeightCalculated() < 600
      ){//Must to less margin between elements
        this.marginTopBorderTop = 7;
        this.textSizeTitleCarousel = "md";
        this.marginTopButtonQuieroReciclar = 0;
        this.sizeButtonQuieroReciclar = "small";
        console.warn("size xsmall to Iphone5 & more less");
      }else if(this.responsiveService.deviceType == 'Tablet' || this.responsiveService.deviceType == 'Web'){
        this.numVisibleItemsRecyclables = 4;
        this.marginBottomQuitoRecicla = -3.3;
        this.logoAlcaldiaMaxHeightCalculated = 200;
        this.widthHeightQuitoRecicla = 8;
        this.widthMainColumn = this.responsiveService.deviceType == 'Tablet' ? 10 : 4
      }
  }
}
