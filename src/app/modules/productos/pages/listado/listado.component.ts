import { Component, OnInit } from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {Observable} from "rxjs";
import {ProductModel} from "../../../../core/models/product.model";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  public products: Observable<ProductModel[]>;

  constructor(private _productService: ProductosService) {
    this.products = new Observable<ProductModel[]>();
  }

  ngOnInit(): void {
    this.products = this._productService.getAllProducts();
  }
}
