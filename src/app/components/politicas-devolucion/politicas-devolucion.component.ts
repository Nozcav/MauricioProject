import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-politicas-devolucion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './politicas-devolucion.component.html',
  styleUrl: './politicas-devolucion.component.css'
})
export class PoliticasDevolucionComponent {
  politicas = [
    {
      titulo: 'Devoluciones',
      icono: '🔄',
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
      icono: '↔️',
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
      icono: '💰',
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
      icono: '⚠️',
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
      icono: '📋',
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
      icono: '🚫',
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
      icono: '🛡️'
    },
    {
      titulo: 'Mantenimiento Gratuito',
      descripcion: 'Incluimos un año de mantenimiento gratuito: limpieza profesional y revisión de engarces.',
      icono: '✨'
    },
    {
      titulo: 'Certificado de Autenticidad',
      descripcion: 'Cada pieza incluye un certificado que avala la calidad de los materiales.',
      icono: '📜'
    },
    {
      titulo: 'Seguro de Envío',
      descripcion: 'Todos nuestros envíos están asegurados contra pérdida o daño durante el transporte.',
      icono: '📦'
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
