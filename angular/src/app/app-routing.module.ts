import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainCompradorComponent } from './components/logged/comprador/main-comprador/main-comprador.component';
import { ServicioComponent } from './components/logged/comprador/servicio/servicio.component';

import { ServiciosComponent } from './components/logged/comprador/servicios/servicios.component';
import { ContratarServicioComponent } from './components/logged/comprador/contratar-servicio/contratar-servicio.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  
  { path: 'contacto', component: ContactoComponent},

  { path: 'home-comprador', component: MainCompradorComponent},
  { path: 'servicios/:id_servicios', component: ServicioComponent },
  
  { path: 'servicio', component: ServicioComponent},
  { path: 'servicios', component: ServiciosComponent},
  { path: 'contratar-servicio', component: ContratarServicioComponent},


  // =====================================================
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // =====================================================
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
