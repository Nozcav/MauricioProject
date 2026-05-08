import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../navbar/navbar.css']
})
export class HomeComponent implements OnInit {
  indiceActual = 0;
  productosDestacados: any[] = [];
  nuevosIngresos: any[] = [];
  categorias: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    const todosProductos = this.productService.getProductos();
    this.productosDestacados = todosProductos.filter(p => p.badge?.includes('<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>') || p.badge?.includes('<svg class="icon-lucide" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>') || p.badge?.includes('<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>')).slice(0, 4);
    this.nuevosIngresos = todosProductos.filter(p => p.badge?.includes('<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.937 8.5l1.582-6.135a.5.5 0 01.963 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.581a.5.5 0 010 .964L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg> Nuevo')).slice(0, 4);
    
    if (this.productosDestacados.length === 0) {
      this.productosDestacados = todosProductos.slice(0, 4);
    }
    if (this.nuevosIngresos.length === 0) {
      this.nuevosIngresos = todosProductos.slice(4, 8);
    }
    
    const defaultImage = 'assets/img/productos/corazon-brillante.jpg';
    this.productosDestacados.forEach(p => p.imagen = p.imagen || defaultImage);
    this.nuevosIngresos.forEach(p => p.imagen = p.imagen || defaultImage);
    
    const categoriasUnicas = [...new Set(todosProductos.map(p => p.categoria))];
    this.categorias = categoriasUnicas.map(cat => {
      const productosCat = todosProductos.filter(p => p.categoria === cat);
      return {
        nombre: cat,
        imagen: productosCat[0]?.imagen || defaultImage,
        precioMin: Math.min(...productosCat.map(p => p.precio))
      };
    });
  }
  
  moverCarrusel(direccion: number) {
    const slides = document.querySelectorAll('.carrusel-slide');
    const totalSlides = slides.length;
    this.indiceActual += direccion;
    if (this.indiceActual >= totalSlides) this.indiceActual = 0;
    if (this.indiceActual < 0) this.indiceActual = totalSlides - 1;
    this.actualizarCarrusel();
  }
  
  actualizarCarrusel() {
    const carrusel = document.getElementById('carrusel');
    if (carrusel) {
      carrusel.style.transform = `translateX(-${this.indiceActual * 100}%)`;
    }
    
    const indicadores = document.querySelectorAll('.indicador');
    indicadores.forEach((ind, i) => {
      ind.className = 'indicador' + (i === this.indiceActual ? ' activo' : '');
    });
  }
}
