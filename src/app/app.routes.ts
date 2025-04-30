import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then(m => m.InicioPage)
  },
  {
    path: 'canciones',
    loadComponent: () => import('./pages/canciones/canciones.page').then(m => m.CancionesPage)
  },
  {
    path: 'cancion/:id',
    loadComponent: () => import('./pages/canciones/cancion/cancion.page').then(m => m.CancionPage)
  },
  {
    path: 'listas',
    loadComponent: () => import('./pages/listas/listas.page').then(m => m.ListasPage)
  },
  {
    path: 'lista/:id',
    loadComponent: () => import('./pages/listas/lista/lista.page').then(m => m.ListaPage)
  }
];
