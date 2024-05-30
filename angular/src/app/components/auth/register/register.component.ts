import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  RegisterForm: FormGroup;
  errorMessage: string = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private Router: Router
  ) {
    this.RegisterForm = this.formBuilder.group({
      documentType: ['', Validators.required],
      dni: ['', [Validators.required, this.documentValidator.bind(this)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      image: [null]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('password_confirmation')?.value;

    if (password !== confirmPassword) {
      formGroup.get('password_confirmation')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      formGroup.get('password_confirmation')?.setErrors(null);
      return null;
    }
  }

  documentValidator(control: any) {
    const documentType = this.RegisterForm?.get('documentType')?.value;
    const value = control.value;

    if (documentType === 'DNI') {
      if (!/^[0-9]{8}[A-Z]$/.test(value)) {
        return { invalidDNI: true };
      }
    } else if (documentType === 'NIE') {
      if (!/^[XYZ][0-9]{7}[A-Z]$/.test(value)) {
        return { invalidNIE: true };
      }
    } else if (documentType === 'passport') {
      if (!/^[A-Z0-9]{5,9}$/.test(value)) {
        return { invalidPassport: true };
      }
    }
    return null;
  }

  getErrorMessage(controlName: string): string {
    const control = this.RegisterForm.get(controlName);

    if (!control) {
      return 'Control is not found';
    }

    if (control.hasError('required')) {
      return 'Este campo es obligatorio.';
    } else if (control.hasError('pattern')) {
      if (controlName === 'phone') {
        return 'El número de teléfono debe tener 9 dígitos.';
      } else {
        return 'El nombre no debe contener números.';
      }
    } else if (control.hasError('minlength')) {
      return 'La contraseña debe tener al menos 8 caracteres.';
    } else if (control.hasError('email')) {
      return 'Por favor ingresa un correo electrónico válido.';
    } else if (control.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden.';
    } else if (control.hasError('invalidDNI')) {
      return 'El DNI no es válido.';
    } else if (control.hasError('invalidNIE')) {
      return 'El NIE no es válido.';
    } else if (control.hasError('invalidPassport')) {
      return 'El pasaporte no es válido.';
    }
    return '';
  }

  showError(controlName: string, errorName: string) {
    return this.RegisterForm.controls[controlName].hasError(errorName);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.getBase64(file).then((base64: string) => {
        this.RegisterForm.patchValue({
          image: base64
        });
      });
    }
  }

  getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.RegisterForm.valid) {
      const formData = new FormData();
      Object.keys(this.RegisterForm.value).forEach(key => {
        formData.append(key, this.RegisterForm.value[key]);
      });

      this.userService.registerUser(formData)
        .subscribe(
          (data) => {
            console.log(data);
            this.Router.navigate(['/login']);
          },
          (error: HttpErrorResponse) => {
            console.error(error);
            if (error.status === 409) {
              this.errorMessage = error.error?.message || 'El correo electrónico, el DNI o el número de teléfono ya están en uso.';
            } else if (error.error && typeof error.error === 'object') {
              if (error.error.errors) {
                this.errorMessage = Object.values(error.error.errors).join(' ');
              } else {
                this.errorMessage = error.error.message || 'Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.';
              }
            } else {
              this.errorMessage = 'Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.';
            }
          }
        );
    } else {
      this.scrollToFirstInvalidControl();
    }
  }

  private scrollToFirstInvalidControl(): void {
    const firstInvalidControl: HTMLElement | null = document.querySelector('form .ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
