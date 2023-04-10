import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalesRoutingModule } from './locales-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LocalsComponent } from './locals/locals.component';
import { ProductsComponent } from './products/products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CoreUIModule } from '../core-ui/core-ui.module';
import { LocalItemComponent } from './local-item/local-item.component';

@NgModule({
  declarations: [
    LocalsComponent,
    ProductsComponent,
    ProductItemComponent,
    LocalItemComponent
  ],
  imports: [
    CommonModule,
    LocalesRoutingModule,
    AngularMaterialModule,
    CoreUIModule
  ]
})
export class LocalesModule { }
