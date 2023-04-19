import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthService} from "../../../modules/auth/services/auth.service";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public desplegado:boolean;
  
  constructor(private _router: RouterModule,
              private _authService: AuthService) {
    this.desplegado = true;
  }

  ngOnInit(): void {
  }

  cambiarEstado(){
    this.desplegado = !this.desplegado;
  }
  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authToken');

  }
}
