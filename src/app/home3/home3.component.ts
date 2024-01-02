import {Component, OnInit} from '@angular/core';
import {ResponsiveService} from "../responsive/responsive.service";

@Component({
  selector: 'app-home3',
  templateUrl: './home3.component.html',
  styleUrls: ['./home3.component.scss']
})
export class Home3Component implements OnInit{
  logoAlcaldiaMaxHeightCalculated: number = 150;
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

  }
}
