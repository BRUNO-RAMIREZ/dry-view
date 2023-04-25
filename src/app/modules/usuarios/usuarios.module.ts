import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";

import {UsuariosRoutingModule} from './usuarios-routing.module';
import {RegistrarComponent} from './pages/registrar/registrar.component';
import {HomeRouterOutletComponent} from './pages/home-router-outlet/home-router-outlet.component';
import {HomeComponent} from './pages/home/home.component';
import {FilterSearchPipe} from "./pipes/filter-search.pipe";
import {ProductosModule} from '../productos/productos.module';
import {SortByPipe} from "./pipes/sort-by.pipe";
import {NgxPaginationModule} from "ngx-pagination";
import {CardComponent} from "./components/card/card.component";
import {ProductosService} from "../productos/services/productos.service";
import {ListadoComponent} from './pages/listado/listado.component';
import {ModalComponent} from './components/modal/modal.component';

@NgModule({
  declarations: [
    RegistrarComponent,
    HomeRouterOutletComponent,
    HomeComponent,
    FilterSearchPipe,
    SortByPipe,
    CardComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsuariosRoutingModule,
    NgxPaginationModule,
    ProductosModule

  ],
  providers: [
    ProductosService
  ]
})
export class UsuariosModule {
}
