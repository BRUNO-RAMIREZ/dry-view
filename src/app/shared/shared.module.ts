import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VentanaConfirmacionComponent } from './ventana-confirmacion/ventana-confirmacion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    SidebarComponent,
    VentanaConfirmacionComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule, 
    BrowserAnimationsModule, 
    MatButtonModule,
  ],
  exports: [
    SidebarComponent,
  ],
  entryComponents: [
    VentanaConfirmacionComponent
  ]
})
export class SharedModule { }
