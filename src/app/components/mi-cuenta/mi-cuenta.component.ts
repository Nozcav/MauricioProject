import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mi-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['../navbar/navbar.css', 'mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {
  seccionActiva = 'perfil';
  
  // Data from service
  pedidos: any[] = [];
  direcciones: any[] = [];
  metodosPago: any[] = [];
  perfil: any = {};
  
  // Edit mode
  editMode = false;
  editingProfile: any = {};
  
  // New address/payment form
  showAddressForm = false;
  showPaymentForm = false;
  newAddress: any = { nombre: '', direccion: '', ciudad: '', telefono: '', principal: false };
  newPayment: any = { tipo: 'Tarjeta', marca: '', ultimosDigitos: '', expira: '', principal: false };
  
  // Delete confirmation
  deleteConfirm: any = null;

  secciones = [
    { id: 'perfil', nombre: 'Mi Perfil', icono: 'user' },
    { id: 'pedidos', nombre: 'Mis Pedidos', icono: 'box' },
    { id: 'direcciones', nombre: 'Direcciones', icono: 'map' },
    { id: 'pagos', nombre: 'Métodos de Pago', icono: 'card' },
    { id: 'configuracion', nombre: 'Configuración', icono: 'settings' }
  ];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.pedidos = this.dataService.getOrders();
    this.direcciones = this.dataService.getAddresses();
    this.metodosPago = this.dataService.getPayments();
    this.perfil = this.dataService.getProfile();
  }

  seleccionarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    this.editMode = false;
    this.showAddressForm = false;
    this.showPaymentForm = false;
    this.deleteConfirm = null;
  }

  formatPrice(value: number): string {
    return this.dataService.formatPrice(value);
  }

  getBadgeClass(estado: string): string {
    switch(estado) {
      case 'Entregado': return 'badge-verde';
      case 'Enviado': return 'badge-azul';
      case 'Procesando': return 'badge-amarillo';
      default: return '';
    }
  }

  // ==================== PROFILE ====================
  toggleEditProfile() {
    if (this.editMode) {
      // Save changes
      this.dataService.updateProfile(this.editingProfile);
      this.perfil = { ...this.editingProfile };
    } else {
      // Start editing
      this.editingProfile = { ...this.perfil };
    }
    this.editMode = !this.editMode;
  }

  addToCart(producto: any) {
    this.dataService.addToCart(producto);
    alert(`¡${producto.nombre} agregado al carrito!`);
  }

  // ==================== ADDRESSES ====================
  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
    if (this.showAddressForm) {
      this.newAddress = { nombre: '', direccion: '', ciudad: '', telefono: '', principal: false };
    }
  }

  saveNewAddress() {
    if (this.newAddress.nombre && this.newAddress.direccion && this.newAddress.ciudad) {
      this.dataService.addAddress(this.newAddress);
      this.loadData();
      this.showAddressForm = false;
      this.newAddress = { nombre: '', direccion: '', ciudad: '', telefono: '', principal: false };
    }
  }

  deleteAddress(id: number) {
    this.dataService.deleteAddress(id);
    this.deleteConfirm = null;
    this.loadData();
  }

  // ==================== PAYMENTS ====================
  togglePaymentForm() {
    this.showPaymentForm = !this.showPaymentForm;
    if (this.showPaymentForm) {
      this.newPayment = { tipo: 'Tarjeta', marca: '', ultimosDigitos: '', expira: '', principal: false };
    }
  }

  saveNewPayment() {
    if (this.newPayment.marca && this.newPayment.ultimosDigitos && this.newPayment.expira) {
      this.dataService.addPayment(this.newPayment);
      this.loadData();
      this.showPaymentForm = false;
      this.newPayment = { tipo: 'Tarjeta', marca: '', ultimosDigitos: '', expira: '', principal: false };
    }
  }

  deletePayment(id: number) {
    this.dataService.deletePayment(id);
    this.deleteConfirm = null;
    this.loadData();
  }

  // ==================== LOGOUT ====================
  logout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      this.authService.logout();
    }
  }
}
