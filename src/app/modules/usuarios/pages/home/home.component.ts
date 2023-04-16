import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {ProductListResponse} from "../../../../core/models/product.model";
import {ProductosService} from "../../../productos/services/productos.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public products: Observable<ProductListResponse[]>;
  public productNameSearch: string;
  public totalProducts: number;
  public page: number;

  constructor(private _productService: ProductosService) {
    this.products = new Observable<ProductListResponse[]>();
    this.productNameSearch = '';
    this.totalProducts = 0;
    this.page = 0;
  }

  ngOnInit(): void {
    this.products = this._productService.productsObservable
      .pipe(
        tap(products => this.totalProducts = products.length)
      );
  }

  public searchProductByName(productName: string): void {
    this.productNameSearch = productName;
  }

  public trackById(index: number, product: ProductListResponse): number{
    return product.id;
  }

}
