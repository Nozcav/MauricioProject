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
      imagen: '👩‍💼'
    },
    {
      nombre: 'Carlos Rodríguez',
      cargo: 'Director de Producción',
      descripcion: 'Maestro joyero con especialización en técnicas artesanales europeas.',
      imagen: '👨‍💼'
    },
    {
      nombre: 'Ana Martínez',
      cargo: 'Directora de Experiencia al Cliente',
      descripcion: 'Experta en servicio al cliente y satisfacción del comprador.',
      imagen: '👩‍💼'
    }
  ];

  valores = [
    {
      icono: '💎',
      titulo: 'Calidad Premium',
      descripcion: 'Solo utilizamos materiales de la más alta calidad, certificados y garantizados.'
    },
    {
      icono: '🎨',
      titulo: 'Diseño Exclusivo',
      descripcion: 'Cada pieza es única, diseñada por artistas joyeros de renombre internacional.'
    },
    {
      icono: '🤝',
      titulo: 'Confianza',
      descripcion: 'Más de 15 años de trayectoria nos respaldan con miles de clientes satisfechos.'
    },
    {
      icono: '🌱',
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
