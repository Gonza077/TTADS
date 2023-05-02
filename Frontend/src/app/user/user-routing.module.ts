import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  //Los metodos canActivate hay que programarlos
  { path: 'users', component: UsersComponent, canActivate:[]},
  { path: 'profile', component: UserProfileComponent, canActivate:[]},
  { path: 'orders/:idUser', component: OrdersComponent, canActivate:[] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
