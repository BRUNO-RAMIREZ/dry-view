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
    path: 'productos',
    loadChildren: () => import('./modules/productos/productos.module').then(m => m.ProductosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./modules/estadisticas/estadisticas.module').then(m => m.EstadisticasModule)
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
