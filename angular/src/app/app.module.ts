import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/logged/perfil/perfil.component';
import { MainProveedorComponent } from './components/logged/proveedor/main-proveedor/main-proveedor.component';
import { MainCompradorComponent } from './components/logged/comprador/main-comprador/main-comprador.component';
import { ServicioComponent } from './components/logged/comprador/servicio/servicio.component';

import { HeaderLoggedComponent } from './components/header-logged/header-logged.component';
import { ContratarServicioComponent } from './components/logged/comprador/contratar-servicio/contratar-servicio.component';
import { CommonModule } from '@angular/common';
import { CrearservicoComponent } from './components/logged/proveedor/main-proveedor/crearservico/crearservico.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TiketsServiciosComponent } from './tikets-servicios/tikets-servicios.component';
import { MisServiviosComponent } from './mis-servivios/mis-servivios.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AvisoLegalComponent } from './aviso-legal/aviso-legal.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';
import { PoliticaCokkiesComponent } from './politica-cokkies/politica-cokkies.component';

// Función para cargar archivos de traducción desde el servidor
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    ContactoComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PerfilComponent,
    MainProveedorComponent,
    MainCompradorComponent,
    ServicioComponent,
    HeaderLoggedComponent,
    CrearservicoComponent,
    ContratarServicioComponent,
    TiketsServiciosComponent,
    MisServiviosComponent,
    AvisoLegalComponent,
    PoliticaPrivacidadComponent,
    PoliticaCokkiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }