import {Component, OnInit} from '@angular/core';
import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {ResponsiveService} from "../responsive/responsive.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  screenWidth: any;
  screenHeight: any;
  offsetHeight:any;
  clientHeight: any;
  content:any;
  screenHeightCalculated: string = "400px";
  maxHeightCalculatedLogoAlcaldia: number = 300;
  maxHeightCalculatedLogoQuitoRecicla: number = 125;
  cardScreenHeigth: number;
  device:string;

  orientation = "";
  sizeInfoDevice = "";

  ngOnInit(): void {
    this.observeResponsive();
    this.getSizeScreen();
  }

  constructor(private responsiveService:ResponsiveService,
              private responsive: BreakpointObserver,
              ) {
  }

  private getSizeScreen(){
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;

    console.info(" this.screenWidth -> ", this.screenWidth);
    console.info(" this.screenHeight -> ", this.screenHeight);

    this.offsetHeight = document.documentElement.offsetHeight;
    this.clientHeight = document.documentElement.clientHeight;

    this.content = document.getElementById('content').offsetHeight;

    console.warn("screenHeight: ", this.screenHeight + ", offsetHeight: ", this.offsetHeight)

    // this.cardScreenHeigth = this.screenHeight - this.offsetHeight + 75;
    this.cardScreenHeigth = this.screenHeight - 32;
    // this.cardScreenHeigth = this.screenHeight - this.offsetHeight + 35;
    this.screenHeightCalculated = this.cardScreenHeigth + "px";
    // this.maxHeightCalculatedLogoAlcaldia = this.cardScreenHeigth  - 650 + "px"; //251px en Table Ipad
    // this.maxHeightCalculatedLogoAlcaldia = 300 + "px"; //Lo ideal en Ipad

    // console.warn("***** material-reciclable-carousel: : ", material);


    if(this.device == 'Handset'){
      console.warn("--- IS HANDSET ---")
      this.maxHeightCalculatedLogoAlcaldia = this.cardScreenHeigth  - 450;
      // this.maxHeightCalculatedLogoAlcaldia = 125;

      if(this.maxHeightCalculatedLogoAlcaldia <= 0){
        this.maxHeightCalculatedLogoAlcaldia = 90;
        this.maxHeightCalculatedLogoQuitoRecicla = 50;

      }else{
        this.maxHeightCalculatedLogoQuitoRecicla = this.cardScreenHeigth  - this.maxHeightCalculatedLogoAlcaldia - 375;
      }
      // this.maxHeightCalculatedLogoQuitoRecicla = 50;
    }




    console.warn("***** screenHeightCalculated (diferencia): ", this.screenHeightCalculated);
    console.warn("maxHeightCalculatedLogoAlcaldia: ", this.maxHeightCalculatedLogoAlcaldia);
    console.warn("maxHeightCalculatedLogoQuitoRecicla: ", this.maxHeightCalculatedLogoQuitoRecicla);

  }

  private observeResponsive(){

    this.responsive.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web,
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
        this.orientation = "";

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


        if (breakpoints[Breakpoints.Handset]) {
          // alert("screens matches TabletPortrait");
          console.warn("--- IS Handset");
          this.orientation = "35%";
        }
        else if (breakpoints[Breakpoints.Tablet]) {
          console.warn("--- IS Tablet");
          this.orientation = "35%";
        }
        else if (breakpoints[Breakpoints.Web]) {
          console.warn("--- IS Web");
          this.orientation = "75%";
        }

        if (breakpoints[Breakpoints.TabletPortrait]) {
          // alert("screens matches TabletPortrait");
          console.warn("--- orientation TabletPortrait");
          this.orientation = "35%";
          this.device = "Tablet"
;        }
        else if (breakpoints[Breakpoints.TabletLandscape]) {
          console.warn("--- orientation TabletLandscape");
          this.orientation = "35%";
          this.device = "Tablet"
        }
        else if (breakpoints[Breakpoints.HandsetPortrait]) {
          console.warn("--- orientation HandsetPortrait");
          this.orientation = "75%";
          this.device = "Handset"

        }
        else if (breakpoints[Breakpoints.HandsetLandscape ]) {
          console.warn("--- orientation HandsetLandscape");
          this.orientation = "75%";
          this.device = "Handset"
        }
        else if (breakpoints[Breakpoints.WebPortrait ]) {
          console.warn("--- orientation WebPortrait");
          this.orientation = "35%";
          this.device = "Web"
        }
        else if (breakpoints[Breakpoints.WebLandscape ]) {
          console.warn("--- orientation WebLandscape");
          this.orientation = "35%";
          this.device = "Web"
        }

        if (result.matches) {
          console.info("result: ", result)
        }else{
          alert ("no matches")
        }

        this.sizeInfoDevice = size + " - " + this.orientation;
      });
  }



}
