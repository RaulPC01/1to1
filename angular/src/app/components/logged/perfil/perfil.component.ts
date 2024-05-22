import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { TokenService } from 'src/app/token.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user: any;
  perfilForm!: FormGroup;
  showEditForm: boolean = false;
  userId: string = '';
  editForm!: FormGroup;
  loading: boolean = false;



  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true; 
    this.perfilForm = this.formBuilder.group({
      dni: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      profilePicture: ['']
    });

    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      number: ['', Validators.required], // Adjusted validation
      profilePicture: ['']
    });

    const token = localStorage.getItem('Idtoken');
    if (token) {
      this.obtenerPerfilUsuario(token);
    } else {
      console.error('El token no está definido en el almacenamiento local');
      // Manejar el error, por ejemplo, redirigir al usuario a la página de inicio de sesión
    }
  }

  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
  }

  obtenerPerfilUsuario(token: string): void {
    this.userService.obtenerPerfilUsuario(token).subscribe(
      (data) => {
        console.log('Datos del perfil:', data);
        this.user = data;
        this.userId = data.dni;
        console.log(this.userId);
        this.loading = false; 


        if (localStorage.getItem('Idtoken') === data.token) {
          console.error('El token almacenado en el navegador coincide con el token devuelto por el backend');
          this.tokenService.cerrarSesion();
        }

        this.perfilForm.patchValue({
          dni: this.user.dni,
          name: this.user.name,
          email: this.user.email,
          phone: this.user.phone,
          dateOfBirth: this.user.dateOfBirth,
          profilePicture: this.user.image || ''
        });
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    );
  }

  actualizarPerfilUsuario(): void {
    if (this.editForm.valid) {
      const updatedUser = this.editForm.value;
  
      this.userService.actualizarPerfilUsuario(this.userId, updatedUser)
        .subscribe(
          (response) => {
            console.log('Perfil actualizado con éxito:', response);
            
            this.showEditForm = false;


          },
          (error) => {
            console.error('Error al actualizar el perfil del usuario:', error);
          }
        );
    } else {
      console.error('El formulario no es válido');
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.getBase64(file).then((base64: string) => {
        this.editForm.patchValue({
          image: base64 // Almacena la imagen codificada en Base64 en el formulario
        });
      });
    }
  }

  // Convierte un archivo a Base64
  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
