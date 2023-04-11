//----------------MODULOS----------------//
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CoreUIModule } from './core-ui/core-ui.module';
import { HttpClientModule } from '@angular/common/http';
import { LocalesRoutingModule } from './locales/locales-routing.module';
import { LocalesModule } from './locales/locales.module';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//----------------MODULOS----------------//

//----------------COMPONENTS----------------//
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './users/users.component';
//----------------COMPONENTS----------------//

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    OrdersComponent,
    UsersComponent,
    //Componentes de modulo aparte
    // NavbarComponent,
    // FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularMaterialModule,
    CoreUIModule,
    ReactiveFormsModule,
    ComponentsModule,
    LocalesModule,
    ToastrModule.forRoot(),
    //Routing desde aca
    LocalesRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
