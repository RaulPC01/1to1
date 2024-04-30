import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  crearTicket(ticketData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8000/api/create-ticket', ticketData);
  }

  getMotivos(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/reasons');
  }
}
