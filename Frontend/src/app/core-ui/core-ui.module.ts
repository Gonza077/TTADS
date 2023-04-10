import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule, CarouselModule, CardModule } from '@coreui/angular';

const modulesUI =[
  CarouselModule,
  CardModule,
  AlertModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modulesUI
  ],
  exports:[
  ...modulesUI
  ]
})
export class CoreUIModule { }
