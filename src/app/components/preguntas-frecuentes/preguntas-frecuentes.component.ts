import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-preguntas-frecuentes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrl: './preguntas-frecuentes.component.css'
})
export class PreguntasFrecuentesComponent {
  constructor(private sanitizer: DomSanitizer) {}

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  categorias = [
    {
      nombre: 'Compras y Pedidos',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
      preguntas: [
        {
          pregunta: '¿Cómo puedo realizar un pedido?',
          respuesta: 'Puedes realizar tu pedido a través de nuestra tienda en línea. Simplemente navega por nuestras categorías, selecciona los productos que desees, añádelos al carrito y procede al pago. También puedes contactarnos por teléfono o email para asistencia personalizada.',
          abierta: false
        },
        {
          pregunta: '¿Qué métodos de pago aceptan?',
          respuesta: 'Aceptamos múltiples métodos de pago: tarjetas de crédito y débito (Visa, Mastercard, AMEX), PayPal, transferencias bancarias y pagos contra entrega en algunas zonas. Todos nuestros métodos de pago son 100% seguros.',
          abierta: false
        },
        {
          pregunta: '¿Puedo modificar o cancelar mi pedido?',
          respuesta: 'Sí, puedes modificar o cancelar tu pedido dentro de las primeras 24 horas después de realizarlo, siempre y cuando no haya sido enviado. Contáctanos inmediatamente si necesitas hacer cambios.',
          abierta: false
        },
        {
          pregunta: '¿Ofrecen opciones de financiamiento?',
          respuesta: 'Sí, ofrecemos planes de financiamiento sin intereses a 3, 6 y 12 meses con tarjetas de crédito participantes. Consulta las condiciones específicas durante el proceso de pago.',
          abierta: false
        }
      ]
    },
    {
      nombre: 'Envíos y Entregas',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
      preguntas: [
        {
          pregunta: '¿Cuál es el tiempo de entrega?',
          respuesta: 'El tiempo de entrega estándar es de 3-7 días hábiles dependiendo de tu ubicación. Para pedidos personalizados, el tiempo de producción es de 2-3 semanas adicionales. Ofrecemos envío express en 24-48 horas para zonas metropolitanas.',
          abierta: false
        },
        {
          pregunta: '¿Cuánto cuesta el envío?',
          respuesta: 'El envío es gratuito para compras superiores a $500. Para compras menores, el costo varía entre $50 y $150 dependiendo de la zona. El envío express tiene un costo adicional de $200.',
          abierta: false
        },
        {
          pregunta: '¿Hacen envíos internacionales?',
          respuesta: 'Sí, realizamos envíos a más de 50 países. Los tiempos de entrega varían entre 7-15 días hábiles y los costos se calculan según el destino y peso del paquete.',
          abierta: false
        },
        {
          pregunta: '¿Puedo rastrear mi pedido?',
          respuesta: 'Sí, una vez que tu pedido sea enviado, recibirás un correo electrónico con el número de seguimiento y un enlace para rastrear tu paquete en tiempo real.',
          abierta: false
        }
      ]
    },
    {
      nombre: 'Productos y Calidad',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13"/><path d="M13 3l3 6-4 13"/><path d="M2 9h20"/></svg>',
      preguntas: [
        {
          pregunta: '¿Sus joyas son de material genuino?',
          respuesta: 'Absolutamente. Todas nuestras joyas están fabricadas con materiales genuinos y certificados: oro de 10k, 14k y 18k, plata 925, y piedras preciosas certificadas. Cada pieza incluye un certificado de autenticidad.',
          abierta: false
        },
        {
          pregunta: '¿Ofrecen garantía en sus productos?',
          respuesta: 'Sí, todas nuestras joyas cuentan con garantía de por vida contra defectos de fabricación. Además, ofrecemos un año de mantenimiento gratuito que incluye limpieza profesional y revisión de engarces.',
          abierta: false
        },
        {
          pregunta: '¿Puedo personalizar una joya?',
          respuesta: '¡Por supuesto! Contamos con un servicio de diseño personalizado. Nuestros maestros joyeros trabajarán contigo para crear una pieza única según tus especificaciones. El tiempo de producción es de 2-4 semanas.',
          abierta: false
        },
        {
          pregunta: '¿Cómo debo cuidar mis joyas?',
          respuesta: 'Recomendamos guardar las joyas en un lugar seco y separadas entre sí. Evita el contacto con perfumes, cremas y productos químicos. Límpialas suavemente con un paño suave y llévalas a revisión profesional una vez al año.',
          abierta: false
        }
      ]
    },
    {
      nombre: 'Devoluciones y Cambios',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>',
      preguntas: [
        {
          pregunta: '¿Cuál es su política de devoluciones?',
          respuesta: 'Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que la joya esté en su estado original, sin usar y con su empaque y certificado originales. Las piezas personalizadas no son elegibles para devolución.',
          abierta: false
        },
        {
          pregunta: '¿Cómo puedo solicitar una devolución?',
          respuesta: 'Para solicitar una devolución, contacta a nuestro servicio al cliente con tu número de pedido. Te proporcionaremos una etiqueta de envío prepagada y las instrucciones para devolver la pieza.',
          abierta: false
        },
        {
          pregunta: '¿Cuánto tiempo tarda en procesarse un reembolso?',
          respuesta: 'Una vez que recibamos y verifiquemos la pieza devuelta, el reembolso se procesará en un plazo de 5-10 días hábiles. El tiempo puede variar según tu método de pago original.',
          abierta: false
        },
        {
          pregunta: '¿Puedo cambiar una joya por otra?',
          respuesta: 'Sí, ofrecemos cambios dentro de los 30 días posteriores a la compra. La nueva pieza debe tener un valor igual o superior. Si es superior, pagarás la diferencia. Si es inferior, recibirás un crédito para futuras compras.',
          abierta: false
        }
      ]
    },
    {
      nombre: 'Cuenta y Seguridad',
      icono: '<svg class="icon-lucide" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
      preguntas: [
        {
          pregunta: '¿Necesito crear una cuenta para comprar?',
          respuesta: 'No es obligatorio, pero crear una cuenta te permite guardar tus direcciones, ver el historial de pedidos, guardar productos favoritos y recibir ofertas exclusivas. El registro es gratuito y rápido.',
          abierta: false
        },
        {
          pregunta: '¿Es seguro comprar en su sitio?',
          respuesta: 'Absolutamente. Utilizamos encriptación SSL de 256 bits para proteger toda la información. No almacenamos datos de tarjetas de crédito y cumplimos con los más altos estándares de seguridad PCI-DSS.',
          abierta: false
        },
        {
          pregunta: '¿Qué hago si olvido mi contraseña?',
          respuesta: 'En la página de inicio de sesión, haz clic en "Olvidé mi contraseña". Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla. El enlace es válido por 24 horas.',
          abierta: false
        },
        {
          pregunta: '¿Cómo puedo actualizar mi información personal?',
          respuesta: 'Inicia sesión en tu cuenta y ve a "Mi Cuenta" > "Editar Perfil". Allí podrás actualizar tu nombre, dirección, número de teléfono y preferencias de comunicación.',
          abierta: false
        }
      ]
    }
  ];

  togglePregunta(categoriaIndex: number, preguntaIndex: number) {
    this.categorias[categoriaIndex].preguntas[preguntaIndex].abierta = 
      !this.categorias[categoriaIndex].preguntas[preguntaIndex].abierta;
  }
}
