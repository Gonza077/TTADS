import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: "full" },
  //--------------------Principal pages--------------------//
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  //{ path: 'profile', component: ProfileComponent,canActivate:[] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'orders', component: OrdersComponent,canActivate:[]},
  { path: 'users', component: UsersComponent, canActivate:[]},
   //--------------------Principal pages--------------------//
  //Default routes redirect home
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
