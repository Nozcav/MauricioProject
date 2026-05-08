import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css', '../navbar/navbar.css']
})
export class TiendaComponent implements OnInit {
  productos: any[] = [];
  busquedaQuery = '';

  categorias = ['Todos', 'Anillos', 'Collares', 'Pulseras', 'Aretes', 'Relojes', 'Dijes', 'Charms', 'Sets'];
  categoriaSeleccionada = 'Todos';

  materiales = ['Todos', 'Oro', 'Plata', 'Oro Rosa', 'Acero', 'Perlas', 'Cristal', 'Cuero'];
  materialSeleccionado = 'Todos';

  rangosPrecio = [
    { label: 'Todos', min: 0, max: Infinity },
    { label: 'Hasta $50.000', min: 0, max: 50000 },
    { label: '$50.000 - $150.000', min: 50000, max: 150000 },
    { label: '$150.000 - $300.000', min: 150000, max: 300000 },
    { label: '$300.000+', min: 300000, max: Infinity }
  ];
  rangoPrecioSeleccionado = this.rangosPrecio[0];

  tiposJoyeria = ['Todos', 'Lujo', 'Clásico', 'Moderno', 'Elegante', 'Delicado', 'Romántico', 'Minimalista', 'Vintage', 'Casual'];
  tipoSeleccionado = 'Todos';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoria = params['categoria'];
      if (categoria) {
        this.categoriaSeleccionada = categoria.charAt(0).toUpperCase() + categoria.slice(1);
      }
    });

    this.route.queryParams.subscribe(queryParams => {
      const busqueda = queryParams['busqueda'];
      if (busqueda) {
        this.busquedaQuery = busqueda;
      }
    });

    // Load products from ProductService
    this.productos = this.productService.getProductos();
  }

  get productosFiltrados() {
    return this.productos.filter(p => {
      // Filter by search query
      const matchesBusqueda = !this.busquedaQuery || 
        p.nombre.toLowerCase().includes(this.busquedaQuery.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(this.busquedaQuery.toLowerCase()));
      
      const matchesCategoria = this.categoriaSeleccionada === 'Todos' || p.categoria === this.categoriaSeleccionada;
      const matchesMaterial = this.materialSeleccionado === 'Todos' || p.material === this.materialSeleccionado;
      const matchesPrecio = p.precio >= this.rangoPrecioSeleccionado.min && 
                           (this.rangoPrecioSeleccionado.max === Infinity || p.precio <= this.rangoPrecioSeleccionado.max);
      const matchesTipo = this.tipoSeleccionado === 'Todos' || p.tipo === this.tipoSeleccionado;
      
      return matchesBusqueda && matchesCategoria && matchesMaterial && matchesPrecio && matchesTipo;
    });
  }

  seleccionarCategoria(cat: string) {
    this.categoriaSeleccionada = cat;
  }

  seleccionarMaterial(material: string) {
    this.materialSeleccionado = material;
  }

  seleccionarRangoPrecio(rango: any) {
    this.rangoPrecioSeleccionado = rango;
  }

  seleccionarTipo(tipo: string) {
    this.tipoSeleccionado = tipo;
  }

  seleccionarOrden(event: Event) {
    const select = event.target as HTMLSelectElement;
    const orden = select.value;
    
    if (orden === 'precio-asc') {
      this.productos.sort((a, b) => a.precio - b.precio);
    } else if (orden === 'precio-desc') {
      this.productos.sort((a, b) => b.precio - a.precio);
    } else if (orden === 'nombre') {
      this.productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (orden === 'nuevos') {
      this.productos.sort((a, b) => b.id - a.id);
    }
  }

  get hayFiltrosActivos(): boolean {
    return this.categoriaSeleccionada !== 'Todos' ||
           this.materialSeleccionado !== 'Todos' ||
           this.tipoSeleccionado !== 'Todos' ||
           this.rangoPrecioSeleccionado.label !== 'Todos' ||
           !!this.busquedaQuery;
  }

  limpiarFiltros(): void {
    this.categoriaSeleccionada = 'Todos';
    this.materialSeleccionado = 'Todos';
    this.tipoSeleccionado = 'Todos';
    this.rangoPrecioSeleccionado = this.rangosPrecio[0];
    this.busquedaQuery = '';
  }

  addToCart(producto: any, event: Event): void {
    event.stopPropagation();
    this.dataService.addToCart(producto);
    this.notificationService.success(`¡${producto.nombre} agregado al carrito!`);
  }

  toggleFavorite(producto: any, event: Event): void {
    event.stopPropagation();
    this.dataService.toggleFavorite(producto);
  }

  isFavorite(productoId: number): boolean {
    return this.dataService.isFavorite(productoId);
  }

  formatPrice(value: number): string {
    return value?.toLocaleString('es-CO') || '0';
  }

  verProducto(productoId: number): void {
    this.router.navigate(['/producto', productoId]);
  }
}
