import { Component } from '@angular/core';
import { TokenService } from './token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean;

  constructor(private tokenService: TokenService) {
    this.isLoggedIn = this.tokenService.estaAutenticado(); // Método que verifica si el usuario está autenticado
  }
}
