import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UsuariosService } from '../../services/usuarios.service';
@Component({
  selector: 'app-informacion-cuenta',
  templateUrl: './informacion-cuenta.component.html',
  styleUrls: ['./informacion-cuenta.component.scss']
})
export class InformacionCuentaComponent implements OnInit {
  correo: string;
  usuario: any;
  puntitos: string[] = [];
  constructor(private authService: AuthService, private usuariosService: UsuariosService) { 
    this.correo = "";
  }

  ngOnInit(): void {
   let aux = this.authService.getAuthToken();
  
    if(aux){
      this.correo = aux;
    }
    //this.correo = this.authService.getAuthToken();
    console.log(this.correo);
     this.usuariosService.getUserByEmail(this.correo).subscribe(response => {this.usuario = response;
    for(let i=0; i<this.usuario.password.length; i++){
      this.puntitos.push("*");
    }
  });

    // console.log(this.usuario.email);
  }

}
    //this.user = this.authService.getCredentials();
    //const credentials = this.authService.getCredentials();
    //this.email = credentials.username;

    //const credentials = this.authService.getCredentials();
    //console.log(credentials);