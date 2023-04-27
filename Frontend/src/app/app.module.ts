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
import { LocalesModule } from './locales/locales.module';
import { ComponentsModule } from './components/components.module';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//----------------MODULOS----------------//

//----------------COMPONENTS----------------//
import { HomeComponent } from './home/home.component';
//----------------COMPONENTS----------------//

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularMaterialModule,
    CoreUIModule,
    ReactiveFormsModule,
    ComponentsModule,
    LocalesModule,
    UserModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
