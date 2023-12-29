import {Component, OnInit} from '@angular/core';
import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {ResponsiveService} from "../responsive/responsive.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  content:any;
  screenHeightCalculated: string = "400px";
  maxHeightCalculatedLogoAlcaldia: number = 300;
  maxHeightCalculatedLogoQuitoRecicla: number = 125;
  device:string;
  orientation = "";
  sizeInfoDevice = "";

  ngOnInit(): void {
    this.observeResponsive();
    this.setResponsiveScreen();
  }

  constructor(private responsiveService:ResponsiveService,
              private responsive: BreakpointObserver,
              ) {
  }

  private setResponsiveScreen(){
    let screenHeightCalculated = this.responsiveService.getScreenHeightCalculated();
    this.screenHeightCalculated = screenHeightCalculated + 'px';
    this.content = document.getElementById('content').offsetHeight;

    if(this.responsiveService.deviceType == 'Handset'){
      this.maxHeightCalculatedLogoAlcaldia = screenHeightCalculated  - 450;
      if(this.maxHeightCalculatedLogoAlcaldia <= 0){
        this.maxHeightCalculatedLogoAlcaldia = 90;
        this.maxHeightCalculatedLogoQuitoRecicla = 50;
      }else{
        this.maxHeightCalculatedLogoQuitoRecicla = screenHeightCalculated - this.maxHeightCalculatedLogoAlcaldia - 375;
      }
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
