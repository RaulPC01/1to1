import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiUrl = 'http://localhost:8000/api'; // url de tu api en laravel
  private usuarioAutenticadoSubject = new BehaviorSubject<boolean>(false);
  usuarioAutenticado$ = this.usuarioAutenticadoSubject.asObservable();

  private usuarioAutenticado: boolean = false;
  private Idtoken: string = '';

  constructor(private http: HttpClient) {
    this.cargarUsuarioAutenticado();
  }

  // carga el estado de autenticacion del usuario desde el almacenamiento local
  private cargarUsuarioAutenticado(): void {
    const idTokenAlmacenado = localStorage.getItem('Idtoken');
    if (idTokenAlmacenado) {
      this.usuarioAutenticado = true;
      this.Idtoken = idTokenAlmacenado;
      this.usuarioAutenticadoSubject.next(true);
    }
  }

  // inicia sesion y almacena el token
  iniciarSesion(token: string): void {
    this.usuarioAutenticado = true;
    this.Idtoken = token;
    localStorage.setItem('Idtoken', token);
    this.usuarioAutenticadoSubject.next(true);
  }

  // realiza la solicitud de login y almacena el token recibido
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

  // cierra sesion y elimina el token
  cerrarSesion(): void {
    this.usuarioAutenticado = false;
    this.Idtoken = '';
    localStorage.removeItem('Idtoken');
    this.usuarioAutenticadoSubject.next(false);
  }

  // verifica si el usuario esta autenticado
  estaAutenticado(): boolean {
    return this.usuarioAutenticado;
  }

  // obtiene el token del usuario
  obtenerTokenUsuario(): string | null {
    return this.Idtoken;
  }
}
