import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarInformacionComponent} from './pages/editar-informacion/editar-informacion.component';
import { EditarInformacionRouterOutletComponent} from './pages/editar-informacion-router-outlet/editar-informacion-router-outlet.component';
import {EditarInformacionRoutingModule} from './edicion-informacion-routing.module';

import {RouterModule} from "@angular/router";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";



@NgModule({
  declarations: [EditarInformacionComponent,
    EditarInformacionRouterOutletComponent],
  imports: [
    CommonModule,
    EditarInformacionRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class EdicionInformacionModule { }
