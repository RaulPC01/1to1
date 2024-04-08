import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contratar-servicio',
  templateUrl: './contratar-servicio.component.html',
  styleUrls: ['./contratar-servicio.component.css']
})
export class ContratarServicioComponent implements OnInit {
  servicioId: string | null = null; // Inicializado como null
  categorias: any[] = []; // Variable para almacenar las categorías

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Hacer la solicitud HTTP para obtener las categorías desde el backend
    this.http.get<any[]>('http://localhost:8000/api/categorias')
      .subscribe(categorias => {
        this.categorias = categorias;
      });

    this.route.paramMap.subscribe(params => {
      this.servicioId = params.get('id');
      // Aquí puedes hacer lo que necesites con el ID del servicio, como cargar los detalles del servicio desde el backend, etc.
    });
  }
}
