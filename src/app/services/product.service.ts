import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productos = [
    // ANILLOS
    {
      id: 1,
      sku: 'LJ-ANIL-001',
      nombre: 'Anillo Esmeralda Trapiche',
      precio: 299000,
      precioAnterior: 399000,
      imagen: 'assets/img/productos/anillo-esmeralda-trapiche.jpg',
      badge: '🔥 Más Vendido',
      categoria: 'Anillos',
      material: 'Oro',
      tipo: 'Lujo'
    },
    {
      id: 9,
      sku: 'LJ-ANIL-002',
      nombre: 'Anillo Diamante Solitario',
      precio: 245000,
      imagen: 'assets/img/productos/anillo-diamante-solitario.jpg',
      badge: '⭐ Destacado',
      categoria: 'Anillos',
      material: 'Oro',
      tipo: 'Lujo'
    },
    {
      id: 10,
      sku: 'LJ-ANIL-003',
      nombre: 'Anillo Zafiro Celeste',
      precio: 199000,
      precioAnterior: 259000,
      imagen: 'assets/img/productos/anillo-zafiro-celeste.jpg',
      badge: '❤️ Favorito',
      categoria: 'Anillos',
      material: 'Plata',
      tipo: 'Elegante'
    },
    {
      id: 11,
      sku: 'LJ-ANIL-004',
      nombre: 'Anillo Rubí Colombiano',
      precio: 175000,
      imagen: 'assets/img/productos/anillo-rubi-colombiano.jpg',
      badge: '✨ Nuevo',
      categoria: 'Anillos',
      material: 'Oro Rosa',
      tipo: 'Romántico'
    },
    {
      id: 12,
      sku: 'LJ-ANIL-005',
      nombre: 'Anillo Esmeralda Ovalada',
      precio: 159000,
      imagen: 'assets/img/productos/anillo-esmeralda-ovalada.jpg',
      badge: '✨ Nuevo',
      categoria: 'Anillos',
      material: 'Oro',
      tipo: 'Clásico'
    },
    {
      id: 13,
      sku: 'LJ-ANIL-006',
      nombre: 'Anillo Topacio Imperial',
      precio: 135000,
      imagen: 'assets/img/productos/anillo-topacio-imperial.jpg',
      badge: '✨ Nuevo',
      categoria: 'Anillos',
      material: 'Plata',
      tipo: 'Moderno'
    },

    // COLLARES
    {
      id: 2,
      sku: 'LJ-COLL-001',
      nombre: 'Collar Esmeralda Cholita',
      precio: 189000,
      precioAnterior: 249000,
      imagen: 'assets/img/productos/collar-esmeralda-cholita.jpg',
      badge: '⭐ Destacado',
      categoria: 'Collares',
      material: 'Oro',
      tipo: 'Lujo'
    },
    {
      id: 14,
      sku: 'LJ-COLL-002',
      nombre: 'Collar Perlas del Pacífico',
      precio: 165000,
      precioAnterior: 219000,
      imagen: 'assets/img/productos/collar-perlas-del-pacifico.pjg.webp',
      badge: '❤️ Favorito',
      categoria: 'Collares',
      material: 'Perlas',
      tipo: 'Elegante'
    },
    {
      id: 15,
      sku: 'LJ-COLL-003',
      nombre: 'Collar Corazón Brillante',
      precio: 129000,
      imagen: 'assets/img/productos/corazon-brillante.jpg',
      badge: '✨ Nuevo',
      categoria: 'Collares',
      material: 'Oro',
      tipo: 'Romántico'
    },
    {
      id: 16,
      sku: 'LJ-COLL-004',
      nombre: 'Collar Cadena Fina',
      precio: 89000,
      imagen: 'assets/img/productos/collar-cadena-fina.jpg',
      badge: '✨ Nuevo',
      categoria: 'Collares',
      material: 'Plata',
      tipo: 'Minimalista'
    },
    {
      id: 17,
      sku: 'LJ-COLL-005',
      nombre: 'Collar Esmeralda Marquis',
      precio: 145000,
      precioAnterior: 189000,
      imagen: 'assets/img/productos/collar-esmeralda-marquis.pjg.webp',
      badge: '🏆 Premium',
      categoria: 'Collares',
      material: 'Oro',
      tipo: 'Lujo'
    },
    {
      id: 18,
      sku: 'LJ-COLL-006',
      nombre: 'Collar Lazo de Oro',
      precio: 99000,
      imagen: 'assets/img/productos/collar-lazo-de-oro.pjg.webp',
      badge: '✨ Nuevo',
      categoria: 'Collares',
      material: 'Oro',
      tipo: 'Moderno'
    },

    // PULSERAS
    {
      id: 3,
      sku: 'LJ-PULS-001',
      nombre: 'Pulsera Brazalete Esmeralda',
      precio: 149000,
      precioAnterior: 199000,
      imagen: 'assets/img/productos/pulsera-brazalete-esmeralda.jpg',
      badge: '❤️ Favorito',
      categoria: 'Pulseras',
      material: 'Oro',
      tipo: 'Lujo'
    },
    {
      id: 19,
      sku: 'LJ-PULS-002',
      nombre: 'Pulsera Cadena Torino',
      precio: 289000,
      precioAnterior: 359000,
      imagen: 'assets/img/productos/pulsera-brazalete-torino.jpg',
      badge: '🏆 Premium',
      categoria: 'Pulseras',
      material: 'Oro',
      tipo: 'Lujo'
    },
    {
      id: 20,
      sku: 'LJ-PULS-003',
      nombre: 'Pulsera Charm Esmeralda',
      precio: 79000,
      imagen: 'assets/img/productos/pulsera.charm-esmerlda.pjg.jpg',
      badge: '✨ Nuevo',
      categoria: 'Pulseras',
      material: 'Oro Rosa',
      tipo: 'Delicado'
    },
    {
      id: 21,
      sku: 'LJ-PULS-004',
      nombre: 'Pulsera Infinito',
      precio: 95000,
      imagen: 'assets/img/productos/pulsera-infinito.pjg.webp',
      badge: '✨ Nuevo',
      categoria: 'Pulseras',
      material: 'Plata',
      tipo: 'Moderno'
    },
    {
      id: 22,
      sku: 'LJ-PULS-005',
      nombre: 'Pulsera Perlas Barroquas',
      precio: 159000,
      imagen: 'assets/img/productos/pulsera-perlas-barroquas.pjg.webp',
      badge: '⭐ Destacado',
      categoria: 'Pulseras',
      material: 'Perlas',
      tipo: 'Elegante'
    },
    {
      id: 23,
      sku: 'LJ-PULS-006',
      nombre: 'Pulsera Cuero Artesanal',
      precio: 65000,
      imagen: 'assets/img/productos/pulsera-cuero-artesanal.pjg.webp',
      badge: '✨ Nuevo',
      categoria: 'Pulseras',
      material: 'Cuero',
      tipo: 'Casual'
    },

    // ARETES
    {
      id: 5,
      sku: 'LJ-ARET-001',
      nombre: 'Aretes Esmeralda Drops',
      precio: 79000,
      imagen: 'assets/img/productos/aretes-esmeralda-drop.jpg',
      badge: '✨ Nuevo',
      categoria: 'Aretes',
      material: 'Oro',
      tipo: 'Lujo'
    },
    {
      id: 24,
      sku: 'LJ-ARET-002',
      nombre: 'Aretes Argolla Colombiana',
      precio: 119000,
      precioAnterior: 159000,
      imagen: 'assets/img/productos/aretes-argolla-colombiana.pjg.webp',
      badge: '🔥 Más Vendido',
      categoria: 'Aretes',
      material: 'Oro',
      tipo: 'Clásico'
    },
    {
      id: 25,
      sku: 'LJ-ARET-003',
      nombre: 'Aretes Perla Graduada',
      precio: 99000,
      imagen: 'assets/img/productos/aretes-perla-graduada.pjg.webp',
      badge: '⭐ Destacado',
      categoria: 'Aretes',
      material: 'Perlas',
      tipo: 'Elegante'
    },
    {
      id: 26,
      sku: 'LJ-ARET-004',
      nombre: 'Aretes Diamante Finos',
      precio: 189000,
      precioAnterior: 249000,
      imagen: 'assets/img/productos/aretes-diamante-fino.pjg.png',
      badge: '🏆 Premium',
      categoria: 'Aretes',
      material: 'Oro',
      tipo: 'Lujo'
    },
    {
      id: 27,
      sku: 'LJ-ARET-005',
      nombre: 'Aretes Lazo Rosa',
      precio: 55000,
      imagen: 'assets/img/productos/aretes-lazo-rosa.jpg',
      badge: '✨ Nuevo',
      categoria: 'Aretes',
      material: 'Oro Rosa',
      tipo: 'Delicado'
    },
    {
      id: 28,
      sku: 'LJ-ARET-006',
      nombre: 'Aretes Chandelier',
      precio: 45000,
      imagen: 'assets/img/productos/aretes-chandelier.jpg',
      badge: '✨ Nuevo',
      categoria: 'Aretes',
      material: 'Plata',
      tipo: 'Elegante'
    },

    // RELOJES
    {
      id: 4,
      sku: 'LJ-RELO-001',
      nombre: 'Reloj Colombiano Luxury',
      precio: 459000,
      precioAnterior: 599000,
      imagen: 'assets/img/productos/reloj-luxury-colombiano.jpg',
      badge: '🏆 Premium',
      categoria: 'Relojes',
      material: 'Acero',
      tipo: 'Lujo'
    },
    {
      id: 29,
      sku: 'LJ-RELO-002',
      nombre: 'Reloj Rose Gold Dame',
      precio: 289000,
      precioAnterior: 349000,
      imagen: 'assets/img/productos/reloj-rose-dame-dame.jpg',
      badge: '❤️ Favorito',
      categoria: 'Relojes',
      material: 'Oro Rosa',
      tipo: 'Elegante'
    },
    {
      id: 30,
      sku: 'LJ-RELO-003',
      nombre: 'Reloj Minimalista',
      precio: 199000,
      imagen: 'assets/img/productos/reloj-minimalista.jpg',
      badge: '✨ Nuevo',
      categoria: 'Relojes',
      material: 'Cuero',
      tipo: 'Moderno'
    },
    {
      id: 31,
      sku: 'LJ-RELO-004',
      nombre: 'Reloj Inteligente Pro',
      precio: 329000,
      imagen: 'assets/img/productos/reloj-inteligente-pro.jpg',
      badge: '🏆 Premium',
      categoria: 'Relojes',
      material: 'Acero',
      tipo: 'Moderno'
    },
    {
      id: 32,
      sku: 'LJ-RELO-005',
      nombre: 'Reloj Clásico Dama',
      precio: 245000,
      imagen: 'assets/img/productos/reloj-clasico-dama.pjg.webp',
      badge: '⭐ Destacado',
      categoria: 'Relojes',
      material: 'Oro',
      tipo: 'Clásico'
    },

    // DIJES
    {
      id: 6,
      sku: 'LJ-DIJE-001',
      nombre: 'Dije Esmeralda Corazón',
      precio: 55000,
      imagen: 'assets/img/productos/dije-esmeralda-corazon.pjg.webp',
      badge: '✨ Nuevo',
      categoria: 'Dijes',
      material: 'Oro',
      tipo: 'Romántico'
    },
    {
      id: 33,
      sku: 'LJ-DIJE-002',
      nombre: 'Dije Cruz Esmeralda',
      precio: 45000,
      imagen: 'assets/img/productos/dije-cruz-esmeralda.jpg',
      badge: '❤️ Favorito',
      categoria: 'Dijes',
      material: 'Oro',
      tipo: 'Elegante'
    },
    {
      id: 34,
      sku: 'LJ-DIJE-003',
      nombre: 'Dije Corazón Piedra',
      precio: 65000,
      imagen: 'assets/img/productos/dije-corazon-piedra.jpg',
      badge: '✨ Nuevo',
      categoria: 'Dijes',
      material: 'Plata',
      tipo: 'Romántico'
    },
    {
      id: 35,
      sku: 'LJ-DIJE-004',
      nombre: 'Dije Estrella Luna',
      precio: 39000,
      imagen: 'assets/img/productos/dije-estrella-luna.jpg',
      badge: '✨ Nuevo',
      categoria: 'Dijes',
      material: 'Plata',
      tipo: 'Moderno'
    },
    {
      id: 36,
      sku: 'LJ-DIJE-005',
      nombre: 'Dije Infinito Rosa',
      precio: 49000,
      imagen: 'assets/img/productos/dije-infinito-rosa.jpg',
      badge: '✨ Nuevo',
      categoria: 'Dijes',
      material: 'Oro Rosa',
      tipo: 'Delicado'
    },

    // CHARMS
    {
      id: 7,
      sku: 'LJ-CHAR-001',
      nombre: 'Charm Esmeralda Mina',
      precio: 45000,
      imagen: 'assets/img/productos/charm-esmeralda-mina.jpg',
      badge: '✨ Nuevo',
      categoria: 'Charms',
      material: 'Oro',
      tipo: 'Lujo'
    },
    {
      id: 37,
      sku: 'LJ-CHAR-002',
      nombre: 'Charm Flor Loto',
      precio: 35000,
      imagen: 'assets/img/productos/charm-flor-loto.jpg',
      badge: '✨ Nuevo',
      categoria: 'Charms',
      material: 'Plata',
      tipo: 'Delicado'
    },
    {
      id: 38,
      sku: 'LJ-CHAR-003',
      nombre: 'Charm Corona Real',
      precio: 55000,
      imagen: 'assets/img/productos/charm-corona-real.pjg.webp',
      badge: '🏆 Premium',
      categoria: 'Charms',
      material: 'Oro',
      tipo: 'Lujo'
    },
    {
      id: 39,
      sku: 'LJ-CHAR-004',
      nombre: 'Charm Mariposa',
      precio: 39000,
      imagen: 'assets/img/productos/charm-mariposa.jpg',
      badge: '✨ Nuevo',
      categoria: 'Charms',
      material: 'Oro Rosa',
      tipo: 'Romántico'
    },
    {
      id: 40,
      sku: 'LJ-CHAR-005',
      nombre: 'Charm Corazón',
      precio: 42000,
      imagen: 'assets/img/productos/charm-corazon.jpg',
      badge: '❤️ Favorito',
      categoria: 'Charms',
      material: 'Plata',
      tipo: 'Romántico'
    },

    // SETS
    {
      id: 8,
      sku: 'LJ-SETS-001',
      nombre: 'Set Esmeralda Novia',
      precio: 389000,
      imagen: 'assets/img/productos/set-esmeralda-novia.jpg',
      badge: '✨ Nuevo',
      categoria: 'Sets',
      material: 'Oro',
      tipo: 'Lujo'
    },
    {
      id: 41,
      sku: 'LJ-SETS-002',
      nombre: 'Set Perla Graduada',
      precio: 249000,
      precioAnterior: 319000,
      imagen: 'assets/img/productos/set-perla-graduada.jpg',
      badge: '⭐ Destacado',
      categoria: 'Sets',
      material: 'Perlas',
      tipo: 'Elegante'
    },
    {
      id: 42,
      sku: 'LJ-SETS-003',
      nombre: 'Set Diamante Princess',
      precio: 299000,
      imagen: 'assets/img/productos/set-diamante-princess.jpg',
      badge: '🔥 Más Vendido',
      categoria: 'Sets',
      material: 'Oro',
      tipo: 'Lujo'
    },
    {
      id: 43,
      sku: 'LJ-SETS-004',
      nombre: 'Set Cadena Bohemia',
      precio: 159000,
      imagen: 'assets/img/productos/set-cadena-bohemia.jpg',
      badge: '✨ Nuevo',
      categoria: 'Sets',
      material: 'Plata',
      tipo: 'Moderno'
    },
    {
      id: 44,
      sku: 'LJ-SETS-005',
      nombre: 'Set Pulsera Rosa',
      precio: 179000,
      imagen: 'assets/img/productos/set-pulsera-rosa.jpg',
      badge: '✨ Nuevo',
      categoria: 'Sets',
      material: 'Oro Rosa',
      tipo: 'Romántico'
    }
  ];

  constructor() {}

  getProductos() {
    return this.productos;
  }

  getProductoById(id: number) {
    return this.productos.find(p => p.id === id);
  }

  getProductosPorCategoria(categoria: string) {
    if (categoria === 'Todos') {
      return this.productos;
    }
    return this.productos.filter(p => 
      p.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  searchProductos(query: string) {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();

    return this.productos.filter(producto => {
      const nombreMatch = producto.nombre.toLowerCase().includes(searchTerm);
      const skuMatch = producto.sku && producto.sku.toLowerCase().includes(searchTerm);
      const categoriaMatch = producto.categoria && producto.categoria.toLowerCase().includes(searchTerm);
      const materialMatch = producto.material && producto.material.toLowerCase().includes(searchTerm);

      return nombreMatch || skuMatch || categoriaMatch || materialMatch;
    }).slice(0, 8);
  }
}
