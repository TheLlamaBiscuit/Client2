import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { ToastModule } from './toast/toast.module';
import { LoginComponent } from './login/login.component';

import { AppRoutes } from './app.routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { SharedServiceModule } from '../shared-service/shared-service.module';
import { EmployeeComponent } from './EmployeeData/ed.component';
import { DataComponent } from './MovieData/data.component';
import { TheaterComponent } from './TheaterData/td.component';
import { ConcessionsComponent } from './ConcessionData/cd.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'employee', component: EmployeeComponent},
  { path: 'movie', component: DataComponent},
  { path: 'theater', component: TheaterComponent},
  { path: 'concessions', component: ConcessionsComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    HomeComponent,
    CartComponent,
    EmployeeComponent,
    DataComponent,
    TheaterComponent,
    ConcessionsComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes ,
      { enableTracing: true}
    ),
    BrowserModule,
    FormsModule,
    ToastModule,
    AppRoutes,
    BrowserAnimationsModule,
    MaterialDesignModule,
    SharedServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
