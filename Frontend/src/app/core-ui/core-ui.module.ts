import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from '@coreui/angular';

const modulesUI =[
  CarouselModule,
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
