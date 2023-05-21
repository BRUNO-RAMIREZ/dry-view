import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { InformacionPaginaRouterOutletComponent } from './pages/informacion-pagina-router-outlet/informacion-pagina-router-outlet.component';
import {InformacionPaginaRoutingModule} from './informacion-pagina-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ApartadoInformacionComponent } from './pages/apartado-informacion/apartado-informacion.component';

@NgModule({
  declarations: [
    InformacionPaginaRouterOutletComponent,
    ApartadoInformacionComponent
  ],
  imports: [
    CommonModule,
    InformacionPaginaRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
  ]
})
export class InformacionPaginaModule { }



;


