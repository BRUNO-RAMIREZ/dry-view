import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'informacion',
    loadChildren: () => import('./modules/informacion-pagina/informacion-pagina.module').then(m => m.InformacionPaginaModule),
   
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./modules/notificaciones/notificaciones.module').then(m => m.NotificacionesModule),
    canActivate: [AuthGuard]
  }, 
  {
    path: 'informacionEdit',
    loadChildren: () => import('./modules/edicionInformacion/edicion-informacion.module').then(m => m.EdicionInformacionModule),
    canActivate: [AuthGuard]
  }, 

  {
    path: 'productos',
    loadChildren: () => import('./modules/productos/productos.module').then(m => m.ProductosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
 /*  {
   path: 'ventas',
    loadChildren: () => import('./modules/ventas/ventas.module').then(m => m.VentasModule)
  },*/  
  {
    path: 'ventas',
    loadChildren: () => import('./modules/ventas/ventas.module').then(m => m.VentasModule),
    canActivate: [AuthGuard]
  },
  
  {
    path: 'estadisticas',
    loadChildren: () => import('./modules/estadisticas/estadisticas.module').then(m => m.EstadisticasModule),
    canActivate:[AuthGuard]
  },
 /* {

    path: 'mi-cuenta',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },*/
  {
    path: '**',
    redirectTo: 'usuarios'
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
