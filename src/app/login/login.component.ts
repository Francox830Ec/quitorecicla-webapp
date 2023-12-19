import {Component, HostListener, Input, OnInit, Output} from '@angular/core';
import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ResponsiveService } from '../responsive/responsive.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  modalSocialLogin = false;
  screenWidth: any;
  screenHeight: any;
  minWidthSizeScreenMedium: number = 992;
  isMinWidthSizeScreenMedium = false;
  @Output() maxHeightCarouselImage = "max-content";

  constructor(private responsive: BreakpointObserver,
              public responsiveService:ResponsiveService) {

    console.info("responsive: ", responsive);
  }

  ngOnInit() {
    console.info("On Init");
    this.observeResponsive();
    this.getSizeScreen();
  }

  private validateMinWidthSizeScreenMedium(){
    this.isMinWidthSizeScreenMedium = this.screenWidth >= this.minWidthSizeScreenMedium;

    console.warn(" this.isMinWidthSizeScreenMedium  -> ", this.isMinWidthSizeScreenMedium );
    // console.warn(" this.screenHeight -> ", this.screenHeight);

    if (this.isMinWidthSizeScreenMedium ){
      console.warn("*** isMinWidthSizeScreenMedium -> ", this.screenWidth);
      console.warn("-------> Debe ocultar carrusel pequeño");
      console.warn("*** maxHeightCarouselImage -> ", this.maxHeightCarouselImage);
    }else{
      console.info("document.getElementById('formLogin').offsetHeight: ", document.getElementById('formLogin').offsetHeight);
      // this.maxHeightCarouselImage = (this.screenHeight - (document.getElementById('formLogin').offsetHeight + 166)) + "px";
      this.maxHeightCarouselImage = (this.screenHeight - (document.getElementById('formLogin').offsetHeight + 166)).toString();
      console.warn("*** maxHeightCarouselImage -> ", this.maxHeightCarouselImage);
    }

    return this.isMinWidthSizeScreenMedium ;
  }

  private getSizeScreen(){
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    console.info(" this.screenWidth -> ", this.screenWidth);
    console.info(" this.screenHeight -> ", this.screenHeight);

    this.validateMinWidthSizeScreenMedium();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.validateMinWidthSizeScreenMedium();
  }

  private observeResponsive(){
    this.responsive.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape ,
      Breakpoints.TabletPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,

      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
      .subscribe(result => {

        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.XSmall]) {
          console.warn("--- screens size XSmall");
        }
        else if (breakpoints[Breakpoints.Small]) {
          console.warn("--- screens size Small");
        }
        else if (breakpoints[Breakpoints.Medium]) {
          console.warn("--- screens size Medium");
        }
        else if (breakpoints[Breakpoints.Large ]) {
          console.warn("--- screens size Large");
        }
        else if (breakpoints[Breakpoints.XLarge ]) {
          console.warn("--- screens size XLarge");
        }

        // if (breakpoints[Breakpoints.TabletPortrait]) {
        //   console.warn("screens matches TabletPortrait");
        // }
        // else if (breakpoints[Breakpoints.TabletLandscape]) {
        //   console.warn("screens matches TabletLandscape");
        // }
        // else if (breakpoints[Breakpoints.HandsetPortrait]) {
        //   console.warn("screens matches HandsetPortrait");
        // }
        // else if (breakpoints[Breakpoints.HandsetLandscape ]) {
        //   console.warn("screens matches HandsetLandscape ");
        // }
        // else if (breakpoints[Breakpoints.WebPortrait ]) {
        //   console.warn("screens matches WebPortrait ");
        // }
        // else if (breakpoints[Breakpoints.WebLandscape ]) {
        //   console.warn("screens matches WebLandscape ");
        // }

        // if (result.matches) {
        //   console.info("result: ", result)
        // }

      });
  }
}


