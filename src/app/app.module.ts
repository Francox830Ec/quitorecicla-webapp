import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {FormsModule} from "@angular/forms";

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
import {RouterModule} from '@angular/router';
import {CardModule} from "primeng/card";
import {AvatarModule} from "primeng/avatar";
import {PanelModule} from "primeng/panel";
import {HomeComponent} from './home/home.component';
import {RecycleComponent} from './recycle/recycle.component';
import { QuitoEpsCarouselComponent } from './quito-eps-carousel/quito-eps-carousel.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RecycleComponent,
    QuitoEpsCarouselComponent
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
    RouterModule.forRoot([{path: '', component: HomeComponent}]),
    CardModule,
    AvatarModule,
    PanelModule
  ],
  providers: [ProductService, ProductService2, PhotoService],
  bootstrap: [HomeComponent]
})
export class AppModule { }