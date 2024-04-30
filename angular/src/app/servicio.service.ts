import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  servicios: any[] = []; // Variable para almacenar los servicios del proveedor

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/categories');
  }

  obtenerPoblaciones(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/poblaciones');
  }

  crearServicio(servicioData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/crear-servicio', servicioData);
  }

  obtenerTopServiciosValorados(): Observable<any[]> {
    return this.http.post<any[]>('http://localhost:8000/api/services/top-valorated', {});
  }

  obtenerServiciosPorCategoria(categoryId: number): Observable<any[]> {
    const baseUrl = `http://localhost:8000/api/services/por-categroia/${categoryId}`;
    return this.http.get<any[]>(baseUrl);
  }

  obtenerDetalleServicio(id_servicios: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/services/${id_servicios}`);
  }

  obtenerComentarios(id_servicios: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/servicios/${id_servicios}/comentarios`);
  }

  enviarComentario(comentarioData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/resena', comentarioData);
  }

  enviarSolicitud(solicitudData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/crearSolicitud', solicitudData);
  }

  serviciosUsuario(idUsuarioProveedor: string): void {
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
