import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  ProductCreateRequest,
  ProductCreateResponse,
  ProductUpdateRequest,
  ProductUpdateResponse
} from "../../../../core/models/product.model";
import {Subject} from "rxjs";
import {ProductosService} from "../../../productos/services/productos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {filter, switchMap, take} from "rxjs/operators";
import {UsuariosService} from "../../../usuarios/services/usuarios.service";
import {UserCreateRequest, UserCreateResponse} from "../../../../core/models/user.model";

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {
  public formularyUser!: FormGroup;
  public imageData: string;

  constructor(private _usersService: UsuariosService,
              private _formsBuilder: FormBuilder,
              private _activateRoute: ActivatedRoute,
              private _router: Router,
              private _toastrService: ToastrService) {
    this.imageData = '';
    this._validate();
  }

  ngOnInit(): void {
  }

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
      image: this.imageData ? this.imageData : '../../../../../assets/image-default.jpg'
    }
    return user;
  }


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
        Validators.min(0),
        Validators.pattern(/^\+?\d{10,14}$/)
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
        Validators.maxLength(40)
      ]
      ],
      image: ['', [Validators.required]],
    });
  }
}
