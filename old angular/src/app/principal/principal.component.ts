import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  topRatedServices: any[] = [];
  public page: number = 1;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getTopRatedServices();
  }

  nEstrellas(score: number): any[] {
    return Array(score).fill(0);
  }

  public getTopRatedServices(): void {
    const baseUrl = 'http://localhost:8000/api/services/top-valorated';

    this.http.post<any[]>(baseUrl, {}).subscribe(
      (data: any[]) => {
        this.topRatedServices = data;
      },
      (error) => {
        console.log('Error al obtener los servicios mejor valorados: ', error);
      }
    );
  }

  navegarDetalleServicio(servicioId: number) {
    this.router.navigate(['/servicios', servicioId]); // Navegar al detalle del servicio al hacer clic
  }
}
