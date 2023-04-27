import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalsComponent } from './locals/locals.component';

const routes: Routes = [
  { path: 'locals', component: LocalsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalesRoutingModule { }
