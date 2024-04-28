import { HttpClient, HttpHeaders } from '@angular/common/http'; // Agregar esta línea

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tikets-servicios',
  templateUrl: './tikets-servicios.component.html',
  styleUrls: ['./tikets-servicios.component.css']
})
export class TiketsServiciosComponent implements OnInit {
  solicitudes: any[] = [];

  constructor(private http: HttpClient) { }

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
        this.obtenerSolicitudesProveedor(data.dni);
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  obtenerSolicitudesProveedor(id_user_proveedor: string): void {
    this.http.get<any[]>('http://localhost:8000/api/solicitudes/' + id_user_proveedor).subscribe(
      (data) => {
        console.log('Solicitudes del proveedor:', data);
        this.solicitudes = data; // Asignar las solicitudes devueltas a la variable local
      },
      (error) => {
        console.error('Error al obtener las solicitudes del proveedor:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
}
