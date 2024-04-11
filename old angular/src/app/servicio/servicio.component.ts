import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  servicio: any;
  edadUsuario: number | undefined;
  mostrarCompleta = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const servicioId = params.get('id_servicios');
      if (servicioId) {
        this.obtenerDetalleServicio(servicioId);
      }
    });
  }
  
  obtenerDetalleServicio(id_servicios: string): void {
    this.http.get<any>(`http://localhost:8000/api/services/${id_servicios}`).subscribe(
      (data) => {   
        this.servicio = data;
        if (this.servicio && this.servicio.user && this.servicio.user.dateOfBirth) {
          const fechaNacimiento = new Date(this.servicio.user.dateOfBirth);
          const hoy = new Date();
          const diff = hoy.getTime() - fechaNacimiento.getTime();
          this.edadUsuario = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        }
      },
      (error) => {
        console.error('Error al obtener los detalles del servicio: ', error);
      }
    );
  }

  toggleImagenCompleta() {
    this.mostrarCompleta = !this.mostrarCompleta;
  }
}