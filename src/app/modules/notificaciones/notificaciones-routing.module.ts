import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {NotificacionesRouterOutletComponent} from './pages/notificaciones-router-outlet/notificaciones-router-outlet.component';
import { ApartadoNotificacionesComponent } from './pages/apartado-notificaciones/apartado-notificaciones.component';

const routes: Routes = [
  {
    path: '',
    component: NotificacionesRouterOutletComponent,
    children: [
      {path: '', component: ApartadoNotificacionesComponent },

      {path: '**', redirectTo: 'login'}
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacionesRoutingModule { }
