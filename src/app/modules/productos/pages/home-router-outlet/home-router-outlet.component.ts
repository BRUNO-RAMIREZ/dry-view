import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-home-router-outlet',
  templateUrl: './home-router-outlet.component.html',
  styleUrls: ['./home-router-outlet.component.scss']
})
export class HomeRouterOutletComponent implements OnInit {

  constructor(private _authService: AuthService) {
    
   }

  ngOnInit(): void {
    this._authService.reset();
  }

  @HostListener('document:mousemove') onMouseMove() {
    this._authService.reset();
  }

  @HostListener('document:click') onClick() {
    this._authService.reset();
  }
}
