import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
@Component({
  selector: 'app-ventana-confirmacion',
  templateUrl: './ventana-confirmacion.component.html',
  styleUrls: ['./ventana-confirmacion.component.scss']
})
export class VentanaConfirmacionComponent implements OnInit {

  constructor(public dialogo: MatDialogRef<VentanaConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

  ngOnInit(): void {
  }
  public cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  public confirmado(): void {
    this.dialogo.close(true);
  }
}
