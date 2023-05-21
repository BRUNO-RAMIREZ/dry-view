import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../modules/auth/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() public title: string;

  public textButtonAdminAndLogout: string;
  public isVisibleModal: boolean;

  constructor(private _router: Router,
              private _authService: AuthService) {
    this.title = '';
    this.textButtonAdminAndLogout = '';
    this.textButtonAdminAndLogout = this._authService.getAuthToken() ? 'Cerrar sesión' : 'Iniciar sesión';
    this.isVisibleModal = false;
  }

  public redirectToAWindowHomeOrAuth(): void {
    if (this.textButtonAdminAndLogout === 'Iniciar sesión') {
      this._router.navigate(['/auth']);
    } else {
      this.isVisibleModal = true;
    }
  }

  public irAMiCuenta(): void {
    this._router.navigate(['/usuarios/informacion-cuenta']);
  }

  public irAnotificaciones(): void{
    this._router.navigate(['/notificaciones']);
  }

  public closeSession(): void {
    this._authService.logout();
    this._router.navigate(['/usuarios']);
  }

  public closeModal(): void {
    this.isVisibleModal = false;
  }
}
