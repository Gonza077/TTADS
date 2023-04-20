//---------------------MODULOS---------------------//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CoreUIModule } from '../core-ui/core-ui.module';
//---------------------MODULOS---------------------//
//---------------------COMPONENTES---------------------//
import { CarrouselComponent } from './carrousel/carrousel.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';
//---------------------COMPONENTES---------------------//

const components=[
  CardComponent,
  CarrouselComponent,
  GoogleMapComponent,
  FooterComponent,
  NavbarComponent,
]

@NgModule({
  declarations: [
    ...components,

  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    CoreUIModule,
    RouterModule,
  ],
  exports:[
    ...components
  ]
})
export class ComponentsModule { }
