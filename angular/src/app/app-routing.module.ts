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
import { CrearservicoComponent } from './components/logged/proveedor/main-proveedor/crearservico/crearservico.component';
import { TiketsServiciosComponent } from './tikets-servicios/tikets-servicios.component';
import { MisServiviosComponent } from './mis-servivios/mis-servivios.component';
import { AuthGuard } from './guards/auth.guard'; // Importa el guardia AuthGuard


const routes: Routes = [

  { path: 'login', component: LoginComponent},

  { path: 'register', component: RegisterComponent},
  
  { path: 'contacto', component: ContactoComponent, canActivate: [AuthGuard] },

  { path: 'home-comprador', component: MainCompradorComponent },

  { path: 'perfil', component: PerfilComponent , canActivate: [AuthGuard] },  

  { path: 'servicios/:id_servicios', component: ServicioComponent },

  { path: 'contratar/:id_servicio', component: ContratarServicioComponent, canActivate: [AuthGuard]  },

  { path: 'crear-servicio', component: CrearservicoComponent , canActivate: [AuthGuard] },

  { path: 'solicitudes', component: TiketsServiciosComponent , canActivate: [AuthGuard] },

  { path: 'mis-servicios', component: MisServiviosComponent, canActivate: [AuthGuard]  },


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
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
