import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { MatSelectModule } from '@angular/material/select';
import {AppComponent} from './app.component';
import {ViewComponentesExampleComponent} from './view-componentes-example/view-componentes-example.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {AuthGuard} from "./guards/auth.guard";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete';





@NgModule({
  declarations: [
    AppComponent,
    ViewComponentesExampleComponent,
    
  
  ],
  imports:
   [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule, 
    ReactiveFormsModule,
    MatAutocompleteModule,
    
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule, // ToastrModule added
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
