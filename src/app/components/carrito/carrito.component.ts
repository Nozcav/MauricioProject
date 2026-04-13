import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css', '../navbar/navbar.css']
})
export class CarritoComponent implements OnInit {
  productos: any[] = [];
  showCheckoutSuccess = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.productos = this.dataService.getCart();
  }

  get subtotal(): number {
    return this.dataService.getCartTotal();
  }

  get envio(): number {
    return this.subtotal > 100000 ? 0 : 15000;
  }

  get total(): number {
    return this.subtotal + this.envio;
  }

  cambiarCantidad(producto: any, delta: number) {
    this.dataService.updateCartQuantity(producto.id, producto.cantidad + delta);
    this.loadCart();
  }

  eliminarProducto(producto: any) {
    this.dataService.removeFromCart(producto.id);
    this.loadCart();
  }

  calcularTotal(producto: any): number {
    return producto.precio * producto.cantidad;
  }

  formatPrice(value: number): string {
    return this.dataService.formatPrice(value);
  }

  procederAlPago() {
    if (this.productos.length === 0) return;
    
    const order = this.dataService.createOrder();
    if (order) {
      this.showCheckoutSuccess = true;
      this.productos = [];
    }
  }

  cerrarCheckout() {
    this.showCheckoutSuccess = false;
  }

  seguirComprando() {
    window.location.href = '/tienda';
  }
}
