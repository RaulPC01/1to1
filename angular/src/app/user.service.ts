import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // registra un nuevo usuario
  registerUser(formData: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/register', formData);
  }

  // obtiene el perfil del usuario usando el token
  obtenerPerfilUsuario(token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>('http://localhost:8000/api/perfil', { headers });
  }

  // obtiene el usuario relacionado con un servicio especifico
  getUserByServiceId(servicioId: string): Observable<any> {
    const url = `http://localhost:8000/api/services/${servicioId}/user`;
    return this.http.get<any>(url);
  }

  getMisPeticiones(userId: string): Observable<any> {
    
    return this.http.get<any>(`http://localhost:8000/api/mis-peticiones/${userId}`);
  }


}
