import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { TokenService } from 'src/app/token.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any;
  perfilForm!: FormGroup;
  showEditForm: boolean = false;
  loading: boolean = false;
  userId: string ='';

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loading = true;

    // Initialize FormGroup for user and profile data
    this.perfilForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      experiencia: ['', Validators.required],
      habilidades: ['', Validators.required],
      descripcion_personal: ['', Validators.required]
    });

    // Fetch user and profile data
    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('Token not found in local storage');
    }
  }

  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  obtenerPerfilUsuario(token: string): void {
    this.userService.obtenerPerfilUsuario(token).subscribe(
      (data) => {
        this.user = data;
        this.userId = this.user.profile.dni;
        this.loading = false;

        if (localStorage.getItem('Idtoken') === data.token) {
          console.error('Token mismatch between browser and backend');
          this.tokenService.cerrarSesion();
        }

        // Set form values with user and profile data
        this.perfilForm.patchValue({
          name: this.user.profile.name,
          email: this.user.profile.email,
          phone: this.user.profile.phone,
          experiencia: this.user.profile.experiencia,
          habilidades: this.user.profile.habilidades,
          descripcion_personal: this.user.profile.descripcion_personal
        });
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    );
  }

  guardarPerfil(): void {
    this.userService.updateUserProfile(this.userId, this.perfilForm.value).subscribe(
      (response) => {
        console.log('Perfil actualizado correctamente:', response);
      },
      (error) => {
        console.error('Error al actualizar el perfil:', error);
        console.log('Formulario:', this.perfilForm.value);

      }
    );
  }
}
