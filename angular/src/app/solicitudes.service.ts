import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private apiUrl = 'http://localhost:8000/api'; // URL de tu API en Laravel

  constructor(private http: HttpClient, public tokenService: TokenService) { }


  misServiciosShow(){
    
  }



  /*
  InventarioShow(): Observable<any> {
    // token de sesion
    const authToken = this.tokenService.getToken();
    // header con el token
      const headers = new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      });
    //peticion con headers para cargar los xuxemons capturados
    return this.http.get(`${this.apiUrl}capturados`, { headers });
  }
  */
}
