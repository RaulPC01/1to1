
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mis-peticiones',
  templateUrl: './mis-peticiones.component.html',
  styleUrls: ['./mis-peticiones.component.css']
})
export class MisPeticionesComponent implements OnInit {
  loading: boolean = false;

  peticiones: any[] = [];

  constructor(private http: HttpClient , private userService: UserService) { }
  

 
  ngOnInit(): void {
    this.loading = true; 

    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('El token no está definido en el almacenamiento local');
      // Manejar el error, por ejemplo, redirigir al usuario a la página de inicio de sesión
    }
  }

  obtenerPerfilUsuario(token: string): void {
    const headers = new HttpHeaders({ // Aquí se usa HttpHeaders
      'Authorization': `Bearer ${token}`
    });
    this.http.get<any>('http://localhost:8000/api/perfil', { headers }).subscribe(
      (data) => {
        console.log('Datos del perfil:', data);
        // Llamada a la función obtenerSolicitudesProveedor con el ID del usuario proveedor
        this.obtenerMisPeticiones(data.dni);
        
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
        
      }
    );
  }

  obtenerMisPeticiones(userId: string): void {
    this.userService.getMisPeticiones(userId).subscribe(
      (data) => {
        console.log('Mis peticiones:', data);
        this.peticiones = data; 
        this.loading = false; 
      },
      (error) => {
        console.error('Error al obtener mis peticiones:', error);
        
        this.loading = false; 
      }
    );
  }
}