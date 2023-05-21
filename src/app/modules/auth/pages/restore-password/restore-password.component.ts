import {Component, OnInit} from '@angular/core';
import {UsuariosService} from "../../../usuarios/services/usuarios.service";
import {UserGetByEmailResponse} from "../../../../core/models/user.model";
import {ToastrService} from "ngx-toastr";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

  public email: string;

  constructor(private _userService: UsuariosService,
              private _toastrService: ToastrService,
              private _router: Router) {
    this.email = '';
  }

  ngOnInit(): void {
  }

  public findUserByEmail(): void {
    if (this._validateEmail()) {
      this._userService.getUserByEmail(this.email)
        .pipe(first())
        .subscribe(response => {
          this._router.navigate(['/auth/form-cambiar-contraseña'], {state: {userFound: response}});
        }, error => {
          this._toastrService.error('El email ingresado no se encuentra registrado', 'Error')
        });
    } else {
      this._toastrService.error('El email ingresado es inválido', 'Error');
    }
  }

  public navigateWindowLogin(): void {
    this._router.navigate(['/auth']);
  }

  private _validateEmail(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.email.trim().length !== 0 && regex.test(this.email);
  }
}
