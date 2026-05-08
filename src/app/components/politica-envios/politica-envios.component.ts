import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-politica-envios',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './politica-envios.component.html',
  styleUrl: './politica-envios.component.css'
})
export class PoliticaEnviosComponent {
  constructor(private sanitizer: DomSanitizer) {}

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  opciones_envio = [
    {
      nombre: 'Envío Estándar',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><rect width="15" height="13" x="1" y="3" rx="2"/><path d="M16 8h4l3 3v5a2 2 0 01-2 2h-1"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
      tiempo: '5-7 días hábiles',
      costo: 'Gratis para compras mayores a $500',
      descripcion: 'Envío confiable y seguro a toda la zona nacional.',
      detalles: [
        'Cobertura en toda la zona nacional',
        'Empaque profesional y seguro',
        'Número de seguimiento incluido',
        'Asegurado contra pérdida o daño',
        'Entrega en domicilio o punto de retiro'
      ]
    },
    {
      nombre: 'Envío Express',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>',
      tiempo: '2-3 días hábiles',
      costo: '$200 adicionales',
      descripcion: 'Entrega rápida para zonas metropolitanas.',
      detalles: [
        'Zonas metropolitanas únicamente',
        'Envío prioritario',
        'Empaque premium',
        'Rastreo en tiempo real',
        'Entrega antes de las 6 PM'
      ]
    },
    {
      nombre: 'Envío Same-Day',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9-9a9 9 0 00-9 9m9-9v9m9 0a9 9 0 01-9 9m9-9H3"/></svg>',
      tiempo: 'Mismo día hábil',
      costo: '$500',
      descripcion: 'Recibe tu joya el mismo día en zonas seleccionadas.',
      detalles: [
        'Solo en zona metropolitana central',
        'Pedido debe realizarse antes de las 11 AM',
        'Entrega entre 2 PM y 6 PM',
        'Empaque deluxe',
        'Personal dedicado'
      ]
    },
    {
      nombre: 'Envío Personalizado',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M9 12a3 3 0 106 0 3 3 0 00-6 0Z"/><path d="M9 2.16A7.12 7.12 0 0115 1h1a7 7 0 017 7v1a7.12 7.12 0 01-1.16 5.84M15 13H1"/></svg>',
      tiempo: 'A coordinar',
      costo: 'Según destino',
      descripcion: 'Soluciones de envío personalizadas para necesidades especiales.',
      detalles: [
        'Envíos corporativos',
        'Zonas rurales',
        'Entregas internacionales',
        'Empaques especiales',
        'Contacta a ventas para más información'
      ]
    }
  ];

  cobertura_zonas = [
    {
      zona: 'Zona Metropolitana',
      tiempo_std: '2-3 días',
      tiempo_express: '24 horas',
      costo: 'Gratis (mayor a $500)',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/></svg>'
    },
    {
      zona: 'Zona Centro',
      tiempo_std: '3-4 días',
      tiempo_express: '48 horas',
      costo: '$75 (mayor a $300)',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>'
    },
    {
      zona: 'Zona Interior',
      tiempo_std: '5-7 días',
      tiempo_express: '72 horas',
      costo: '$150 (mayor a $300)',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2.5"/></svg>'
    },
    {
      zona: 'Zona Rural',
      tiempo_std: '7-10 días',
      tiempo_express: 'No disponible',
      costo: 'Consultar',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>'
    }
  ];

  preguntasFrecuentes = [
    {
      pregunta: '¿Cuál es el tiempo de envío estándar?',
      respuesta: 'El envío estándar tarda de 5 a 7 días hábiles dependiendo de la zona geográfica. Los pedidos se procesan dentro de 24-48 horas y luego se envían con seguimiento completo.',
      abierta: false
    },
    {
      pregunta: '¿Es gratis el envío?',
      respuesta: 'El envío es gratis para compras mayores a $500. Para compras menores, el costo varía entre $75 y $150 según la zona. El envío express tiene un costo adicional de $200.',
      abierta: false
    },
    {
      pregunta: '¿Pueden entregar en un apartado postal?',
      respuesta: 'Sí, podemos enviar a apartados postales. Por favor selecciona esta opción durante el proceso de compra e incluye todos los datos requeridos.',
      abierta: false
    },
    {
      pregunta: '¿Qué pasa si no estoy en casa en el momento de la entrega?',
      respuesta: 'El distribuidor intentará hacer la entrega hasta 3 veces. Si no estás disponible, el paquete se devuelve a nuestro almacén y puedes programar una nueva fecha o recogerlo en nuestras oficinas.',
      abierta: false
    },
    {
      pregunta: '¿Hacen envíos internacionales?',
      respuesta: 'Sí, realizamos envíos a más de 50 países. Los tiempos varían de 10 a 30 días dependiendo del destino. Los costos se calculan con base en peso y destino. Contacta a nuestro equipo de ventas para una cotización.',
      abierta: false
    },
    {
      pregunta: '¿Cómo puedo rastrear mi pedido?',
      respuesta: 'Una vez que tu pedido sea enviado, recibirás un correo electrónico con el número de seguimiento. Puedes ingresar este número en nuestra plataforma o en la del transportista para rastrear tu paquete en tiempo real.',
      abierta: false
    },
    {
      pregunta: '¿Qué pasa si mi paquete llega dañado?',
      respuesta: 'Todos nuestros envíos están asegurados. Si recibes tu paquete dañado, contacta inmediatamente a nuestro servicio al cliente con fotos del daño. Cubriremos todos los costos de reenvío o haremos un reembolso completo.',
      abierta: false
    },
    {
      pregunta: '¿Puedo cambiar la dirección de entrega después de hacer la compra?',
      respuesta: 'Sí, siempre y cuando el pedido no haya sido enviado. Contacta a nuestro servicio al cliente dentro de las 24 horas posteriores a tu compra. Después de ese tiempo, el cambio no será posible.',
      abierta: false
    }
  ];

  beneficios = [
    {
      titulo: 'Empaque Premium',
      descripcion: 'Todas tus joyas se empaquetan en cajas elegantes con material protector de calidad.',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>'
    },
    {
      titulo: 'Seguro Incluido',
      descripcion: 'Todos los envíos están asegurados contra pérdida o daño durante el transporte.',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
    },
    {
      titulo: 'Rastreo 24/7',
      descripcion: 'Puedes monitorear tu pedido en tiempo real desde que sale de nuestro almacén.',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2.5"/></svg>'
    },
    {
      titulo: 'Múltiples Opciones',
      descripcion: 'Elige entre varios métodos de envío según tus necesidades y urgencia.',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>'
    }
  ];

  togglePregunta(index: number) {
    this.preguntasFrecuentes[index].abierta = !this.preguntasFrecuentes[index].abierta;
  }
}
