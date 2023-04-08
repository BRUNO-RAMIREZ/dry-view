import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";

import {SharedModule} from "../../shared/shared.module";
import {ProductosRoutingModule} from './productos-routing.module';
import {ListadoComponent} from './pages/listado/listado.component';
import {EditarComponent} from './pages/editar/editar.component';
import {RegistrarComponent} from './pages/registrar/registrar.component';
import {HomeComponent} from './pages/home/home.component';
import {ProductosService} from "./services/productos.service";
import {ReactiveFormsModule} from "@angular/forms";
import {EliminarComponent} from './components/eliminar/eliminar.component';
import {FilterSearchPipe} from './pipes/filter-search.pipe';
import {SortByPipe} from './pipes/sort-by.pipe';


@NgModule({
  declarations: [
    HomeComponent,
    ListadoComponent,
    EditarComponent,
    RegistrarComponent,
    EliminarComponent,
    FilterSearchPipe,
    SortByPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ProductosRoutingModule,
    RouterModule,
    NgxPaginationModule
  ],
  providers: [
    ProductosService
  ]
})
export class ProductosModule {
}
