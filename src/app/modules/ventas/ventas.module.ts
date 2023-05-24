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
import { ProductosModule } from "../productos/productos.module";
import {FilterSearchPipe} from './pipes/filter-search.pipe';
import { SortByPipePipe } from './pipes/sort-by-pipe.pipe';
import {ModalComponent} from './components/modal/modal.component';
@NgModule({
    declarations: [
        VentasRouterOutletComponent,
        ListadoComponent,
        RegistroComponent,
        FilterSearchPipe,
        SortByPipePipe,
        ModalComponent
    ],
    imports: [
        CommonModule,
        VentasRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule,
        SharedModule,
        ProductosModule
    ]
})
export class VentasModule { }


