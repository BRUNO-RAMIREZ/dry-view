import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ButtonModule } from 'ngx-dry';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponentesExampleComponent } from './view-componentes-example/view-componentes-example.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponentesExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
