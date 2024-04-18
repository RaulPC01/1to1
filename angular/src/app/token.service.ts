import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiUrl = 'http://localhost:8000/api'; // URL de tu API en Laravel
  private usuarioAutenticadoSubject = new BehaviorSubject<boolean>(false);
  usuarioAutenticado$ = this.usuarioAutenticadoSubject.asObservable();

  private usuarioAutenticado: boolean = false;
  private Idtoken: string = '';

  constructor(private http: HttpClient) {
    this.cargarUsuarioAutenticado();
  }

  private cargarUsuarioAutenticado(): void {
    const idTokenAlmacenado = localStorage.getItem('Idtoken');
    if (idTokenAlmacenado) {
      this.usuarioAutenticado = true;
      this.Idtoken = idTokenAlmacenado;
      this.usuarioAutenticadoSubject.next(true);
    }
  }

  iniciarSesion(token: string): void {
    this.usuarioAutenticado = true;
    this.Idtoken = token;
    localStorage.setItem('Idtoken', token);
    this.usuarioAutenticadoSubject.next(true);
  }

  login(dni: string, password: string): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/login`, { dni, password }).pipe(
      map(result => {
        localStorage.setItem('Idtoken', result.authToken);
        this.usuarioAutenticado = true;
        this.Idtoken = result.token;
        this.usuarioAutenticadoSubject.next(true);
        return result.token;
      })
    );
  }

  cerrarSesion(): void {
    this.usuarioAutenticado = false;
    this.Idtoken = '';
    localStorage.removeItem('Idtoken');
    this.usuarioAutenticadoSubject.next(false);
  }

  estaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  obtenerTokenUsuario(): string | null {
    return this.Idtoken;
  }
}
