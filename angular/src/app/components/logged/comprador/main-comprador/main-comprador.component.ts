import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from 'src/app/servicio.service';
import { TranslateService } from '@ngx-translate/core'; // Importa el servicio de traducción

@Component({
  selector: 'app-main-comprador',
  templateUrl: './main-comprador.component.html',
  styleUrls: ['./main-comprador.component.css']
})
export class MainCompradorComponent implements OnInit {
  topRatedServices: any[] = [];
  buscarPalabra: string = '';
  loading: boolean = false;
  numberOfColumns = 4;
  categories = [
    { id: 1, nombre_categoria_es: "Carpintero", nombre_categoria_en: "Carpenter" },
    { id: 2, nombre_categoria_es: "Pintor", nombre_categoria_en: "Painter" },
    { id: 3, nombre_categoria_es: "Profesor", nombre_categoria_en: "Teacher" },
    { id: 4, nombre_categoria_es: "Mecánico", nombre_categoria_en: "Mechanic" },
    { id: 5, nombre_categoria_es: "Electricista", nombre_categoria_en: "Electrician" },
    { id: 6, nombre_categoria_es: "Fontanero", nombre_categoria_en: "Plumber" },
    { id: 7, nombre_categoria_es: "Jardinero", nombre_categoria_en: "Gardener" },
    { id: 8, nombre_categoria_es: "Diseñador gráfico", nombre_categoria_en: "Graphic Designer" },
    { id: 9, nombre_categoria_es: "Programador", nombre_categoria_en: "Programmer" },
    { id: 12, nombre_categoria_es: "Albañil", nombre_categoria_en: "Bricklayer" },
    { id: 14, nombre_categoria_es: "Abogado", nombre_categoria_en: "Lawyer" },
    { id: 19, nombre_categoria_es: "Fisioterapeuta", nombre_categoria_en: "Physiotherapist" },
    { id: 21, nombre_categoria_es: "Entrenador personal", nombre_categoria_en: "Personal Trainer" },
    { id: 22, nombre_categoria_es: "Masajista", nombre_categoria_en: "Masseur" },
    { id: 25, nombre_categoria_es: "Estilista", nombre_categoria_en: "Stylist" },
    { id: 34, nombre_categoria_es: "Escultor", nombre_categoria_en: "Sculptor" },
    { id: 35, nombre_categoria_es: "Fotógrafo", nombre_categoria_en: "Photographer" },
    { id: 38, nombre_categoria_es: "Bailarín", nombre_categoria_en: "Dancer" },
    { id: 39, nombre_categoria_es: "Instructor de yoga", nombre_categoria_en: "Yoga Instructor" },
    { id: 43, nombre_categoria_es: "Repartidor", nombre_categoria_en: "Delivery Person" }
  ];

  selectedCategoryId: number | undefined;
  currentPage: number = 1; // Página actual
  pageSize: number = 6;    // Tamaño de la página (número de filas)

  constructor(private servicioService: ServicioService, private router: Router, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getTopRatedServices();
  }

  getTranslatedCategory(category: any) {
    
    const lang = this.translateService.currentLang;
    return lang === 'es' ?   category.nombre_categoria_es : category.nombre_categoria_en ;
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  getEndIndex(): number {
    return Math.min(this.getStartIndex() + this.pageSize, this.topRatedServices.length);
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      window.scrollTo({ top: 450, behavior: 'smooth' });
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo({ top: 450, behavior: 'smooth' });
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.topRatedServices.length / this.pageSize);
  }

  get columns() {
    const columns = [];
    for (let i = 0; i < this.numberOfColumns; i++) {
      columns.push(i);
    }
    return columns;
  }

  getColumnCategories(column: number) {
    const categoriesPerColumn = Math.ceil(this.categories.length / this.numberOfColumns);
    const startIndex = column * categoriesPerColumn;
    const endIndex = startIndex + categoriesPerColumn;
    return this.categories.slice(startIndex, endIndex);
  }

  nEstrellas(score: number): any[] {
    return Array(score).fill(0);
  }

  getTopRatedServices(): void {
    this.servicioService.obtenerTopServiciosValorados().subscribe(
      (data: any[]) => {
        this.topRatedServices = data;
        this.loading = false;
        console.log(this.topRatedServices);
      },
      (error) => {
        console.log('Error al obtener los servicios mejor valorados: ', error);
        this.loading = false;
      }
    );
  }

  navegarDetalleServicio(servicioId: number) {
    this.router.navigate(['/servicios', servicioId]);
  }

  onSelectCategory(categoryId: number): void {
    this.loading = true;
    this.servicioService.obtenerServiciosPorCategoria(categoryId).subscribe(
      (services: any[]) => {
        this.topRatedServices = services;
        this.loading = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      (error) => {
        console.log('Error al obtener los servicios por categoría: ', error);
        this.loading = false;
      }
    );
  }

  searchServices(): void {
    this.loading = true;
    this.servicioService.buscarServicios(this.buscarPalabra).subscribe(
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
}
