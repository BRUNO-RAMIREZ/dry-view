
import {Component,DoCheck, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



import {
  UserCreateRequest,
  UserCreateResponse,
  UserUpdateRequest, 
  UserUpdateResponse
} from "../../../../core/models/user.model";
import { Subject } from "rxjs";
import { ProductosService } from "../../../productos/services/productos.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { filter, switchMap, take } from "rxjs/operators";
import { UsuariosService } from "../../../usuarios/services/usuarios.service";

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
  public formularyUser!: FormGroup;
  public imageData: string;
  public isPasswordVisible: boolean;
  public textIconEye: string;
  public userUpdateRequest: UserUpdateRequest;

  
  constructor(private _usersService: UsuariosService,
    private _formsBuilder: FormBuilder,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private _toastrService: ToastrService
    ) {
      this.userUpdateRequest = {
        id: 0,
        name: '',
        lastName: '',
        email: '',
        phone: 0,
        username: '',
        password: '',
        image: '',
      }
    this.imageData = '';
    this.isPasswordVisible = false;
    this.textIconEye = 'visibility_off';

    this._validate();
  }

  ngOnInit(): void {
  }

  /*public createUser(): void {
    if (this.userUpdateRequest.id) { 
      const UserUpdateRequest: UserUpdateRequest = {
        ...this.formularyUser.value,
        id: this.userUpdateRequest.id,
        image: this.imageData
      };
      this._usersService.updateUser(UserUpdateRequest)
        .pipe(take(1))
        .subscribe(
          (response: UserUpdateResponse) => {
            this._toastrService.warning(`${response.name} actualizado con éxito`, 'Actualizar')
            this.redirectToWindowLogin();
          },
          (error) => {
            this._toastrService.error(`Ocurrió un error al actualizar el usuarios`)
          });
    } else {
      if (this.formularyUser.valid) {
        const user = this._buildUser();
        this._usersService.createUser(user)
          .pipe(take(1))
          .subscribe(
            (response: UserCreateResponse) => {
              this._toastrService.success(`${response.name} registrado con éxito`, 'Registrar')
              this.redirectToWindowLogin();
            },
            (error) => {
              this._toastrService.error(`Ocurrió un error al registrar el producto`)
            });
        this.formularyUser.reset();
      }
    }
  }*/
    public createUser(): void {
    const user = this._buildUser();
    this._usersService.createUser(user)
      .pipe(take(1))
      .subscribe(
        (response: UserCreateResponse) => {
          this._toastrService.success(`${response.name} se ha registrado con éxito`, 'Registrar')
          this.redirectToWindowLogin();
        },
        (error) => {
          this._toastrService.error(`Ocurrió un error al registrar el usuario`, 'Error')
        });
    this.formularyUser.reset();
  }



  public onFileSelected(event: any): void {
    const files: FileList | null = event?.target?.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

  public redirectToWindowLogin(): void {
    this._router.navigate(['/auth']);
  }
  private _buildUser(): UserCreateRequest {
    const formValue = this.formularyUser.value;
    const user: UserCreateRequest = {
      name: formValue.name,
      lastName: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone,
      username: formValue.username,
      password: formValue.password,
      image: this.imageData ? this.imageData : '../../../assets/person-default.jpg'
    }
    return user;
  }
  /*
  get nombre() {
    return this.formularyUser.get('name')
  }

  get lastname() {
    return this.formularyUser.get('lastname')
  }

  get email() {
    return this.formularyUser.get('email')
  }

  get phone() {
    return this.formularyUser.get('phone')
  }

  get user() {
    return this.formularyUser.get('user')
  }
  get password() {
    return this.formularyUser.get('password')
  }
  */

  private _validate(): void {
    this.formularyUser = this._formsBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$')
      ]
      ],
      lastName: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80),
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$')
      ]
      ],
      email: ['', [
        Validators.required,
        Validators.email,
      ]
      ],
      phone: [0, [
        Validators.required,
        Validators.pattern('^([6-7][0-9]{7})$')
      ]
      ],
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ]
      ],
      image: ['', [Validators.required]],
    });
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'e') {
      event.preventDefault();
    }
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.textIconEye = this.isPasswordVisible? 'visibility': 'visibility_off';
  }
}
