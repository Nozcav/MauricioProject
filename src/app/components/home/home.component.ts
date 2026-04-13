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
    this.productosDestacados = todosProductos.filter(p => p.badge?.includes('🏆') || p.badge?.includes('⭐') || p.badge?.includes('🔥')).slice(0, 4);
    this.nuevosIngresos = todosProductos.filter(p => p.badge?.includes('✨ Nuevo')).slice(0, 4);
    
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
