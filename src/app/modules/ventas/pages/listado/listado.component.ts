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
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {tap} from "rxjs/operators";

import {VentasService} from "../../services/ventas.service";
import {VentasListResponse,VentasCancelRequest,VentasCancelResponse} from "../../../../core/models/ventas.model";


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, OnDestroy {
  public ventas: Observable<VentasListResponse[]>;
  public totalventas: number;
  public deleteBoolean: boolean;
  public seeBoolean: boolean;
  public ventasCodeSearch: string;
  public page: number;
  public sortBy: string;
  public order: string;
  public iconArrow: string;
  public ventasModal!: VentasListResponse;
  private _unsubscribed: Subject<void>;

  constructor(private _ventaservice: VentasService,
              private _router: Router) {
    this.ventas          = new Observable<VentasListResponse[]>();
    this.totalventas     = 0;
    this.deleteBoolean     = false;
    this.order             = 'ascendent';
    this.iconArrow         = 'unfold_more';
    this.seeBoolean        = false;
    this.ventasCodeSearch = '';
    this.page              = 0;
    this.sortBy            = '';
    this._unsubscribed = new Subject<void>();
  }

  ngOnInit(): void {
    this.ventas = this._ventaservice.ventasObservable
      .pipe(
        tap(ventas => this.totalventas = ventas.length)
      );
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }

  public trackById(index: number, user: VentasListResponse): number{
    return user.id;
  }

  public goNavigateWindowRegister(): void {
    this._router.navigate(['/ventas/registrar']);
  }

  public searchUserByName(code: string): void {

    this.ventasCodeSearch = code;
  }

  public seeventasById(): void {
    if (this.seeBoolean) {
      this.seeBoolean = false;
    }
  }

  public openModalSee(venta: VentasListResponse): void {
    this.seeBoolean = true;
    this.ventasModal = venta;
  }

  public openModalDelete(venta: VentasListResponse): void {
    this.deleteBoolean = true;
    this.ventasModal = venta;
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
