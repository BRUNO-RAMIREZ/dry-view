import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {UserAuthRequest} from "../../../../core/models/user.model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
 
  public formularyLogin!: FormGroup;

  private _unsubscribed: Subject<void>;

  constructor(private _formsBuilder: FormBuilder,
              private _authService: AuthService,
              private _router: Router,
              private _tostrService: ToastrService) {
    this._unsubscribed = new Subject();
    this._validate();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }

  public login(): void {
    const userAuthRequest: UserAuthRequest = {
      email: this.formularyLogin.value.email,
      password: this.formularyLogin.value.password
    }
    this._authService.login(userAuthRequest)
      .pipe(takeUntil(this._unsubscribed))
      .subscribe(
      response => {
        this._authService.setAuthToken(response.email, response.password);
        this._router.navigate(['/productos/home'])
      },
      (error) => {
        this._tostrService.error('El email o la contraseña ingresada es incorrecta', 'Login')
      }
    );
  }

  public hasError(field: string): boolean {
    return this.formularyLogin.get(field)?.invalid || false;
  }

  public navigateWindowRestorePassword(): void {
    this._router.navigate(['/auth/recuperar-contraseña'])
  }

  public navigateWindowFormRegister(): void {
    this._router.navigate(['/auth/form-registro'])
  }

  public markFieldAsTouched(fieldName: string): void {
    const field = this.formularyLogin.get(fieldName);
    if (field) {
      field.markAsTouched();
    }
  }

  private _validate(): void {
    this.formularyLogin = this._formsBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
}
