import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from "../../shared/shared.module";
import {ProductosRoutingModule} from './productos-routing.module';
import {ListadoComponent} from './pages/listado/listado.component';
import {EditarComponent} from './pages/editar/editar.component';
import {RegistrarComponent} from './pages/registrar/registrar.component';
import {HomeComponent} from './pages/home/home.component';
import {ProductosService} from "./services/productos.service";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { EliminarComponent } from './components/eliminar/eliminar.component';


@NgModule({
  declarations: [
    HomeComponent,
    ListadoComponent,
    EditarComponent,
    RegistrarComponent,
    EliminarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ProductosRoutingModule,
    RouterModule
  ],
  providers: [
    ProductosService
  ]
})
export class ProductosModule {
}
