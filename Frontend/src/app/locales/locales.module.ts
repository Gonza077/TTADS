import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalesRoutingModule } from './locales-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LocalsComponent } from './locals/locals.component';
import { ProductsComponent } from './products/products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { CoreUIModule } from '../core-ui/core-ui.module';
import { LocalItemComponent } from './local-item/local-item.component';
import { ComponentsModule } from '../components/components.module';
import { LocalEditComponent } from './local-edit/local-edit.component';
import { LocalDeleteComponent } from './local-delete/local-delete.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LocalsComponent,
    ProductsComponent,
    ProductItemComponent,
    LocalItemComponent,
    LocalEditComponent,
    LocalDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LocalesRoutingModule,
    AngularMaterialModule,
    CoreUIModule,
    ComponentsModule
  ]
})
export class LocalesModule { }
