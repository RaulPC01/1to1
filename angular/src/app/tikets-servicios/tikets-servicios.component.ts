import { HttpClient, HttpHeaders } from '@angular/common/http'; // Agregar esta línea

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tikets-servicios',
  templateUrl: './tikets-servicios.component.html',
  styleUrls: ['./tikets-servicios.component.css']
})
export class TiketsServiciosComponent implements OnInit {


  solicitudes: any[] = [];
  solicitudesAcceptadas: any[] = [];
  solicitudesPorAcceptar: any[] = [];
  loading: boolean = false;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loading = true; 

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
        this.obtenerSolicitudesFalse(data.dni);
        this.obtenerSolicitudesTrue(data.dni);
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
        console.log('id User Proveedor:',id_user_proveedor);

        console.log('Solicitudes del proveedor Todas:', data);
        this.solicitudes = data; // Asignar las solicitudes devueltas a la variable local
      },
      (error) => {
        console.error('Error al obtener las solicitudes del proveedor:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  obtenerSolicitudesFalse(id_user_proveedor: string): void {
    this.http.get<any[]>('http://localhost:8000/api/por-acceptar/' + id_user_proveedor).subscribe(
      (data) => {
        console.log('id User Proveedor:',id_user_proveedor);

        console.log('Solicitudes del proveedor False:', data);
        this.solicitudesPorAcceptar = data; // Asignar las solicitudes devueltas a la variable local
      },
      (error) => {
        console.error('Error al obtener las solicitudes del proveedor:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  obtenerSolicitudesTrue(id_user_proveedor: string): void {
    this.http.get<any[]>('http://localhost:8000/api/solicitudes-aceptadas/' + id_user_proveedor).subscribe(
      (data) => {
        console.log('id User Proveedor:',id_user_proveedor);

        console.log('Solicitudes del proveedor True:', data);
        this.solicitudesAcceptadas = data; // Asignar las solicitudes devueltas a la variable local
        this.loading = false; 

      },
      (error) => {
        console.error('Error al obtener las solicitudes del proveedor:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  aceptarSolicitud(solicitud: any): void {
    // Verificar si la solicitud ya está aceptada
    if (solicitud.accepted) {
      console.log('La solicitud ya ha sido aceptada anteriormente.');
      return;
    }
  
    // Realizar la solicitud PUT para aceptar la solicitud
    const url = `http://localhost:8000/api/solicitudes/${solicitud.id}/aceptar`;
    this.http.put(url, {}).subscribe(
      (response) => {
        console.log('La solicitud ha sido aceptada exitosamente:', response);
        // Actualizar la lista de solicitudes por aceptar si es necesario
        // Por ejemplo, si deseas eliminar la solicitud aceptada de la lista
        this.solicitudesPorAcceptar = this.solicitudesPorAcceptar.filter(s => s.id !== solicitud.id);
        window.location.reload();

      },
      (error) => {
        console.error('Error al aceptar la solicitud:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  rechazarSolicitud(solicitud: any): void {
    // Realizar la solicitud DELETE para rechazar la solicitud
    const url = `http://localhost:8000/api/solicitudes/${solicitud.id}/rechazar`;
    this.http.delete(url).subscribe(
      (response) => {
        console.log('La solicitud ha sido rechazada exitosamente:', response);
        // Actualizar la lista de solicitudes por aceptar si es necesario
        // Por ejemplo, si deseas eliminar la solicitud rechazada de la lista
        this.solicitudesPorAcceptar = this.solicitudesPorAcceptar.filter(s => s.id !== solicitud.id);
        window.location.reload();

      },
      (error) => {
        console.error('Error al rechazar la solicitud:', error);
        // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
  
}