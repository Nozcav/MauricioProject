import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sobre-nosotros.component.html',
  styleUrl: './sobre-nosotros.component.css'
})
export class SobreNosotrosComponent {
  equipo = [
    {
      nombre: 'María García',
      cargo: 'Fundadora & Directora Creativa',
      descripcion: 'Con más de 20 años de experiencia en diseño de joyería de lujo.',
      imagen: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
    },
    {
      nombre: 'Carlos Rodríguez',
      cargo: 'Director de Producción',
      descripcion: 'Maestro joyero con especialización en técnicas artesanales europeas.',
      imagen: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
    },
    {
      nombre: 'Ana Martínez',
      cargo: 'Directora de Experiencia al Cliente',
      descripcion: 'Experta en servicio al cliente y satisfacción del comprador.',
      imagen: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
    }
  ];

  valores = [
    {
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13"/><path d="M13 3l3 6-4 13"/><path d="M2 9h20"/></svg>',
      titulo: 'Calidad Premium',
      descripcion: 'Solo utilizamos materiales de la más alta calidad, certificados y garantizados.'
    },
    {
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
      titulo: 'Diseño Exclusivo',
      descripcion: 'Cada pieza es única, diseñada por artistas joyeros de renombre internacional.'
    },
    {
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3-6 6"/><path d="m14 10-6 6"/><path d="m9 15-1.5 1.5a2.12 2.12 0 1 0 3 3l1.5-1.5"/><path d="m3 21 6-6"/></svg>',
      titulo: 'Confianza',
      descripcion: 'Más de 15 años de trayectoria nos respaldan con miles de clientes satisfechos.'
    },
    {
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
      titulo: 'Sostenibilidad',
      descripcion: 'Comprometidos con prácticas éticas y responsables con el medio ambiente.'
    }
  ];

  logros = [
    { numero: '15+', texto: 'Años de Experiencia' },
    { numero: '50K+', texto: 'Clientes Satisfechos' },
    { numero: '1000+', texto: 'Diseños Únicos' },
    { numero: '100%', texto: 'Satisfacción Garantizada' }
  ];
}
