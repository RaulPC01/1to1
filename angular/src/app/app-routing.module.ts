import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainCompradorComponent } from './components/logged/comprador/main-comprador/main-comprador.component';
import { ServicioComponent } from './components/logged/comprador/servicio/servicio.component';
import { ServiciosComponent } from './components/logged/comprador/servicios/servicios.component';
import { CrearServicioComponent } from './components/logged/proveedor/crear-servicio/crear-servicio.component';
import { ContratarServicioComponent } from './components/logged/comprador/contratar-servicio/contratar-servicio.component';
import { PerfilComponent } from './components/logged/perfil/perfil.component';
import { MainProveedorComponent } from './components/logged/proveedor/main-proveedor/main-proveedor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'proveedor', component: MainProveedorComponent},
  { path: 'contacto', component: ContactoComponent},
  { path: 'perfil', component: PerfilComponent},
  {path: 'tarjeta-servicio', component: ServicioComponent},
  {path: 'crear-servicio', component: CrearServicioComponent},
  { path: 'home-comprador', component: MainCompradorComponent},
  { path: 'servicio', component: ServicioComponent},
  { path: 'servicios', component: ServiciosComponent},
  { path: 'servicios', component: ServiciosComponent },
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
