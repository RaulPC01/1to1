import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  servicios: any[] = []; // variable para almacenar los servicios del proveedor

  constructor(private http: HttpClient) { }

  // obtiene las categorias
  obtenerCategorias(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/categories');
  }

  // obtiene las poblaciones
  obtenerPoblaciones(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/poblaciones');
  }

  // crea un nuevo servicio
  crearServicio(servicioData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/crear-servicio', servicioData);
  }

  // obtiene los servicios mejor valorados
  obtenerTopServiciosValorados(): Observable<any[]> {
    return this.http.post<any[]>('http://localhost:8000/api/services/top-valorated', {});
  }

  // obtiene los servicios por categoria
  obtenerServiciosPorCategoria(categoryId: number): Observable<any[]> {
    const baseUrl = `http://localhost:8000/api/services/por-categroia/${categoryId}`;
    return this.http.get<any[]>(baseUrl);
  }

  // obtiene los detalles de un servicio
  obtenerDetalleServicio(id_servicios: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/services/${id_servicios}`);
  }

  // obtiene los comentarios de un servicio
  obtenerComentarios(id_servicios: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/servicios/${id_servicios}/comentarios`);
  }

  // envia un comentario
  enviarComentario(comentarioData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/resena', comentarioData);
  }

  // envia una solicitud de servicio
  enviarSolicitud(solicitudData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/crearSolicitud', solicitudData);
  }

  // obtiene los servicios de un proveedor por su id
  serviciosUsuario(idUsuarioProveedor: string): void {
    this.http.get<any[]>(`http://localhost:8000/api/serviciosUser/${idUsuarioProveedor}`).subscribe(
      (data) => {
        console.log('servicios del proveedor:', data);
        this.servicios = data; // asigna los servicios devueltos a la variable local
      },
      (error) => {
        console.error('error al obtener los servicios del proveedor:', error);
        // maneja el error adecuadamente, por ejemplo, muestra un mensaje al usuario
      }
    );
  }

  // busca servicios por termino de busqueda
  buscarServicios(terminoBusqueda: string): Observable<any[]> {
    let params = new HttpParams();
    if (terminoBusqueda) {
      params = params.set('terminoBusqueda', terminoBusqueda);
    }
    return this.http.get<any[]>(`http://localhost:8000/api/buscar-servicios`, { params: params });
  }
}
