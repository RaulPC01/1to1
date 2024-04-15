import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  isEditing = false;
  userProfile = {
    fullName: 'Raul Pereira Costa',
    email: 'raulpereira-01@hotmail.com',
    contactNumber: '044 3276 454 935',
    city: 'Lleida'
  };

  constructor() { }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    // Aquí implementarías la lógica para enviar los datos actualizados al servidor
    console.log('Profile saved', this.userProfile);
    this.isEditing = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected', file.name);
      // Aquí almacenarías el nombre del archivo o lo cargarías al servidor
    }
  }
}
