import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponentesExampleComponent } from './view-componentes-example/view-componentes-example.component';
import { EliminarComponent } from './modules/users/eliminar/eliminar.component';
import { RegistrarComponent } from './modules/productos/registrar/registrar.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponentesExampleComponent,
    EliminarComponent,
    RegistrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
