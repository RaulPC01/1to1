import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contratar-servicio',
  templateUrl: './contratar-servicio.component.html',
  styleUrls: ['./contratar-servicio.component.css']
})
export class ContratarServicioComponent implements OnInit {
  categorias: any[] = []; // Variable para almacenar las categorías

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Hacer la solicitud HTTP para obtener las categorías desde el backend
    this.http.get<any[]>('http://localhost:8000/api/categorias')
      .subscribe(categorias => {
        this.categorias = categorias;
      });
  }
}
