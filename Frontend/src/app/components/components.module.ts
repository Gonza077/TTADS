//---------------------MODULOS---------------------//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalesRoutingModule } from '../locales/locales-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { CoreUIModule } from '../core-ui/core-ui.module';
//---------------------MODULOS---------------------//
//---------------------COMPONENTES---------------------//
import { CarrouselComponent } from './carrousel/carrousel.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardComponent } from './card/card.component';
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
    LocalesRoutingModule,
    CoreUIModule
  ],
  exports:[
    ...components
  ]
})
export class ComponentsModule { }
