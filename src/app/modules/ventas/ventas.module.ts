import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from "ngx-pagination";
import { VentasRouterOutletComponent } from './pages/ventas-router-outlet/ventas-router-outlet.component';
import {RouterModule} from "@angular/router";
import {VentasRoutingModule} from './ventas-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ListadoComponent } from './pages/listado/listado.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { FilterSearchPipe } from './pipes/filter-search.pipe';

@NgModule({
  declarations: [
    VentasRouterOutletComponent,
    ListadoComponent,
    RegistroComponent,
    FilterSearchPipe
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        NgxPaginationModule,
  ]
})
export class VentasModule { }


