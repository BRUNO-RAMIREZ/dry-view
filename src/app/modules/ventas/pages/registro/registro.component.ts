import { Component,DoCheck, OnInit , OnDestroy} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductosService } from '../../../productos/services/productos.service';
import { FormBuilder,FormGroup, Validators } from "@angular/forms";
import {ProductMapper} from "../../../../core/mappers/product.mapper";
import {Observable, Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import { ProductListResponse } from 'src/app/core/models/product.model';
import {map, take, takeUntil, tap} from "rxjs/operators";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, OnDestroy{
  public products: Observable<ProductListResponse[]>;
  public totalProducts: number;
  public productMapper: ProductMapper;
  public deleteBoolean: boolean;
  public seeBoolean: boolean;
  public productNameSearch: string;
  public page: number;
  public sortBy: string;
  public order: string;
  public iconArrow: string;
  public productModal!: ProductListResponse;
  private _unsubscribed: Subject<void>;


    
  public totalPagar:number = 0;


  constructor(private _productService: ProductosService,
               private _formsBuilder: FormBuilder,
               private _activateRoute: ActivatedRoute,
               private _router: Router,
               private _toastrService: ToastrService) { 
    this.products          = new Observable<ProductListResponse[]>();
    this.totalProducts     = 0;
    this.productMapper     = new ProductMapper();
    this.deleteBoolean     = false;
    this.order             = 'ascendent';
    this.iconArrow         = 'unfold_more';
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
  public searchProductByName(productName: string): void {

    this.productNameSearch = productName;
  }
  public changeOrder(value: string): void {
    this.sortBy = value;
    this._orderCase();
  }

  private _orderCase(): void {
    switch (this.order) {
      case 'ascendent': {
        this.order = 'descendent';
        this.iconArrow = 'expand_less';
      } break;
      case 'descendent': {
          this.order = 'ascendent',
          this.iconArrow = 'expand_more';
      }; break;
    }
  }
}



