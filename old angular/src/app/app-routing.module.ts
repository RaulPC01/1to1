import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrincipalComponent } from './principal/principal.component';
import { ServicioComponent } from './servicio/servicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CreacionServicioComponent } from './creacion-servicio/creacion-servicio.component';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
  
  { path: 'error', component: ErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'servicios/:id_servicios', component: ServicioComponent },
  { path: 'crear-servicio', component: CreacionServicioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'perfil', component: PerfilComponent },  {
    path: 'error',
    redirectTo: '/error',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/error',
    pathMatch: 'full'
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
