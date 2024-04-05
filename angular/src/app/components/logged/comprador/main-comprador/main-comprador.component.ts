import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-comprador',
  templateUrl: './main-comprador.component.html',
  styleUrls: ['./main-comprador.component.css']
})
export class MainCompradorComponent {
  topRatedServices: any[] = [];

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
