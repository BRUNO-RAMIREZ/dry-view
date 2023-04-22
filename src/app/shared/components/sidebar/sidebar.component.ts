import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../../../modules/auth/services/auth.service";
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public desplegado: boolean;

  constructor(config: NgbModalConfig, private _router: Router, public modal: NgbModal,
              private _authService: AuthService) {
    config.backdrop = 'static';
    this.desplegado = true;


  }

  ngOnInit(): void {
  }

  cambiarEstado() {
    this.desplegado = !this.desplegado;
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authToken');

  }

  logout() {
    this._authService.logout();
    this.modal.dismissAll();
    this._router.navigate(['/auth']);
  }
}
