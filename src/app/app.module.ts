import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponentesExampleComponent } from './view-componentes-example/view-componentes-example.component';
import { EliminarComponent } from './modules/users/eliminar/eliminar.component';
import { FormularioUsuarioComponent } from './modules/users/registrar/formulario-usuario/formulario-usuario.component';
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    ViewComponentesExampleComponent,
    EliminarComponent,
    FormularioUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
