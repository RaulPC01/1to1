import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mis-servivios',
  templateUrl: './mis-servivios.component.html',
  styleUrls: ['./mis-servivios.component.css']
})
export class MisServiviosComponent implements OnInit {
  servicios: any[] = [];
  editando = false;
  servicioEditando: any = {};
  loading: boolean = false;

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.loading = true; 
    this.cargarServicios();
  }

  cargarServicios(): void {
    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('El token no está definido en el almacenamiento local');
      // Manejar el error, por ejemplo, redirigir al usuario a la página de inicio de sesión
    }
  }

  obtenerPerfilUsuario(token: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<any>('http://localhost:8000/api/perfil', { headers }).subscribe(
      (data) => {
        console.log('Datos del perfil:', data);
        this.serviciosUsuario(data.dni);
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    );
  }

  serviciosUsuario(idUsuarioProveedor: string) {
    this.http.get<any[]>(`http://localhost:8000/api/serviciosUser/${idUsuarioProveedor}`).subscribe(
      (data) => {
        console.log('Servicios del proveedor:', data);
        this.servicios = data;
        this.loading = false; // Establecer loading en false cuando se complete la carga
      },
      (error) => {
        console.error('Error al obtener los servicios del proveedor:', error);
      }
    );
  }

  eliminarServicio(idServicio: number): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('Idtoken')}`
    });
    this.http.delete(`http://localhost:8000/api/servicios/${idServicio}`, { headers }).subscribe(
      () => {
        console.log('Servicio eliminado correctamente');
        this.servicios = this.servicios.filter(servicio => servicio.id_servicios !== idServicio);
      },
      (error) => {
        console.error('Error al eliminar el servicio:', error);
      }
    );
  }

  activarEdicion(servicio: any): void {
    // Si el formulario ya está visible y se hace clic en "Editar" de nuevo, se oculta
    if (this.editando && this.servicioEditando.id_servicios === servicio.id_servicios) {
      this.editando = false;
    } else {
      this.servicioEditando = { ...servicio };
      this.editando = true;
    }
  }

  actualizarServicio(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('Idtoken')}`
    });
    this.http.put(`http://localhost:8000/api/servicios/${this.servicioEditando.id_servicios}`, this.servicioEditando, { headers })
      .subscribe(
        (response) => {
          console.log('Servicio actualizado:', response);
          this.editando = false;
          this.cargarServicios(); // Recargar la lista de servicios para mostrar los datos actualizados
        },
        (error) => {
          console.error('Error al actualizar el servicio:', error);
        }
      );
    this.toggleEditForm(this.servicioEditando);
  }

  toggleEditForm(servicio: any): void {
    // Si el servicio actualmente editado es el mismo que el servicio clicado,
    // lo cerramos (servicioEditando = null). De lo contrario, lo abrimos.
    this.servicioEditando = this.servicioEditando === servicio ? null : servicio;
  }
}
