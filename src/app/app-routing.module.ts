import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterFormComponent} from "./register-form/register-form.component";
import {Home2Component} from "./home2/home2.component";
import {RecycleComponent} from "./recycle/recycle.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  // {path: 'home', component: Home2Component},
  {path: 'register-form', component: RegisterFormComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'recycle', component: RecycleComponent},
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
