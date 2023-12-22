import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "src/service/user.service";
import {Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit{

  @Output() maxHeightCarouselImage = "275px";
  // @Output() showRegisterForm = false;

  @Output() showRegisterForm = new EventEmitter<boolean>();

  formReg2: FormGroup

  screenWidth: any;
  screenHeight: any;
  screenWidthOuter: any;
  screenHeightOuter: any;

  clientHeight:any;
  offsetHeight:any;
  offsetWidth:any;
  clientWidth:any

  minWidthSizeScreenMedium: number = 992;
  isMinWidthSizeScreenMedium = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private responsive: BreakpointObserver,
    private messageService: MessageService,
  ) {
    this.formReg2 = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  setSeleccionado(obj) {


  }

  setForm(){
    this.formReg2 = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit() {
    // this.observeResponsive();
    // this.getSizeScreen();
    this.setForm();

  }

  clickGoLogin() {
    this.showRegisterForm.emit(false);
    console.info("this.showRegisterForm.emit(false)");
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

  private validateMinWidthSizeScreenMedium(){
    this.isMinWidthSizeScreenMedium = this.screenWidth >= this.minWidthSizeScreenMedium;

    console.warn(" this.isMinWidthSizeScreenMedium  -> ", this.isMinWidthSizeScreenMedium );
    // console.warn(" this.screenHeight -> ", this.screenHeight);

    if (this.isMinWidthSizeScreenMedium ){
      console.warn("*** isMinWidthSizeScreenMedium -> ", this.screenWidth);
      console.warn("-------> Debe ocultar carrusel pequeño");
      console.warn("*** maxHeightCarouselImage -> ", this.maxHeightCarouselImage);
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

      console.info(this.screenHeight + " ------- " + this.offsetHeight )

      let diferencia = this.screenHeight - this.offsetHeight;

      // let diferencia = this.screenHeight - alturaFormLogin - this.offsetHeight;

      // alert("screenHeight: " + this.screenHeight + ", alturaFormLogin: " + alturaFormLogin + ", diferencia: " +  diferencia);
      this.maxHeightCarouselImage = diferencia + "px";
      console.warn("*** maxHeightCarouselImage -> ", this.maxHeightCarouselImage);

      // console.warn("sizeInfoDevice:", this.sizeInfoDevice);
      console.warn("w: " + this.screenWidth + ' - h:' + this.screenHeight);
      console.warn('-> wO:' + this.screenWidthOuter + ' - hO: ' + this.screenHeightOuter);

      console.warn('-> clientWidth:' + this.clientWidth + ' - offsetWidth: ' + this.offsetWidth);
      console.warn('-> clientHeight:' + this.clientHeight + ' - offsetHeight: ' + this.offsetHeight);

      return this.isMinWidthSizeScreenMedium ;
    }

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

      });
  }


  onSubmit(){
    console.log("this.formReg.value:",  this.formReg2.value);
    this.userService.register(this.formReg2.value).then(response => {
      this.messageService.add({ severity: 'success', summary: 'Registro exitoso', detail: "El registro del usuario se ha efectuado exitosamente", life: 5000 });
      this.clickGoLogin();
    }
    ).catch( error =>{
      console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error en el registro', detail: error, life: 5000 });
    }
    );
  }
}
