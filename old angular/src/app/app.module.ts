import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { AuthService } from './services/auth.service'; // Importa el servicio de autenticación
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrincipalComponent } from './principal/principal.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderHomeComponent } from './header-home/header-home.component';
import { ServicioComponent } from './servicio/servicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreacionServicioComponent } from './creacion-servicio/creacion-servicio.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PrincipalComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    HeaderHomeComponent,
    ServicioComponent,
    PerfilComponent,
    CreacionServicioComponent
  
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    AuthService // Agrega AuthService como un proveedor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
