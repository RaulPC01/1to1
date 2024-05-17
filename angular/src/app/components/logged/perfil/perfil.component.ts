import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any;
  perfilForm!: FormGroup;
  showEditForm: boolean = false;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // inicializa el formulario formgroup
    this.perfilForm = this.formBuilder.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });

    // llama a la funcion para obtener el perfil del usuario
    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('el token no esta definido en el almacenamiento local');
      // manejar el error, por ejemplo, redirigir al usuario a la pagina de inicio de sesion
    }
  }

  // alterna la visibilidad del formulario de edicion
  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  // obtiene el perfil del usuario usando el token
  obtenerPerfilUsuario(token: string): void {
    this.userService.obtenerPerfilUsuario(token).subscribe(
      (data) => {
        console.log('datos del perfil:', data);
        this.user = data;
        if (localStorage.getItem('Idtoken') === data.token) {
          console.error('el token almacenado en el navegador coincide con el token devuelto por el backend');
          this.tokenService.cerrarSesion();
        }

        // establece los valores del formulario
        this.perfilForm.patchValue({
          dni: this.user.dni,
          name: this.user.name,
          email: this.user.email,
          phone: this.user.phone,
          dateOfBirth: this.user.dateOfBirth
        });
      },
      (error) => {
        console.error('error al obtener el perfil del usuario:', error);
      }
    );
  }
}
