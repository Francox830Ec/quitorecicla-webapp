import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {ButtonModule} from 'primeng/button';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";

import {GalleriaModule} from "primeng/galleria";
import {ProductService} from 'src/service/productservice';
import {ProductService2} from 'src/service/productservice2';
import {PhotoService} from 'src/service/photoservice';
import {TableModule} from "primeng/table";
import {RouterModule, Routes} from '@angular/router';
import {CardModule} from "primeng/card";
import {AvatarModule} from "primeng/avatar";
import {PanelModule} from "primeng/panel";
import {Home2Component} from './home2/home2.component';
import {RecycleComponent} from './recycle/recycle.component';
import {QuitoEpsCarouselComponent} from './quito-eps-carousel/quito-eps-carousel.component';
import {ImageModule} from "primeng/image";
import {CheckboxModule} from "primeng/checkbox";
import {RegisterFormComponent} from './register-form/register-form.component';
import {LoginComponent} from './login/login.component';
import {PasswordModule} from "primeng/password";
import {SidebarModule} from "primeng/sidebar";
import {OverlayModule} from "primeng/overlay";
import {DropdownModule} from "primeng/dropdown";
import {DividerModule} from "primeng/divider";
import {GoogleMapsModule} from "@angular/google-maps";
import {ToastModule} from "primeng/toast";
import {SplitterModule} from "primeng/splitter";
import {DialogModule} from "primeng/dialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SitioReciclajeLaDeliciaservice} from "../service/sitioreciclajeLaDeliciaservice";
import {SitioReciclajeEloyAlfaroService} from "../service/sitioreciclajeEloyAlfaroservice";
import {SitioReciclajeTumbacoservice} from "../service/sitioreciclajeTumbacoservice";
import {SitioReciclajeManuelitaSaenzservice} from "../service/sitioreciclajeManuelitaSaenzservice";
import {ToolbarModule} from "primeng/toolbar";
import {ScrollTopModule} from "primeng/scrolltop";
import {ListboxModule} from "primeng/listbox";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {InplaceModule} from "primeng/inplace";
import {TooltipModule} from 'primeng/tooltip';
import {SocialLoginComponent} from './social-login/social-login.component';
import {ResponsiveService} from './responsive/responsive.service';
import {RegisterComponent} from './register/register.component';
import {UserService} from "../service/user.service";
import {environment} from "../environments/environment";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { HomeComponent } from './home/home.component';
import { MaterialReciclableCarouselComponent } from './material-reciclable-carousel/material-reciclable-carousel.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register-form', component: RegisterFormComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recycle', component: RecycleComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    Home2Component,
    RecycleComponent,
    QuitoEpsCarouselComponent,
    RegisterFormComponent,
    LoginComponent,
    SocialLoginComponent,
    RegisterComponent,
    HomeComponent,
    MaterialReciclableCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    CarouselModule,
    TagModule,
    GalleriaModule,
    FormsModule,
    TableModule,
    RouterModule.forRoot(routes, {useHash: true}),
    CardModule,
    AvatarModule,
    PanelModule,
    ImageModule,
    ReactiveFormsModule,
    CheckboxModule,
    PasswordModule,
    SidebarModule,
    OverlayModule,
    DropdownModule,
    DividerModule,
    GoogleMapsModule,
    ToastModule,
    SplitterModule,
    DialogModule,
    ConfirmDialogModule,
    ToolbarModule,
    ScrollTopModule,
    ListboxModule,
    InputTextareaModule,
    CalendarModule,
    InplaceModule,
    TooltipModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    // AngularFireModule.initializeApp({
    //   apiKey: "AIzaSyDJ_eDBrLJttuFSdLMWPX-adwKUX6-JAHQ",
    //   authDomain: "quitorecicla-firebase-auth.firebaseapp.com",
    //   projectId: "quitorecicla-firebase-auth",
    //   storageBucket: "quitorecicla-firebase-auth.appspot.com",
    //   messagingSenderId: "538033766324",
    //   appId: "1:538033766324:web:f6c00149b7aa881acafce1"
    // }),

    // AngularFireModule

  ],
  providers: [ProductService, ProductService2, PhotoService, ConfirmationService, MessageService,
      SitioReciclajeLaDeliciaservice,
      SitioReciclajeEloyAlfaroService,
      SitioReciclajeTumbacoservice,
      SitioReciclajeManuelitaSaenzservice,
      ResponsiveService,
      UserService
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
