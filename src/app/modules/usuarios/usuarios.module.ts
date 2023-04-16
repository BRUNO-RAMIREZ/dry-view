import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";

import {UsuariosRoutingModule} from './usuarios-routing.module';
import {RegistrarComponent} from './pages/registrar/registrar.component';
import { HomeRouterOutletComponent } from './pages/home-router-outlet/home-router-outlet.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    RegistrarComponent,
    HomeRouterOutletComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule {
}
