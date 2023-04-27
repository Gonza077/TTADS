import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  //Los metodos canActivate hay que programarlos
  { path: 'users', component: UsersComponent, canActivate:[]},
  { path: 'orders', component: OrdersComponent, canActivate:[] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
