import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  formulario = {
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  };

  asuntos = [
    'Consulta sobre productos',
    'Estado de mi pedido',
    'Devolución o cambio',
    'Personalización de joyas',
    'Cotización para eventos',
    'Otro'
  ];

  oficinas = [
    {
      ciudad: 'Ciudad de México',
      direccion: 'Av. Paseo de la Reforma 250, Col. Juárez',
      telefono: '+52 55 1234 5678',
      email: 'cdmx@luxejoyas.com',
      horario: 'Lun - Vie: 9:00 - 19:00, Sáb: 10:00 - 14:00'
    },
    {
      ciudad: 'Guadalajara',
      direccion: 'Av. Vallarta 1234, Col. Americana',
      telefono: '+52 33 8765 4321',
      email: 'gdl@luxejoyas.com',
      horario: 'Lun - Vie: 9:00 - 19:00, Sáb: 10:00 - 14:00'
    },
    {
      ciudad: 'Monterrey',
      direccion: 'Av. Constitución 567, Col. Centro',
      telefono: '+52 81 2468 1357',
      email: 'mty@luxejoyas.com',
      horario: 'Lun - Vie: 9:00 - 19:00, Sáb: 10:00 - 14:00'
    }
  ];

  faqs = [
    {
      pregunta: '¿Cuál es el tiempo de entrega?',
      respuesta: 'El tiempo de entrega varía entre 3-7 días hábiles dependiendo de tu ubicación. Para pedidos personalizados, el tiempo puede extenderse a 2-3 semanas.'
    },
    {
      pregunta: '¿Ofrecen garantía en sus productos?',
      respuesta: 'Sí, todas nuestras joyas cuentan con garantía de por vida contra defectos de fabricación. Además, ofrecemos un servicio de mantenimiento gratuito durante el primer año.'
    },
    {
      pregunta: '¿Puedo personalizar una joya?',
      respuesta: '¡Por supuesto! Contamos con un servicio de diseño personalizado. Nuestros expertos trabajarán contigo para crear la pieza perfecta según tus especificaciones.'
    }
  ];

  enviarFormulario() {
    console.log('Formulario enviado:', this.formulario);
    alert('¡Gracias por contactarnos! Te responderemos en las próximas 24 horas.');
    this.formulario = {
      nombre: '',
      email: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    };
  }
}
