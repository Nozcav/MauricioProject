import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  { 
    path: 'tienda', 
    loadComponent: () => import('./components/tienda/tienda.component').then(m => m.TiendaComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'anillos', 
    loadComponent: () => import('./components/tienda/tienda.component').then(m => m.TiendaComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'collares', 
    loadComponent: () => import('./components/tienda/tienda.component').then(m => m.TiendaComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'pulseras', 
    loadComponent: () => import('./components/tienda/tienda.component').then(m => m.TiendaComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'aretes', 
    loadComponent: () => import('./components/tienda/tienda.component').then(m => m.TiendaComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'relojes', 
    loadComponent: () => import('./components/tienda/tienda.component').then(m => m.TiendaComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'dijes', 
    loadComponent: () => import('./components/tienda/tienda.component').then(m => m.TiendaComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'producto/:id', 
    loadComponent: () => import('./components/producto/producto.component').then(m => m.ProductoComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'carrito', 
    loadComponent: () => import('./components/carrito/carrito.component').then(m => m.CarritoComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'mi-cuenta', 
    loadComponent: () => import('./components/mi-cuenta/mi-cuenta.component').then(m => m.MiCuentaComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'sobre-nosotros', 
    loadComponent: () => import('./components/sobre-nosotros/sobre-nosotros.component').then(m => m.SobreNosotrosComponent)
  },
  { 
    path: 'contacto', 
    loadComponent: () => import('./components/contacto/contacto.component').then(m => m.ContactoComponent)
  },
  { 
    path: 'preguntas-frecuentes', 
    loadComponent: () => import('./components/preguntas-frecuentes/preguntas-frecuentes.component').then(m => m.PreguntasFrecuentesComponent)
  },
  { 
    path: 'politicas-devolucion', 
    loadComponent: () => import('./components/politicas-devolucion/politicas-devolucion.component').then(m => m.PoliticasDevolucionComponent)
  },
  { 
    path: '**', 
    redirectTo: ''
  }
];
