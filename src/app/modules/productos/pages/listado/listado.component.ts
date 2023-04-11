import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {map, take, takeUntil, tap} from "rxjs/operators";

import {ProductosService} from "../../services/productos.service";
import {ProductDeleteRequest, ProductListResponse} from "../../../../core/models/product.model";
import {ProductMapper} from "../../../../core/mappers/product.mapper";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, OnDestroy {
  public products: Observable<ProductListResponse[]>;
  public totalProducts: number;
  public productMapper: ProductMapper;
  public deleteBoolean: boolean;
  public seeBoolean: boolean;
  public productData: any;
  public productNameSearch: string;
  public page: number;
  public sortBy: string;

  private _unsubscribed: Subject<void>;

  constructor(private _productService: ProductosService,
              private _router: Router) {
    this.products          = new Observable<ProductListResponse[]>();
    this.totalProducts     = 0;
    this.productMapper     = new ProductMapper();
    this.deleteBoolean     = false;
    this.seeBoolean        = false;
    this.productNameSearch = '';
    this.page              = 0;
    this.sortBy            = '';
    this._unsubscribed = new Subject<void>();
  }

  ngOnInit(): void {
    this.products = this._productService.productsObservable
      .pipe(
        tap(products => this.totalProducts = products.length)
      );
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }

  public trackById(index: number, product: ProductListResponse): number{
    return product.id;
  }

  public goNavigateWindowRegister(): void {
    this._router.navigate(['/productos/registrar']);
  }

  public searchProductByName(productName: string): void {
    this.productNameSearch = productName;
  }

  public incrementStock(productId: number): void {
    if (productId) {
      this._productService.updateStock(productId)
        .pipe(takeUntil(this._unsubscribed))
        .subscribe();
    }
  }

  public deleteProductById(): void {
    if (this.deleteBoolean) {
        this._productService.deleteProductById(this.productData.id)
          .pipe(take(1))
          .subscribe();
        this.deleteBoolean = false;
    }
  }

  public seeProductById(): void {
    if (this.seeBoolean) {
      this.seeBoolean = false;
    }
  }

  public openModalSee(product: ProductListResponse): void {
    this.seeBoolean = true;
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

  public openModalDelete(product: ProductListResponse): void {
    this.deleteBoolean = true;
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
    this.deleteBoolean = false;
    this.seeBoolean = false;
  }

  public changeOrder(value: string): void {
    console.warn(value);
    this.sortBy = value;
  }
}
