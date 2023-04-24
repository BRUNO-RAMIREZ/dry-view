import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
/*import { UsuariosService } from '../services/usuarios.service';*/
@Component({
  selector: 'app-informacion-cuenta',
  templateUrl: './informacion-cuenta.component.html',
  styleUrls: ['./informacion-cuenta.component.scss']
})
export class InformacionCuentaComponent implements OnInit {
  public user: any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    //this.user = this.authService.getCredentials();
  }

}
    //this.user = this.authService.getCredentials();
    //const credentials = this.authService.getCredentials();
    //this.email = credentials.username;

    //const credentials = this.authService.getCredentials();
    //console.log(credentials);