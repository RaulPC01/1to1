import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mis-servivios',
  templateUrl: './mis-servivios.component.html',
  styleUrls: ['./mis-servivios.component.css']
})
export class MisServiviosComponent implements OnInit {

  constructor(private http: HttpClient) { }
  
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
    const headers = new HttpHeaders({ // Aquí se usa HttpHeaders
      'Authorization': `Bearer ${token}`
    });
    this.http.get<any>('http://localhost:8000/api/perfil', { headers }).subscribe(
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
    this.http.get<any[]>(`http://localhost:8000/api/serviciosUser/${idUsuarioProveedor}`).subscribe(
      (data) => {
        console.log('Servicios del proveedor:', data);
        this.servicios = data; // Asigna los servicios devueltos a la variable local
      },
      (error) => {
        console.error('Error al obtener los servicios del proveedor:', error);
        // Maneja el error adecuadamente, por ejemplo, muestra un mensaje al usuario
      }
    );
  }
}
