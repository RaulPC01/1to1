import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor( private http: HttpClient, public tokenService: TokenService ) {}

  misServiciosShow(){
    
    // token de sesion
    const authToken = this.tokenService.estaAutenticado();
    // header con el token
      const headers = new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      });
    
    
  }

}
