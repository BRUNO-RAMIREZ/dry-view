import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

import {ProductosService} from "../../services/productos.service";
import {ProductDeleteRequest, ProductListResponse} from "../../../../core/models/product.model";
import {ProductMapper} from "../../../../core/mappers/product.mapper";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {
  public title: string;
  public products: Observable<ProductListResponse[]>;
  public totalProducts: number;
  public productMapper: ProductMapper;
  public eliminarBoolean: boolean;
  public productData: any;
  public page: number;

  constructor(private _productService: ProductosService,
              private router: Router) {
    this.products         = new Observable<ProductListResponse[]>();
    this.title            = 'Lista de productos';
    this.totalProducts    = 0;
    this.productMapper    = new ProductMapper();
    this.eliminarBoolean  = false;
    this.page             = 0;
  }

  ngOnInit(): void {
    this.products = this._productService.productsObservable
      .pipe(
        tap(products => this.totalProducts = products.length),
        map(products => products.slice(0, 10))
      );
  }

  public trackById(index: number, product: ProductListResponse): number{
    return product.id;
  }

  public goNavigateWindowRegister(): void {
    this.router.navigate(['/productos/registrar']);
  }

  public searchProductByName(productName: string): void {

  }

  public incrementStock(productId: number): void {
    if (productId) this._productService.updateStock(productId).subscribe();
  }

  public deleteProductById(): void {
    if (this.eliminarBoolean) {
        this._productService.deleteProductById(this.productData.id).subscribe();
        this.eliminarBoolean = false;
    }
  }

  public openModal(product: ProductListResponse) {
    this.eliminarBoolean = true;
    this.productData = {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      stock: product.stock
    }
  }

  public closeModal(): void{
    this.eliminarBoolean = false;
  }

  public prevPage(): void {
    if (this.page > 0) {
      this.page -= 5;
    }
  }

  public nextPage(): void {
    this.page += 5;
  }
}
