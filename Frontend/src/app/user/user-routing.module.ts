import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  //Los metodos canActivate hay que programarlos
  { path: 'users', component: UsersComponent, canActivate:[]},
  { path: 'login', component: LoginComponent},
  { path: 'orders', component: OrdersComponent, canActivate:[] },
  { path: 'profile', component: ProfileComponent, canActivate:[] },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
