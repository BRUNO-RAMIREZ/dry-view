import {Component, OnInit} from '@angular/core';
import {UserGetByEmailResponse} from "../../../../core/models/user.model";
import {Router} from "@angular/router";
import {UsuariosService} from "../../../usuarios/services/usuarios.service";
import {ToastrService} from "ngx-toastr";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-form-change-password',
  templateUrl: './form-change-password.component.html',
  styleUrls: ['./form-change-password.component.scss']
})
export class FormChangePasswordComponent implements OnInit {
  public passwordNew: string;
  public passwordConfirm: string;
  public userGetByEmailResponse: UserGetByEmailResponse;

  constructor(private _router: Router,
              private _usersService: UsuariosService,
              private _tostrService: ToastrService) {
    this.passwordNew = '';
    this.passwordConfirm = '';
    this.userGetByEmailResponse = {
      id: 0,
      name: '',
      lastName: '',
      email: '',
      phone: 0,
      username: '',
      password: '',
      image: ''
    }
    const payload = this._router.getCurrentNavigation()?.extras?.state;
    if (payload && payload.userFound) {
      this.userGetByEmailResponse = {...payload.userFound};
    }
  }

  ngOnInit(): void {
  }

  public changePassword(): void {
    if (this._validatePassword()) {
      this._usersService.changePasswordByUserId(this.userGetByEmailResponse.id, this.passwordNew)
        .pipe(first())
        .subscribe(() => {
          this._tostrService.success('El cambio de contraseña fue realizado correctamente', 'Exito');
          this._router.navigate(['/auth'])
      });
    }
  }

  private _validatePassword(): boolean {
    const isValid = false;
    if (this.passwordNew.trim().length !== 0 && this.passwordConfirm.trim().length !== 0) {
      if (this.passwordNew !== this.passwordConfirm) {
        this._tostrService.error('Las contraseñas son diferentes', 'Error');
        return isValid;
      }
      return !isValid
    }
    this._tostrService.error('No se permite campos vacios', 'Error');
    return isValid;
  }
}
