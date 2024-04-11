import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private usuarioAutenticadoSubject = new BehaviorSubject<boolean>(false);
  usuarioAutenticado$ = this.usuarioAutenticadoSubject.asObservable();

  private Idtoken: string = '';

  private DNIuser : string = '';

  constructor(private http: HttpClient, private router: Router) {
    this.cargarUsuarioAutenticado();
  }

  private cargarUsuarioAutenticado(): void {
    const idTokenAlmacenado = localStorage.getItem('Idtoken');
    if (idTokenAlmacenado) {
      this.usuarioAutenticadoSubject.next(true);
      this.Idtoken = idTokenAlmacenado;
    }
  }

  iniciarSesion(token: string): void {
    this.usuarioAutenticadoSubject.next(true);
    this.Idtoken = token;
    localStorage.setItem('Idtoken', token);
  }

  login(dni: string, password: string): Observable<string> {
    return this.http.post<string>('http://localhost:8000/api/login', { dni, password }).pipe(
      map((result: any) => {
        localStorage.setItem('Idtoken', result.authToken);
        this.usuarioAutenticadoSubject.next(true);
        this.Idtoken = result.token;
        this.DNIuser=dni;
        return result.token;

      })
    );
  }

  cerrarSesion(): void {
    this.usuarioAutenticadoSubject.next(false);
    this.Idtoken = '';
    localStorage.removeItem('Idtoken');
    this.router.navigate(['/']); // Redirige al usuario a la ruta raíz
  }

  estaAutenticado(): boolean {
    return this.usuarioAutenticadoSubject.value;
  }

  obtenerTokenUsuario(): string | null {
    return this.Idtoken;
  }
}
