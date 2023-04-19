import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthService} from "../../../modules/auth/services/auth.service";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private _router: RouterModule,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authToken');
  }
}
