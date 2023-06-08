import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {map, take, takeUntil, tap} from "rxjs/operators";

import {ProductosService} from "../../../productos/services/productos.service";
import {VentasService} from '../../../ventas/services/ventas.service';
import {ProductDeleteRequest, ProductListResponse} from "../../../../core/models/product.model";
import {VentasListResponse} from "../../../../core/models/ventas.model";
import {ProductMapper} from "../../../../core/mappers/product.mapper";


@Component({
  selector: 'app-notificaciones',
  templateUrl: './apartado-notificaciones.component.html',
  styleUrls: ['./apartado-notificaciones.component.scss']
})
export class ApartadoNotificacionesComponent implements OnInit, OnDestroy {
  private _unsubscribed: Subject<void>;
  public products: ProductListResponse[]=[];
  public ventas:VentasListResponse[] = [];
  public fechasProd:Date[] = [];
  constructor(private _productService: ProductosService,
              private _ventasService:VentasService,
              private _router: Router) {
                this._unsubscribed = new Subject<void>();
                
              }


  ngOnInit(): void {
    this._productService.getAllProducts().subscribe(res =>{
      this.products = res;
      this._ventasService.getAllVenta().subscribe(vents =>{
        this.ventas = vents;
        this.products = this.filtrarProductos();
        for(let p = 0 ; p < this.products.length ; p++){
          let bool = false;
          for(let i = 0 ; i < this.ventas.length; i++){
            for(let j = 0 ; j < this.ventas[i].products.length;j++){
                if(this.ventas[i].products[j].id == this.products[p].id){
                    if(bool){
                      if(this.fechasProd[p] < this.ventas[i].saleDate){
                        this.fechasProd[p] = this.ventas[i].saleDate;
                      }
                    }else{
                      this.fechasProd.push(this.ventas[i].saleDate);
                      bool = true;
                    }
                }
            }
          }
        }
        
      });
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
