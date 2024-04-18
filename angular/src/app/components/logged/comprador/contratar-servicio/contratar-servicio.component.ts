import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-contratar-servicio',
  templateUrl: './contratar-servicio.component.html',
  styleUrls: ['./contratar-servicio.component.css']
})
export class ContratarServicioComponent implements OnInit {
  servicioId: string | null = null; // Inicializado como null
  categorias: any[] = []; // Variable para almacenar las categorías

  constructor(private route: ActivatedRoute, private http: HttpClient, private tokenService: TokenService) { }

  ngOnInit(): void {
    // Obtener el DNI del usuario del servicio TokenService
   
  }
}
