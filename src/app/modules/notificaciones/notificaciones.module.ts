import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {NotificacionesRoutingModule} from './notificaciones-routing.module';
import { CommonModule } from '@angular/common';
import { NotificacionesRouterOutletComponent } from './pages/notificaciones-router-outlet/notificaciones-router-outlet.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ApartadoNotificacionesComponent } from './pages/apartado-notificaciones/apartado-notificaciones.component';
import {ProductosModule} from '../productos/productos.module';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    NotificacionesRouterOutletComponent,
    ApartadoNotificacionesComponent
  ],
  imports: [
    CommonModule,
    NotificacionesRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ProductosModule,
        NgxPaginationModule
  ]
})
export class NotificacionesModule { }


