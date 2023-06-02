import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {EstadisticasRoutingModule} from './estadisticas-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { EstadisticasRouterOutletComponent } from './pages/estadisticas-router-outlet/estadisticas-router-outlet.component';
import { HomeEstadisticasComponent } from './pages/home-estadisticas/home-estadisticas.component';
import {EstadisticasService} from './services/estadisticas.service';
import {ProductosService} from '../productos/services/productos.service';
@NgModule({
  declarations: [
    EstadisticasRouterOutletComponent,
    HomeEstadisticasComponent
  ],
  imports: [
        CommonModule,
        EstadisticasRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        
  ],
  providers: [
    EstadisticasService,
    ProductosService
  ]
})
export class EstadisticasModule { }


