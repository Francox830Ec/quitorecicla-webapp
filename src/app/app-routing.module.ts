import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterFormComponent} from "./register-form/register-form.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register-form', component: RegisterFormComponent},
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
