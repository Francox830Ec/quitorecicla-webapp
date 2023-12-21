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
  screenWidthOuter: any;
  screenHeightOuter: any;

  clientHeight:any;
  offsetHeight:any;
  offsetWidth:any;
  clientWidth:any

  sizeInfoDevice = "";
  dimensionsInfoDevice = "";
  minWidthSizeScreenMedium: number = 992;
  isMinWidthSizeScreenMedium = false;
  @Output() maxHeightCarouselImage = "275px";

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
      // this.maxHeightCarouselImage = (this.screenHeight - (document.getElementById('formLogin').offsetHeight + 200)) + "px";
      // this.maxHeightCarouselImage = (this.screenHeight - (document.getElementById('formLogin').offsetHeight + 250)).toString();
      // this.maxHeightCarouselImage = (this.screenHeight - (document.getElementById('formLogin').offsetHeight) + 166) + "px";
      // this.maxHeightCarouselImage = (this.screenHeight - (document.getElementById('formLogin').offsetHeight)) - 185 + "px";

      let alturaFormLogin = document.getElementById('formLogin').offsetHeight;
      let diferencia = this.screenHeight - alturaFormLogin - 500;
      // alert("screenHeight: " + this.screenHeight + ", alturaFormLogin: " + alturaFormLogin + ", diferencia: " +  diferencia);
      this.maxHeightCarouselImage = diferencia + "px";
      console.warn("*** maxHeightCarouselImage -> ", this.maxHeightCarouselImage);
    }

    return this.isMinWidthSizeScreenMedium ;
  }


  private getSizeScreen(){
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.screenWidthOuter = window.outerWidth;
    this.screenHeightOuter = window.outerHeight;

    console.info(" this.screenWidth -> ", this.screenWidth);
    console.info(" this.screenHeight -> ", this.screenHeight);

    this.clientHeight = document.documentElement.clientHeight;
    this.offsetHeight = document.documentElement.offsetHeight;

    this.offsetWidth = document.documentElement.offsetWidth;
    this.clientWidth = document.documentElement.clientWidth

    this.validateMinWidthSizeScreenMedium();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.screenWidthOuter = window.outerWidth;
    this.screenHeightOuter = window.outerHeight;
    // this.validateMinWidthSizeScreenMedium();
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

        var size = "";
        var orientation = "";

        if (breakpoints[Breakpoints.Medium]) {
          console.warn("--- screens size Medium");
          size = "Medium";
        }
        else if (breakpoints[Breakpoints.Large ]) {
          console.warn("--- screens size Large");
          size = "Large";
        }
        else if (breakpoints[Breakpoints.XLarge ]) {
          console.warn("--- screens size XLarge");
          size = "XLarge";
        }else if (breakpoints[Breakpoints.XSmall]) {
          console.warn("--- screens size XSmall");
          size = "XSmall";
        }
        else if (breakpoints[Breakpoints.Small]) {
          console.warn("--- screens size Small");
          size = "Small";
        }

        if (breakpoints[Breakpoints.TabletPortrait]) {
          // alert("screens matches TabletPortrait");
          orientation = "TabletPortrait";
        }
        else if (breakpoints[Breakpoints.TabletLandscape]) {
          // alert("screens matches TabletLandscape");
          orientation = "TabletLandscape";
        }
        else if (breakpoints[Breakpoints.HandsetPortrait]) {
          // alert("screens matches HandsetPortrait");
          orientation = "HandsetPortrait";
        }
        else if (breakpoints[Breakpoints.HandsetLandscape ]) {
          // alert("screens matches HandsetLandscape ");
          orientation = "HandsetLandscape";
        }
        else if (breakpoints[Breakpoints.WebPortrait ]) {
          // alert("screens matches WebPortrait ");
          orientation = "WebPortrait";
        }
        else if (breakpoints[Breakpoints.WebLandscape ]) {
          // alert("screens matches WebLandscape ");
          orientation = "WebLandscape";
        }

        if (result.matches) {
          console.info("result: ", result)
        }else{
          alert ("no matches")
        }

        this.sizeInfoDevice = size + " - " + orientation;
      });
  }
}


