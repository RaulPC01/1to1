import { Component, OnInit } from '@angular/core';
import { TokenService } from './token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = true; // Asegúrate de que isLoggedIn sea inicializado aquí

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.usuarioAutenticado$.subscribe(auth => {
      this.isLoggedIn = auth;
    });
  }
}
