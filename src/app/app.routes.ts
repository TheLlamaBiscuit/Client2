import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './EmployeeData/ed.component';
import { DataComponent } from './MovieData/data.component';
import { TheaterComponent } from './TheaterData/td.component';
import { ConcessionsComponent } from './ConcessionData/cd.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: '**',
    component: LoginComponent
  }, {
    path: 'employee',
    component: EmployeeComponent
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
