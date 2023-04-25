import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public title: string;

  constructor(private _router: Router) {
    this.title = '';
  }

  ngOnInit(): void {
  }
  public irAMiCuenta(): void{
    console.log("lalalaa");
    this._router.navigate(['/usuarios/informacion-cuenta']);

  
  }
  public redirectToWindowLogin(): void {
    this._router.navigate(['/auth']);
  }
}
