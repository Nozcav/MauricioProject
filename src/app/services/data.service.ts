import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Storage keys
  private readonly CART_KEY = 'luxe_cart';
  private readonly FAVORITES_KEY = 'luxe_favorites';
  private readonly PROFILE_KEY = 'luxe_profile';
  private readonly ADDRESSES_KEY = 'luxe_addresses';
  private readonly PAYMENTS_KEY = 'luxe_payments';
  private readonly ORDERS_KEY = 'luxe_orders';

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize cart if empty
    if (!localStorage.getItem(this.CART_KEY)) {
      localStorage.setItem(this.CART_KEY, JSON.stringify([]));
    }
    
    // Initialize favorites if empty
    if (!localStorage.getItem(this.FAVORITES_KEY)) {
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify([]));
    }

    // Initialize profile if empty
    if (!localStorage.getItem(this.PROFILE_KEY)) {
      localStorage.setItem(this.PROFILE_KEY, JSON.stringify({
        nombre: 'María García',
        email: 'maria.garcia@email.com',
        telefono: '300 123 4567',
        fechaNacimiento: '15/05/1990',
        genero: 'Femenino'
      }));
    }

    // Initialize addresses if empty
    if (!localStorage.getItem(this.ADDRESSES_KEY)) {
      localStorage.setItem(this.ADDRESSES_KEY, JSON.stringify([
        {
          id: 1,
          nombre: 'Casa',
          direccion: 'Calle 123 #45-67',
          ciudad: 'Bogotá',
          telefono: '300 123 4567',
          principal: true
        },
        {
          id: 2,
          nombre: 'Trabajo',
          direccion: 'Carrera 7 #65-21',
          ciudad: 'Bogotá',
          telefono: '301 987 6543',
          principal: false
        }
      ]));
    }

    // Initialize payment methods if empty
    if (!localStorage.getItem(this.PAYMENTS_KEY)) {
      localStorage.setItem(this.PAYMENTS_KEY, JSON.stringify([
        {
          id: 1,
          tipo: 'Tarjeta',
          marca: 'Visa',
          ultimosDigitos: '4242',
          expira: '12/26',
          principal: true
        },
        {
          id: 2,
          tipo: 'Tarjeta',
          marca: 'Mastercard',
          ultimosDigitos: '8888',
          expira: '08/25',
          principal: false
        }
      ]));
    }

    // Initialize orders if empty
    if (!localStorage.getItem(this.ORDERS_KEY)) {
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify([
        {
          id: 'PED-2024-001',
          fecha: '15 Mar 2024',
          estado: 'Entregado',
          total: 299000,
          items: 1,
          productos: [
            { nombre: 'Anillo Esmeralda Trapiche', precio: 299000, cantidad: 1 }
          ]
        },
        {
          id: 'PED-2024-002',
          fecha: '20 Mar 2024',
          estado: 'Enviado',
          total: 378000,
          items: 2,
          productos: [
            { nombre: 'Collar Esmeralda Cholita', precio: 189000, cantidad: 2 }
          ]
        }
      ]));
    }
  }

  // ==================== CART ====================
  getCart(): any[] {
    return JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
  }

  addToCart(producto: any) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex((p: any) => p.id === producto.id);
    const cantidad = producto?.cantidad && producto.cantidad > 0 ? producto.cantidad : 1;

    if (existingIndex >= 0) {
      cart[existingIndex].cantidad += cantidad;
    } else {
      cart.push({ ...producto, cantidad });
    }

    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  removeFromCart(productoId: number) {
    let cart = this.getCart();
    cart = cart.filter((p: any) => p.id !== productoId);
    localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
  }

  updateCartQuantity(productoId: number, cantidad: number) {
    const cart = this.getCart();
    const index = cart.findIndex((p: any) => p.id === productoId);
    
    if (index >= 0) {
      if (cantidad <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].cantidad = cantidad;
      }
      localStorage.setItem(this.CART_KEY, JSON.stringify(cart));
    }
  }

  clearCart() {
    localStorage.setItem(this.CART_KEY, JSON.stringify([]));
  }

  getCartCount(): number {
    return this.getCart().reduce((sum: number, p: any) => sum + p.cantidad, 0);
  }

  getCartTotal(): number {
    return this.getCart().reduce((sum: number, p: any) => sum + (p.precio * p.cantidad), 0);
  }

  // ==================== FAVORITES ====================
  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem(this.FAVORITES_KEY) || '[]');
  }

  addToFavorites(producto: any) {
    const favorites = this.getFavorites();
    if (!favorites.find((p: any) => p.id === producto.id)) {
      favorites.push(producto);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    }
  }

  removeFromFavorites(productoId: number) {
    let favorites = this.getFavorites();
    favorites = favorites.filter((p: any) => p.id !== productoId);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }

  isFavorite(productoId: number): boolean {
    return this.getFavorites().some((p: any) => p.id === productoId);
  }

  toggleFavorite(producto: any): boolean {
    if (this.isFavorite(producto.id)) {
      this.removeFromFavorites(producto.id);
      return false;
    } else {
      this.addToFavorites(producto);
      return true;
    }
  }

  // ==================== PROFILE ====================
  getProfile(): any {
    return JSON.parse(localStorage.getItem(this.PROFILE_KEY) || '{}');
  }

  updateProfile(profile: any) {
    localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile));
  }

  // ==================== ADDRESSES ====================
  getAddresses(): any[] {
    return JSON.parse(localStorage.getItem(this.ADDRESSES_KEY) || '[]');
  }

  addAddress(address: any) {
    const addresses = this.getAddresses();
    const newId = Math.max(0, ...addresses.map((a: any) => a.id)) + 1;
    
    if (address.principal) {
      addresses.forEach((a: any) => a.principal = false);
    }
    
    addresses.push({ ...address, id: newId });
    localStorage.setItem(this.ADDRESSES_KEY, JSON.stringify(addresses));
  }

  updateAddress(id: number, address: any) {
    const addresses = this.getAddresses();
    const index = addresses.findIndex((a: any) => a.id === id);
    
    if (index >= 0) {
      if (address.principal) {
        addresses.forEach((a: any) => a.principal = false);
      }
      addresses[index] = { ...address, id };
      localStorage.setItem(this.ADDRESSES_KEY, JSON.stringify(addresses));
    }
  }

  deleteAddress(id: number) {
    let addresses = this.getAddresses();
    addresses = addresses.filter((a: any) => a.id !== id);
    localStorage.setItem(this.ADDRESSES_KEY, JSON.stringify(addresses));
  }

  setPrincipalAddress(id: number) {
    const addresses = this.getAddresses();
    addresses.forEach((a: any) => a.principal = a.id === id);
    localStorage.setItem(this.ADDRESSES_KEY, JSON.stringify(addresses));
  }

  // ==================== PAYMENT METHODS ====================
  getPayments(): any[] {
    return JSON.parse(localStorage.getItem(this.PAYMENTS_KEY) || '[]');
  }

  addPayment(payment: any) {
    const payments = this.getPayments();
    const newId = Math.max(0, ...payments.map((p: any) => p.id)) + 1;
    
    if (payment.principal) {
      payments.forEach((p: any) => p.principal = false);
    }
    
    payments.push({ ...payment, id: newId });
    localStorage.setItem(this.PAYMENTS_KEY, JSON.stringify(payments));
  }

  updatePayment(id: number, payment: any) {
    const payments = this.getPayments();
    const index = payments.findIndex((p: any) => p.id === id);
    
    if (index >= 0) {
      if (payment.principal) {
        payments.forEach((p: any) => p.principal = false);
      }
      payments[index] = { ...payment, id };
      localStorage.setItem(this.PAYMENTS_KEY, JSON.stringify(payments));
    }
  }

  deletePayment(id: number) {
    let payments = this.getPayments();
    payments = payments.filter((p: any) => p.id !== id);
    localStorage.setItem(this.PAYMENTS_KEY, JSON.stringify(payments));
  }

  setPrincipalPayment(id: number) {
    const payments = this.getPayments();
    payments.forEach((p: any) => p.principal = p.id === id);
    localStorage.setItem(this.PAYMENTS_KEY, JSON.stringify(payments));
  }

  // ==================== ORDERS ====================
  getOrders(): any[] {
    return JSON.parse(localStorage.getItem(this.ORDERS_KEY) || '[]');
  }

  createOrder() {
    const cart = this.getCart();
    if (cart.length === 0) return null;

    const orders = this.getOrders();
    const newId = 'PED-2024-' + String(orders.length + 3).padStart(3, '0');
    
    const order = {
      id: newId,
      fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      estado: 'Procesando',
      total: this.getCartTotal(),
      items: cart.reduce((sum: number, p: any) => sum + p.cantidad, 0),
      productos: cart.map((p: any) => ({
        nombre: p.nombre,
        precio: p.precio,
        cantidad: p.cantidad
      }))
    };

    orders.unshift(order);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    this.clearCart();
    
    return order;
  }

  // ==================== UTILITIES ====================
  formatPrice(value: number): string {
    return value.toLocaleString('es-CO');
  }

  // ==================== SEARCH ====================
  searchProducts(productos: any[], query: string): any[] {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();

    return productos.filter(producto => {
      const nombreMatch = producto.nombre.toLowerCase().includes(searchTerm);
      const skuMatch = producto.sku && producto.sku.toLowerCase().includes(searchTerm);
      const categoriaMatch = producto.categoria && producto.categoria.toLowerCase().includes(searchTerm);
      const materialMatch = producto.material && producto.material.toLowerCase().includes(searchTerm);

      return nombreMatch || skuMatch || categoriaMatch || materialMatch;
    }).slice(0, 8); // Limit to 8 results for autocomplete
  }
}
