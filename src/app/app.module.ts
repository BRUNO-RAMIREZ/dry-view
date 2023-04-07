import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from'@angular/common/http';
import { AppComponent } from './app.component';
import { ViewComponentesExampleComponent } from './view-componentes-example/view-componentes-example.component';
import { EliminarComponent } from './modules/users/eliminar/eliminar.component';
import { RegistrarComponent } from './modules/productos/registrar/registrar.component';
import { FormularioUsuarioComponent } from './modules/users/registrar/formulario-usuario/formulario-usuario.component';
import {SharedModule} from "./shared/shared.module";
import { ListaProductosComponent } from './modules/productos/listado/lista-productos/lista-productos.component';
import { HomeComponent } from './modules/home/home.component';
import {AlifeFileToBase64Module} from 'alife-file-to-base64';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponentesExampleComponent,
    EliminarComponent,
    FormularioUsuarioComponent,
    ListaProductosComponent,
    EliminarComponent,
    RegistrarComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    AlifeFileToBase64Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
