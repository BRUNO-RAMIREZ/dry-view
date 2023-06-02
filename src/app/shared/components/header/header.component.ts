import {Component, Input,OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../modules/auth/services/auth.service";

import {ProductosService} from "../../../modules/productos/services/productos.service";
import {ProductDeleteRequest, ProductListResponse} from "../../../core/models/product.model";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() public title: string;

  public textButtonAdminAndLogout: string;
  public isVisibleModal: boolean;
  public products: ProductListResponse[]=[];

  constructor(private _router: Router,
    private _productService: ProductosService,
              private _authService: AuthService) {
    this.title = '';
    this.textButtonAdminAndLogout = '';
    this.textButtonAdminAndLogout = this._authService.getAuthToken() ? 'Cerrar sesión' : 'Iniciar sesión';
    this.isVisibleModal = false;
    
  }
  ngOnInit(): void {
    this._productService.getAllProducts().subscribe(res =>{
      this.products = res;
    })
  }
  calcularCantidadStockMenorADiez(products: any[]) {
    let cantidadStockMenorADiez = products.filter(producto => producto.stock <= 10).length;
    return cantidadStockMenorADiez;
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

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');

  }
}
