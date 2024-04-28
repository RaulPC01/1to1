import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<any>('http://localhost:8000/api/perfil', { headers }).subscribe(
      (data) => {
        console.log('Datos del perfil:', data);
        const dni = data.dni; // Obtener el dni del perfil
        this.obtenerSolicitudesUsuario(token, dni); // Llamada a la función obtenerSolicitudesUsuario con el DNI del usuario
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  obtenerSolicitudesUsuario(token: string, dni: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<any[]>('http://localhost:8000/api/solicitudes-usuario?dni=' + dni, { headers }).subscribe(
      (data) => {
        console.log('Solicitudes del usuario:', data);
        this.solicitudes = data; // Asignar las solicitudes devueltas a la variable local
      },
      (error) => {
        console.error('Error al obtener las solicitudes del usuario:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
}
