import { Component, OnInit } from '@angular/core';
import {UsuariosService}from '../../services/usuarios.service'
import {
  UserCreateRequest,
  UserCreateResponse,
  UserUpdateRequest, UserUpdateResponse
} from "../../../../core/models/user.model";
import {Subject} from "rxjs";
import {filter, switchMap, take} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

import { Directive, Input, DoCheck } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {FormBuilder, Validators} from "@angular/forms";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit, DoCheck{
  public formularyUsers!: FormGroup;
  public UserUpdateRequest: UserUpdateRequest;

  public title: string;
  public imageData: string;
  private _unsubscribed: Subject<void>;

  constructor(private UsuariosService: UsuariosService,
    private _formsBuilder: FormBuilder,
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private _toastrService: ToastrService) { 
      this.imageData = '';
    this.UserUpdateRequest = {
      id: 0,
      name: '',
      lastName: '',
      email: '',
      phone: 0,
      username: '',
      password: '',
      image: '',
    }
    this.title = '';
    this._unsubscribed = new Subject<void>();
    this._validate();
  }
  ngOnInit(): void {
    this._activateRoute.params
      .pipe(
        filter(params => params.hasOwnProperty('id')),
        switchMap(({id}) => this.UsuariosService.getUserById(id))
      ).subscribe(response => {
      this.UserUpdateRequest = response;
      this.imageData = this.UserUpdateRequest.image;
      this._validate();
    })
  }

  ngDoCheck(): void {
    this.title = this.UserUpdateRequest.id? 'Editar producto': 'Registrar producto';
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }

  public createProduct(): void {
    if (this.UserUpdateRequest.id) {
      const UserUpdateRequest: UserUpdateRequest = {
        ...this.formularyUsers.value,
        id: this.UserUpdateRequest.id,
        image: this.imageData
      };
      this.UsuariosService.updateUser(UserUpdateRequest)
        .pipe(take(1))
        .subscribe(
          (response: UserUpdateResponse) => {
            this._toastrService.warning(`${response.name} actualizado con éxito`, 'Actualizar')
            this.redirectToWindowProductList();
          },
          (error) => {
            this._toastrService.error(`Ocurrió un error al actualizar el producto`)
          });
    } else {
      if (this.formularyUsers.valid) {
        const product = this._buildProduct();
        this.UsuariosService.createUser(product)
          .pipe(take(1))
          .subscribe(
            (response: UserCreateResponse) => {
              this._toastrService.success(`${response.name} registrado con éxito`, 'Registrar')
              this.redirectToWindowProductList();
            },
            (error) => {
              this._toastrService.error(`Ocurrió un error al registrar el producto`)
            });
        this.formularyUsers.reset();
      }
    }
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

  public redirectToWindowProductList(): void {
    this._router.navigate(['/productos/listado']);
  }

  public verificarNum(event: any) {
    var ch = event.key;

    if (ch.charCodeAt(0) >= 48 && ch.charCodeAt(0) <= 57) {
      console.log("si es");
    } else {

      if (ch == 'e' || ch == 'E' || ch == '+' || ch == '-') {
        this.formularyUsers.setValue({});
      }
    }
  }

  private _buildProduct(): UserCreateRequest {
    const formValue = this.formularyUsers.value;
    const product: UserCreateRequest = {
      name: formValue.name,
      lastName: formValue.description,
      image: this.imageData ? this.imageData : '../../../../../assets/image-default.jpg',
      email: formValue.purchasePrice,
      phone: formValue.salePrice,
      username: formValue.stock,
      password:  formValue.stock,
    }
    return product;
  }

get nombre() {
  return this.formularyUsers.get('name')
}

get lastname() {
  return this.formularyUsers.get('lastname')
}

get email() {
  return this.formularyUsers.get('email')
}

get phone() {
  return this.formularyUsers.get('phone')
}

get user() {
  return this.formularyUsers.get('user')
}
get password() {
  return this.formularyUsers.get('password')
}
private _validate(): void {
  this.formularyUsers = this._formsBuilder.group({   
    name: [this.UserUpdateRequest.name ? this.UserUpdateRequest.name : '', [Validators.required, Validators.minLength(4), Validators.maxLength(80), Validators.pattern('[a-zA-Z ]')]],
    lastName: [this.UserUpdateRequest.lastName ? this.UserUpdateRequest.lastName : '', [Validators.required, Validators.minLength(4), Validators.maxLength(80), Validators.pattern('[a-zA-Z ]')]],
    email: [this.UserUpdateRequest.email ? this.UserUpdateRequest.email : 0, [Validators.min(0), Validators.required],Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')],
    phone: [this.UserUpdateRequest.phone ? this.UserUpdateRequest.phone : 0, [Validators.min(0), Validators.required],Validators.pattern('^\d{8}$')],
    username: [this.UserUpdateRequest.username ? this.UserUpdateRequest.username : 0, [Validators.min(0), Validators.required],Validators.pattern('^[a-zA-Z0-9]+$')],
    password: [this.UserUpdateRequest.password ? this.UserUpdateRequest.password : 0, [Validators.min(0), Validators.required]]
  });

}
  
}
