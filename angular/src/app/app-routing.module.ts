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
import { AuthGuard } from './guards/auth.guard'; // importa el guardia authguard

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // ruta para el componente de login
  { path: 'register', component: RegisterComponent }, // ruta para el componente de registro
  { path: 'contacto', component: ContactoComponent, canActivate: [AuthGuard] }, // ruta para el componente de contacto, protegida por authguard
  { path: 'home-comprador', component: MainCompradorComponent }, // ruta para el componente principal del comprador
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] }, // ruta para el componente de perfil, protegida por authguard
  { path: 'servicios/:id_servicios', component: ServicioComponent }, // ruta para el componente de servicio
  { path: 'contratar/:id_servicio', component: ContratarServicioComponent, canActivate: [AuthGuard] }, // ruta para contratar servicio, protegida por authguard
  { path: 'crear-servicio', component: CrearservicoComponent, canActivate: [AuthGuard] }, // ruta para crear servicio, protegida por authguard
  { path: 'solicitudes', component: TiketsServiciosComponent, canActivate: [AuthGuard] }, // ruta para el componente de tickets de servicios, protegida por authguard
  { path: 'mis-servicios', component: MisServiviosComponent, canActivate: [AuthGuard] }, // ruta para el componente de mis servicios, protegida por authguard
  { path: 'home', component: HomeComponent }, // ruta para el componente de home
  { path: '', redirectTo: 'home-comprador', pathMatch: 'full' }, // redirige a home-comprador por defecto
  { path: 'error', component: ErrorComponent }, // ruta para el componente de error
  { path: '**', redirectTo: 'error', pathMatch: 'full' } // redirige a error para cualquier ruta no definida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard], // provee el guardia authguard
})
export class AppRoutingModule { }
