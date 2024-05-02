// En user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  obtenerPerfilUsuario(token: string): Observable<any> {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.get<any>('http://localhost:8000/api/user/profile', { headers });
  }

  getUserByServiceId(servicioId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/user/service/${servicioId}`);
  }
}
