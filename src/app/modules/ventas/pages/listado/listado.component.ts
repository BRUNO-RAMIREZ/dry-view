/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
*/

import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {map, take, takeUntil, tap} from "rxjs/operators";

import {VentasService} from "../../services/ventas.service";
import {VentasListResponse} from "../../../../core/models/ventas.model";
import {ProductMapper} from "../../../../core/mappers/product.mapper";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, OnDestroy {
  public ventas: Observable<VentasListResponse[]>;
  public totalProducts: number;
  public productMapper: ProductMapper;
  public deleteBoolean: boolean;
  public seeBoolean: boolean;
  public productNameSearch: string;
  public page: number;
  public sortBy: string;
  public order: string;
  public iconArrow: string;
  public productModal!: VentasListResponse;
  private _unsubscribed: Subject<void>;

  constructor(private _ventasService: VentasService,
              private _router: Router) {
    this.ventas         = new Observable<VentasListResponse[]>();
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
    this.ventas = this._ventasService.productsObservable
    .pipe(
      tap(ventas => this.totalProducts = ventas.length)
    );
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }



  public trackById(index: number, product: VentasListResponse): number{
    return product.id;
  }

  public goNavigateWindowRegister(): void {
    this._router.navigate(['/productos/registrar']);
  }

  public searchProductByName(productName: string): void {

    this.productNameSearch = productName;
  }


  public seeProductById(): void {
    if (this.seeBoolean) {
      this.seeBoolean = false;
    }
  }

  public openModalSee(product: VentasListResponse): void {
    this.seeBoolean = true;
    this.productModal = product;
  }

  public openModalDelete(product: VentasListResponse): void {
    this.deleteBoolean = true;
    this.productModal = product;
  }
  public pageChangeA(event:any):void{
    this.page = event;
  }
  public closeModal(): void{
    this.deleteBoolean = false;
    this.seeBoolean = false;
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
