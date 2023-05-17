import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {map, take, takeUntil, tap} from "rxjs/operators";

import {ProductosService} from "../../../productos/services/productos.service";
import {ProductDeleteRequest, ProductListResponse} from "../../../../core/models/product.model";
import {ProductMapper} from "../../../../core/mappers/product.mapper";


@Component({
  selector: 'app-notificaciones',
  templateUrl: './apartado-notificaciones.component.html',
  styleUrls: ['./apartado-notificaciones.component.scss']
})
export class ApartadoNotificacionesComponent implements OnInit, OnDestroy {
  private _unsubscribed: Subject<void>;
  public products: ProductListResponse[]=[];

  constructor(private _productService: ProductosService,
              private _router: Router) {
                this._unsubscribed = new Subject<void>();
                
              }


  ngOnInit(): void {
    this._productService.getAllProducts().subscribe(res =>{
      this.products = res;
    })
  }
  filtrarProductos(): Array<any> {
    return this.products.filter(producto => producto.stock <= 10);
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }
  
}
