import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service'
import {
  UserCreateRequest,
  UserCreateResponse,
  UserUpdateRequest,
  UserUpdateResponse
} from "../../../../core/models/user.model";
import {Subject} from "rxjs";
import {filter, switchMap, take, takeUntil} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit, DoCheck, OnDestroy {
  public formularyUsers!: FormGroup;
  public userUpdateRequest: UserUpdateRequest;
  public tamañoCorrecto: boolean;
  public title: string;
  public imageData: string;
  public showPassword: boolean = false;
  private _unsubscribed: Subject<void>;
  

  constructor(private _usersService: UsuariosService,
              private _formsBuilder: FormBuilder,
              private _activateRoute: ActivatedRoute,
              private _router: Router,
              private _toastrService: ToastrService) {
     this.tamañoCorrecto = true;           
    this.imageData = '';
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
    this.title = '';
    this._unsubscribed = new Subject<void>();
    this._validate();
  }


  
  
  ngOnInit(): void {
    this._activateRoute.params
      .pipe(
        filter(params => params.hasOwnProperty('id')),
        switchMap(({id}) => this._usersService.getUserById(id)),
        takeUntil(this._unsubscribed)
      ).subscribe(response => {
      this.userUpdateRequest = response;
      this.imageData = this.userUpdateRequest.image;
      this._validate();
    });
  }

  ngDoCheck(): void {
    this.title = this.userUpdateRequest.id ? 'Editar usuario' : 'Registrar usuario';
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
 
  
  public createUser(): void {
    if (this.userUpdateRequest.id) {
      if(this.formularyUsers.valid){
        
        const userUpdateRequest: UserUpdateRequest = {
          ...this.formularyUsers.value,
          id: this.userUpdateRequest.id,
          image: this.imageData
        };
        this._usersService.updateUser(userUpdateRequest)
          .pipe(take(1))
          .subscribe(
            (response: UserUpdateResponse) => {
              this._toastrService.warning(`${response.name} actualizado con éxito`, 'Actualizar')
              this.redirectToWindowUser();
            },
            (error) => {
              this._toastrService.error(`Ocurrió un error al actualizar el usuario`)
            });
      }
      
    } else {
      if (this.formularyUsers.valid && this.nombre?.value.trim() && this.lastname?.value.trim()) {
        const user = this._buildUser();
        this._usersService.createUser(user)
          .pipe(take(1))
          .subscribe(
            (response: UserCreateResponse) => {
              
              this._toastrService.success(`${response.name} registrado con éxito`, 'Registrar')
              this.redirectToWindowUser();
            },
            (error) => {
              this._toastrService.error(`Ocurrió un error al registrar el usuario`)
            });
        this.formularyUsers.reset();
      }
    }
  }

 /* public onFileSelected(event: any): void {

    const files: FileList | null = event?.target?.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if(reader.result){
          if (reader.result.width <= 50 && img.height <= 50) {

          }
          this.imageData = reader.result as string;
        }
        
      }
      reader.readAsDataURL(file);
    }
  }*/

  public onFileSelected(event: any): void {
    const files: FileList | null = event?.target?.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      
      // validate image dimensions
      const img = new Image();
      img.onload = () => {
        if (img.width <= 500 && img.height <= 500) {
          reader.onload = () => {
            this.imageData = reader.result as string;
          }
          reader.readAsDataURL(file);
        } else {
          this._toastrService.error('El tamaño de la imagen no es valido', 'usuarios');
        }
      };
      img.src = URL.createObjectURL(file);
    }
  }

  public redirectToWindowUser(): void {
    this._router.navigate(['/usuarios/listado']);
  }
  /*
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
}*/

  private _buildUser(): UserCreateRequest {
    const formValue = this.formularyUsers.value;
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
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'e') {
      event.preventDefault();
    }
  }
  public oneKeyDown(event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  private _validate(): void {
    this.formularyUsers = this._formsBuilder.group({
      
      name: [this.userUpdateRequest.name ? this.userUpdateRequest.name : '', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-ZñÑ ]*')]],
      lastName: [this.userUpdateRequest.lastName ? this.userUpdateRequest.lastName : '', [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-zA-ZñÑ ]*')]],
      email: [this.userUpdateRequest.email ? this.userUpdateRequest.email : '', [Validators.required, Validators.pattern('[a-zA-Z0-9_.]{3,60}[@]{1}[a-zA-Z0-9_.]{4,60}[.]{1}[a-zA-Z]{2,20}')]],
      phone: [this.userUpdateRequest.phone ? this.userUpdateRequest.phone : '', [Validators.min(0), Validators.required, Validators.pattern('^([6-7][0-9]{7})$')]],
      username: [this.userUpdateRequest.username ? this.userUpdateRequest.username : '', [Validators.required,  Validators.minLength(4), Validators.maxLength(16),Validators.pattern('[a-zA-ZñÑ]{1}[a-zA-Z0-9ñÑ]*')]],
      password: [this.userUpdateRequest.password ? this.userUpdateRequest.password : '', [Validators.required, Validators.minLength(4), Validators.maxLength(10),Validators.pattern('[a-zA-Z0-9ñÑ]*')]]
    });
  }
  Space(event:any){
    if(event.target.selectionStart == 0 && event.code === "Space")
    event.preventDefault();
  }
 
  
}