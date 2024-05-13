import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { ServicioService } from 'src/app/servicio.service';

@Component({
  selector: 'app-header-logged',
  templateUrl: './header-logged.component.html',
  styleUrls: ['./header-logged.component.css']
})
export class HeaderLoggedComponent implements OnInit {
  isLoggedIn: boolean = false;
  usuarioActual: any;
  showToggleMenu: boolean = false;
  loading: boolean = false;
  buscarPalabra: string = '';
  topRatedServices: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10; // Número de servicios por página

  constructor(
    public TokenService: TokenService, 
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private ServicioService: ServicioService,
  ) { }

  ngOnInit(): void {
    this.usuarioActual = localStorage.getItem('Idtoken');
    this.breakpointObserver.observe([Breakpoints.Handset, '(min-width: 750px)'])
      .pipe(
        map(result => result.matches)
      )
      .subscribe(matches => {
        this.showToggleMenu = !matches;
      });
  }

  redireccionarAlPerfil(): void {
    const token = this.usuarioActual;
    if (token) {
      this.router.navigate(['/perfil']);
    } else {
      console.error('No se pudo obtener el token de usuario');
    }
  }

  logout(): void {
    this.TokenService.cerrarSesion();
    this.router.navigate(['']);
  }

  toggleMobileMenu(): void {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu !== null) {
      mobileMenu.classList.toggle('active');
    }
  }

  closeMobileMenu(): void {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu !== null) {
      mobileMenu.classList.remove('active');
    }
  }

  searchServices(): void {
    this.loading = true;
    this.ServicioService.buscarServicios(this.buscarPalabra).subscribe(
      (services: any[]) => {
        this.topRatedServices = services;
        this.loading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      (error) => {
        console.log('Error al buscar servicios: ', error);
        this.loading = false;
      }
    );
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    const totalPages = this.getTotalPages();
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.topRatedServices.length / this.pageSize);
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  getEndIndex(): number {
    return Math.min(this.getStartIndex() + this.pageSize, this.topRatedServices.length);
  }
}
