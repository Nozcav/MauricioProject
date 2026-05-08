import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-politicas-devolucion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './politicas-devolucion.component.html',
  styleUrl: './politicas-devolucion.component.css'
})
export class PoliticasDevolucionComponent {
  constructor(private sanitizer: DomSanitizer) {}

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  politicas = [
    {
      titulo: 'Devoluciones',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
      descripcion: 'Aceptamos devoluciones dentro de los 30 días posteriores a la compra.',
      detalles: [
        'La joya debe estar en su estado original, sin usar y sin daños.',
        'Debe incluir el empaque original, certificado de autenticidad y etiquetas.',
        'Las piezas personalizadas o grabadas no son elegibles para devolución.',
        'Los productos en oferta o liquidación tienen políticas especiales.',
        'El cliente debe cubrir el costo de envío de devolución, excepto en casos de defecto.'
      ]
    },
    {
      titulo: 'Cambios',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M17 2.1l4 4-4 4"/><path d="M3 12.2v-2a4 4 0 014-4h14"/><path d="M7 21.9l-4-4 4-4"/><path d="M21 11.8v2a4 4 0 01-4 4H3"/></svg>',
      descripcion: 'Ofrecemos cambios dentro de los 30 días posteriores a la compra.',
      detalles: [
        'La nueva pieza debe tener un valor igual o superior a la original.',
        'Si la nueva pieza es de mayor valor, se paga la diferencia.',
        'Si la nueva pieza es de menor valor, se otorga un crédito para futuras compras.',
        'La pieza original debe estar en perfectas condiciones.',
        'Solo se permite un cambio por compra.'
      ]
    },
    {
      titulo: 'Reembolsos',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
      descripcion: 'Los reembolsos se procesan en un plazo de 5-10 días hábiles.',
      detalles: [
        'El reembolso se realiza al método de pago original.',
        'Para tarjetas de crédito, el tiempo puede variar según la entidad bancaria.',
        'Los gastos de envío originales no son reembolsables, excepto en casos de defecto.',
        'Se enviará un correo de confirmación cuando se procese el reembolso.',
        'En caso de devolución por defecto, se reembolsa el 100% incluyendo envío.'
      ]
    },
    {
      titulo: 'Productos Defectuosos',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      descripcion: 'Garantizamos la calidad de todas nuestras piezas.',
      detalles: [
        'Reporta cualquier defecto dentro de las 48 horas posteriores a la recepción.',
        'Envía fotos del defecto para agilizar el proceso.',
        'Cubrimos todos los costos de envío para productos defectuosos.',
        'Ofrecemos reparación gratuita, cambio o reembolso completo.',
        'Nuestra garantía cubre defectos de fabricación de por vida.'
      ]
    },
    {
      titulo: 'Proceso de Devolución',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
      descripcion: 'Sigue estos pasos para iniciar una devolución.',
      detalles: [
        'Paso 1: Contacta a nuestro servicio al cliente con tu número de pedido.',
        'Paso 2: Recibirás un número de autorización de devolución (RMA).',
        'Paso 3: Empaqueta la joya de forma segura con todos sus accesorios.',
        'Paso 4: Envía el paquete a la dirección proporcionada.',
        'Paso 5: Recibirás confirmación cuando procesemos tu devolución.'
      ]
    },
    {
      titulo: 'Excepciones',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
      descripcion: 'Algunos productos no son elegibles para devolución.',
      detalles: [
        'Joyas personalizadas o con grabados especiales.',
        'Productos comprados durante promociones de liquidación final.',
        'Piezas que hayan sido modificadas por terceros.',
        'Joyas con signos de uso excesivo o maltrato.',
        'Productos sin empaque original o certificado de autenticidad.'
      ]
    }
  ];

  garantias = [
    {
      titulo: 'Garantía de Por Vida',
      descripcion: 'Todas nuestras joyas cuentan con garantía de por vida contra defectos de fabricación.',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
    },
    {
      titulo: 'Mantenimiento Gratuito',
      descripcion: 'Incluimos un año de mantenimiento gratuito: limpieza profesional y revisión de engarces.',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.937 8.5l1.582-6.135a.5.5 0 01.963 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.581a.5.5 0 010 .964L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>'
    },
    {
      titulo: 'Certificado de Autenticidad',
      descripcion: 'Cada pieza incluye un certificado que avala la calidad de los materiales.',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>'
    },
    {
      titulo: 'Seguro de Envío',
      descripcion: 'Todos nuestros envíos están asegurados contra pérdida o daño durante el transporte.',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>'
    }
  ];

  preguntasFrecuentes = [
    {
      pregunta: '¿Cuánto tiempo tengo para hacer una devolución?',
      respuesta: 'Tienes 30 días calendario desde la fecha de recepción del producto para solicitar una devolución.',
      abierta: false
    },
    {
      pregunta: '¿Quién paga el envío de devolución?',
      respuesta: 'El cliente cubre el costo del envío de devolución, excepto en casos donde el producto llegó defectuoso o incorrecto.',
      abierta: false
    },
    {
      pregunta: '¿Puedo devolver una joya personalizada?',
      respuesta: 'Las joyas personalizadas o con grabados especiales no son elegibles para devolución, salvo que presenten defectos de fabricación.',
      abierta: false
    },
    {
      pregunta: '¿Qué hago si mi joya llegó dañada?',
      respuesta: 'Contacta inmediatamente a nuestro servicio al cliente con fotos del daño. Organizaremos la recogida y te enviaremos una nueva pieza o te haremos un reembolso completo.',
      abierta: false
    }
  ];

  togglePregunta(index: number) {
    this.preguntasFrecuentes[index].abierta = !this.preguntasFrecuentes[index].abierta;
  }
}
