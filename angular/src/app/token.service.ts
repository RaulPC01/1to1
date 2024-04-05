import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private usuarioAutenticado: boolean = false;
  private Idtoken: string = '';

  constructor(
    private http: HttpClient
  ) {
    this.cargarUsuarioAutenticado();
  }

  private cargarUsuarioAutenticado(): void {
    const idTokenAlmacenado = localStorage.getItem('Idtoken');
    if (idTokenAlmacenado) {
      this.usuarioAutenticado = true;
      this.Idtoken = idTokenAlmacenado;
    }
  }

  iniciarSesion(token: string): void {
    this.usuarioAutenticado = true;
    this.Idtoken = token;
    localStorage.setItem('Idtoken', token);
  }

  login(dni: string, password: string): Observable<string> {
    return this.http.post<string>('http://localhost:8000/api/login', { dni, password }).pipe(
      map((result: any) => {
        localStorage.setItem('Idtoken',  result.authToken);
        this.usuarioAutenticado = true;
        this.Idtoken = result.token;
        return result.token;
      })
    );
  }

  cerrarSesion(): void {
    this.usuarioAutenticado = false;
    this.Idtoken = '';
    localStorage.removeItem('dniUsuario');
  }

  estaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  obtenerTokenUsuario(): string | null {
    return this.Idtoken;
  }
}
