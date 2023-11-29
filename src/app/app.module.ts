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
import {HomeComponent} from './home/home.component';
import {RecycleComponent} from './recycle/recycle.component';
import { QuitoEpsCarouselComponent } from './quito-eps-carousel/quito-eps-carousel.component';
import {ImageModule} from "primeng/image";
import {CheckboxModule} from "primeng/checkbox";
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginComponent } from './login/login.component';
import {PasswordModule} from "primeng/password";
import {SidebarModule} from "primeng/sidebar";
import {OverlayModule} from "primeng/overlay";
import {DropdownModule} from "primeng/dropdown";
import {DividerModule} from "primeng/divider";
import {GoogleMapsModule} from "@angular/google-maps";
import {ToastModule} from "primeng/toast";
import {SplitterModule} from "primeng/splitter";
import {DialogModule} from "primeng/dialog";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register-form', component: RegisterFormComponent},
  {path: 'recycle', component: RecycleComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecycleComponent,
    QuitoEpsCarouselComponent,
    RegisterFormComponent,
    LoginComponent
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
    DialogModule
  ],
  providers: [ProductService, ProductService2, PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
