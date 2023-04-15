import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {ToastrModule, ToastrService} from "ngx-toastr";

import {SharedModule} from "../../shared/shared.module";
import {ProductosRoutingModule} from './productos-routing.module';
import {ListadoComponent} from './pages/listado/listado.component';
import {EditarComponent} from './pages/editar/editar.component';
import {RegistrarComponent} from './pages/registrar/registrar.component';
import {HomeRouterOutletComponent} from './pages/home-router-outlet/home-router-outlet.component';
import {ProductosService} from "./services/productos.service";
import {ReactiveFormsModule} from "@angular/forms";
import {ModalComponent} from './components/modal/modal.component';
import {FilterSearchPipe} from './pipes/filter-search.pipe';
import {SortByPipe} from './pipes/sort-by.pipe';
import {HomeComponent} from "./pages/home/home.component";
import {CardComponent} from './components/card/card.component';
import {ChangeColorDirective} from './directives/change-color.directive';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    HomeRouterOutletComponent,
    HomeComponent,
    ListadoComponent,
    EditarComponent,
    RegistrarComponent,
    ModalComponent,
    FilterSearchPipe,
    SortByPipe,
    CardComponent,
    ChangeColorDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ProductosRoutingModule,
    RouterModule,
    NgxPaginationModule,
  ],
  providers: [
    ProductosService,
    ToastrService
  ]
})

export class ProductosModule {
}
