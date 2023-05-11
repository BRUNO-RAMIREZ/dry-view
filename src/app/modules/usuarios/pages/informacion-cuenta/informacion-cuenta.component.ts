import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {UsuariosService} from '../../services/usuarios.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';


@Component({
  selector: 'app-informacion-cuenta',
  templateUrl: './informacion-cuenta.component.html',
  styleUrls: ['./informacion-cuenta.component.scss']
})

export class InformacionCuentaComponent implements OnInit {
 
  correo: string;
  usuario: any;
  puntitos: string[] = [];
  constructor(private _router:Router, private authService: AuthService, private usuariosService: UsuariosService,public modal: NgbModal) { 
    this.correo = "";
=======
export class InformacionCuentaComponent implements OnInit, OnDestroy {
  public email: string;
  public userAccount: UserGetByEmailResponse;
  public isPasswordVisible: boolean;
  public textIconEye: string;

  private _unsubscribed: Subject<void>;
  private _passwordCodificada: string;
  private _passwordNoCodificada: string;

  constructor(private _router: Router,
              private authService: AuthService,
              private usuariosService: UsuariosService,
              public modal: NgbModal) {
    this.email = "";
    this.userAccount = {
      id: 0,
      name: '',
      lastName: '',
      email: '',
      phone: 0,
      username: '',
      password: '',
      image: '../../../../assets/avatar.png'
    }
    this._unsubscribed = new Subject();
    this.isPasswordVisible = false;
    this.textIconEye = 'visibility_off';
    this._passwordCodificada = '';
    this._passwordNoCodificada = '';

  }

  ngOnInit(): void {
    this.email = this.authService.getAuthToken() || '';
    if (this.email !== '') {
      this.usuariosService.getUserByEmail(this.email)
        .pipe(takeUntil(this._unsubscribed))
        .subscribe(response => {
          this.userAccount = response;
          this._passwordNoCodificada = this.userAccount.password;
          for (let char of this.userAccount.password) {
            this._passwordCodificada += '*';
          }
        });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }

  public logout(): void {
    this.authService.logout();
    this.modal.dismissAll();
    this._router.navigate(['/usuarios']);
  }

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.userAccount.password = this.isPasswordVisible ? this._passwordNoCodificada : this._passwordCodificada;
    this.textIconEye = this.isPasswordVisible ? 'visibility' : 'visibility_off';
  }
}

