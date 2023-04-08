import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import {ProductModel} from '../../core/models/product.model';
@Component({
  selector: 'app-ventana-confirmacion',
  templateUrl: './ventana-confirmacion.component.html',
  styleUrls: ['./ventana-confirmacion.component.scss']
})
export class VentanaConfirmacionComponent implements OnInit {

  constructor(public dialogo: MatDialogRef<VentanaConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public datos:{mensaje:string,pro:ProductModel}) {}
   
  ngOnInit(): void {
  }
  public cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  public confirmado(): void {
    this.dialogo.close(true);
  }
}
