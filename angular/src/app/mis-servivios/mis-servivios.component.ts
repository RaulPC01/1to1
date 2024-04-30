import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/servicio.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mis-servivios',
  templateUrl: './mis-servivios.component.html',
  styleUrls: ['./mis-servivios.component.css']
})
export class MisServiviosComponent implements OnInit {

  constructor(private servicioService: ServicioService , private userService: UserService) { // Corrección aquí
    
  }
  
  servicios: any[] = [];

  ngOnInit(): void {
    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('El token no está definido en el almacenamiento local');
      // Manejar el error, por ejemplo, redirigir al usuario a la página de inicio de sesión
    }
  }

  obtenerPerfilUsuario(token: string): void {
    this.userService.obtenerPerfilUsuario(token).subscribe(
      (data) => {
        console.log('Datos del perfil:', data);
        // Llamada a la función obtenerSolicitudesProveedor con el ID del usuario proveedor
        this.serviciosUsuario(data.dni);
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  serviciosUsuario(idUsuarioProveedor:string){
    this.servicioService.serviciosUsuario(idUsuarioProveedor);
    this.servicios = this.servicioService.servicios; // Asigna los servicios devueltos a la variable local
  }
}
