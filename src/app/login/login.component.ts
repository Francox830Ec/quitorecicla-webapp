import {Component, HostListener, Input, OnInit, Output} from '@angular/core';
import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ResponsiveService } from '../responsive/responsive.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";


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

  showRegisterForm = false;
  formReg: FormGroup

  sizeInfoDevice = "";
  dimensionsInfoDevice = "";
  minWidthSizeScreenMedium: number = 992;
  isMinWidthSizeScreenMedium = false;
  @Output() maxHeightCarouselImage = "275px";

  orientation = "";

  constructor(private responsive: BreakpointObserver,
              public responsiveService:ResponsiveService,
              private userService: UserService,
              private messageService: MessageService,
              private router: Router
  ) {

    console.info("responsive: ", responsive);
  }

  ngOnInit() {
    console.info("--- On Init");
    this.setForm();
    this.showRegisterForm = false;
    this.observeResponsive();
    this.getSizeScreen();
  }

  public setShowRegisterForm(data: any):void {
    // console.log('setShowRegisterForm : ', setShowRegisterForm);
    this.showRegisterForm = data;
  }

  onSubmit(){
    console.log("this.formReg.value:",  this.formReg.value);
    this.userService.login(this.formReg.value).then( response => {
        console.warn("userService response login: ", response);
      this.router.navigate(['/recycle']);
      }
    ).catch( error => {
      console.error(error)
      // alert (error.firebase.firebase.error)
      this.messageService.add({ severity: 'error', summary: 'Error de autenticación', detail: error, life: 5000 });
      }
    );
  }
  setForm(){
    this.formReg = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  private validateMinWidthSizeScreenMedium(){
    this.isMinWidthSizeScreenMedium = this.screenWidth >= this.minWidthSizeScreenMedium;

    // console.warn(" this.isMinWidthSizeScreenMedium  -> ", this.isMinWidthSizeScreenMedium );
    // console.warn(" this.screenHeight -> ", this.screenHeight);

    if (this.isMinWidthSizeScreenMedium ){
      // console.warn("*** isMinWidthSizeScreenMedium -> ", this.screenWidth);
      // console.warn("-------> Debe ocultar carrusel pequeño");
      // console.warn("*** maxHeightCarouselImage -> ", this.maxHeightCarouselImage);
    }else{
       // console.info("document.getElementById('formLogin').offsetHeight: ", document.getElementById('formLogin').offsetHeight);
      // this.maxHeightCarouselImage = (this.screenHeight - (document.getElementById('formLogin').offsetHeight + 166)) + "px";
      // this.maxHeightCarouselImage = (this.screenHeight - (document.getElementById('formLogin').offsetHeight + 200)) + "px";
      // this.maxHeightCarouselImage = (this.screenHeight - (document.getElementById('formLogin').offsetHeight + 250)).toString();
      // this.maxHeightCarouselImage = (this.screenHeight - (document.getElementById('formLogin').offsetHeight) + 166) + "px";
      // this.maxHeightCarouselImage = (this.screenHeight - (document.getElementById('formLogin').offsetHeight)) - 185 + "px";
      // let alturaFormLogin = document.getElementById('formLogin').offsetHeight;
      // let diferencia = this.screenHeight - alturaFormLogin - 330;
      // let diferencia = this.screenHeight - alturaFormLogin;

      // console.info(this.screenHeight + " ------- " + this.offsetHeight )
      let diferencia = this.screenHeight - this.offsetHeight;
      // let diferencia = this.screenHeight - alturaFormLogin - this.offsetHeight;


      // alert("screenHeight: " + this.screenHeight + ", alturaFormLogin: " + alturaFormLogin + ", diferencia: " +  diferencia);
      this.maxHeightCarouselImage = diferencia + "px";
      // console.warn("*** maxHeightCarouselImage -> ", this.maxHeightCarouselImage);

      // console.warn("sizeInfoDevice:", this.sizeInfoDevice);
      // console.warn("w: " + this.screenWidth + ' - h:' + this.screenHeight);
      // console.warn('-> wO:' + this.screenWidthOuter + ' - hO: ' + this.screenHeightOuter);
      //
      // console.warn('-> clientWidth:' + this.clientWidth + ' - offsetWidth: ' + this.offsetWidth);
      // console.warn('-> clientHeight:' + this.clientHeight + ' - offsetHeight: ' + this.offsetHeight);


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

        if (breakpoints[Breakpoints.TabletPortrait]) {
          // alert("screens matches TabletPortrait");
          this.orientation = "35%";
        }
        else if (breakpoints[Breakpoints.TabletLandscape]) {
          // alert("screens matches TabletLandscape");
          this.orientation = "35%";
        }
        else if (breakpoints[Breakpoints.HandsetPortrait]) {
          // alert("screens matches HandsetPortrait");
          this.orientation = "75%";
          console.warn("screens matches HandsetPortrait");
        }
        else if (breakpoints[Breakpoints.HandsetLandscape ]) {
          // alert("screens matches HandsetLandscape ");
          this.orientation = "75%";
        }
        else if (breakpoints[Breakpoints.WebPortrait ]) {
          // alert("screens matches WebPortrait ");

          this.orientation = "35%";
        }
        else if (breakpoints[Breakpoints.WebLandscape ]) {
          // alert("screens matches WebLandscape ");
          this.orientation = "35%";

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


