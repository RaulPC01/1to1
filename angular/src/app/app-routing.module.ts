import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainCompradorComponent } from './components/logged/comprador/main-comprador/main-comprador.component';
import { ServicioComponent } from './components/logged/comprador/servicio/servicio.component';
import { ContratarServicioComponent } from './components/logged/comprador/contratar-servicio/contratar-servicio.component';
import { PerfilComponent } from './components/logged/perfil/perfil.component';
import { MainProveedorComponent } from './components/logged/proveedor/main-proveedor/main-proveedor.component';
import { CrearServicioComponent } from './components/logged/proveedor/crear-servicio/crear-servicio.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent},

  { path: 'register', component: RegisterComponent},
  
  { path: 'contacto', component: ContactoComponent},

  { path: 'home-comprador', component: MainCompradorComponent},

  { path: 'perfil', component: PerfilComponent },  

  { path: 'servicios/:id_servicios', component: ServicioComponent },

  { path: 'servicio', component: ServicioComponent},

  { path: 'contratar/:id', component: ContratarServicioComponent },
  
  { path: 'crear-servicio', component: CrearServicioComponent },

  // =====================================================
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home-comprador',
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
