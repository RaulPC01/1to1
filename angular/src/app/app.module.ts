import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CreacionServicioComponent } from './creacion-servicio/creacion-servicio.component';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { ServicesComponent } from './services/services.component';
import { ServicioComponent } from './servicio/servicio.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactoComponent,
    CreacionServicioComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    HeaderHomeComponent,
    LoginComponent,
    PerfilComponent,
    HomeComponent,
    RegistroComponent,
    ServicesComponent,
    ServicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
