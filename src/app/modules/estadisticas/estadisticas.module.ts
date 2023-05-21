import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {EstadisticasRoutingModule} from './estadisticas-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { EstadisticasRouterOutletComponent } from './pages/estadisticas-router-outlet/estadisticas-router-outlet.component';
import { HomeEstadisticasComponent } from './pages/home-estadisticas/home-estadisticas.component';

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
  ]
})
export class EstadisticasModule { }


