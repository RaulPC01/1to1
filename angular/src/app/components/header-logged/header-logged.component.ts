import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/token.service';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.css']
})
export class HeaderLoggedComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.usuarioAutenticado$.subscribe(auth => {
      this.isLoggedIn = auth;
    });
  }

  logout(): void {
    this.tokenService.cerrarSesion();
  }
}
