import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css', '../navbar/navbar.css']
})
export class ProductoComponent implements OnInit {
  producto: any = null;
  cantidad = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private dataService: DataService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productoId = parseInt(params['id'], 10);
      this.producto = this.productService.getProductoById(productoId);
    });
  }

  cambiarCantidad(delta: number) {
    this.cantidad = Math.max(1, this.cantidad + delta);
  }

  agregarAlCarrito() {
    if (this.producto) {
      this.dataService.addToCart({ ...this.producto, cantidad: this.cantidad });
      this.notificationService.success(`¡${this.producto.nombre} agregado al carrito! Cantidad: ${this.cantidad}`);
    }
  }

  formatPrice(value: number): string {
    return value?.toLocaleString('es-CO') || '0';
  }
}
