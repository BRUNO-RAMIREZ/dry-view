import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {NotificacionesRouterOutletComponent} from './pages/notificaciones-router-outlet/notificaciones-router-outlet.component';

const routes: Routes = [
  {
    path: 'estadisticas',
    component: NotificacionesRouterOutletComponent,
    children: [
      /*{path: '', component: },
      {path: '', component: },
      {path: '', component: },
      {path: '', component: },
      {path: '**', redirectTo: 'login'}*/
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacionesRoutingModule { }
