import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasRouterOutletComponent } from './pages/ventas-router-outlet/ventas-router-outlet.component';
import {RouterModule} from "@angular/router";
import {VentasRoutingModule} from './ventas-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ListadoComponent } from './pages/listado/listado.component';
import { RegistroComponent } from './pages/registro/registro.component';

@NgModule({
  declarations: [
    VentasRouterOutletComponent,
    ListadoComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
  ]
})
export class VentasModule { }


