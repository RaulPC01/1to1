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

  // carga los servicios del usuario
  cargarServicios(): void {
    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('el token no esta definido en el almacenamiento local');
      // manejar el error, por ejemplo, redirigir al usuario a la pagina de inicio de sesion
    }
  }

  // obtiene el perfil del usuario usando el token
  obtenerPerfilUsuario(token: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<any>('http://localhost:8000/api/perfil', { headers }).subscribe(
      (data) => {
        console.log('datos del perfil:', data);
        this.serviciosUsuario(data.dni);
      },
      (error) => {
        console.error('error al obtener el perfil del usuario:', error);
      }
    );
  }

  // obtiene los servicios del usuario proveedor
  serviciosUsuario(idUsuarioProveedor: string) {
    this.http.get<any[]>(`http://localhost:8000/api/serviciosUser/${idUsuarioProveedor}`).subscribe(
      (data) => {
        console.log('servicios del proveedor:', data);
        this.servicios = data;
        this.loading = false; // establecer loading en false cuando se complete la carga
      },
      (error) => {
        console.error('error al obtener los servicios del proveedor:', error);
      }
    );
  }

  // elimina un servicio por su id
  eliminarServicio(idServicio: number): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('Idtoken')}`
    });
    this.http.delete(`http://localhost:8000/api/servicios/${idServicio}`, { headers }).subscribe(
      () => {
        console.log('servicio eliminado correctamente');
        this.servicios = this.servicios.filter(servicio => servicio.id_servicios !== idServicio);
      },
      (error) => {
        console.error('error al eliminar el servicio:', error);
      }
    );
  }

  // activa el modo de edicion para un servicio especifico
  activarEdicion(servicio: any): void {
    // si el formulario ya esta visible y se hace clic en "editar" de nuevo, se oculta
    if (this.editando && this.servicioEditando.id_servicios === servicio.id_servicios) {
      this.editando = false;
    } else {
      this.servicioEditando = { ...servicio };
      this.editando = true;
    }
  }

  // actualiza los detalles de un servicio
  actualizarServicio(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('Idtoken')}`
    });
    this.http.put(`http://localhost:8000/api/servicios/${this.servicioEditando.id_servicios}`, this.servicioEditando, { headers })
      .subscribe(
        (response) => {
          console.log('servicio actualizado:', response);
          this.editando = false;
          this.cargarServicios(); // recargar la lista de servicios para mostrar los datos actualizados
        },
        (error) => {
          console.error('error al actualizar el servicio:', error);
        }
      );
    this.toggleEditForm(this.servicioEditando);
  }

  // alterna la visibilidad del formulario de edicion
  toggleEditForm(servicio: any): void {
    // si el servicio actualmente editado es el mismo que el servicio clicado,
    // lo cerramos (servicioEditando = null). de lo contrario, lo abrimos.
    this.servicioEditando = this.servicioEditando === servicio ? null : servicio;
  }
}
