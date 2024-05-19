import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UserService {
 
  constructor(private http: HttpClient) { }

  registerUser(formData: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/register', formData);
  }

  obtenerPerfilUsuario(token: string) {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>('http://localhost:8000/api/perfil', { headers });
  }
  
  getUserByServiceId(servicioId: string): Observable<any> {
    const url = `http://localhost:8000/api/services/${servicioId}/user`;
    return this.http.get<any>(url);
  }

  getMisPeticiones(userId: string): Observable<any> {
    
    return this.http.get<any>(`http://localhost:8000/api/mis-peticiones/${userId}`);
  }

  updateUserProfile(userId: string, formData: any): Observable<any> {
    const url = `http://localhost:8000/api/users/${userId}`;
    return this.http.put<any>(url, formData.value); // Use formData.value instead of formData
  }
}
