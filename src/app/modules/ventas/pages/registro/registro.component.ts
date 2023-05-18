import { Component,DoCheck, OnInit , OnDestroy} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductosService } from '../../../productos/services/productos.service';
import { VentasService } from '../../services/ventas.service';
import { FormBuilder,FormControl,FormGroup, Validators } from "@angular/forms";
import {ProductMapper} from "../../../../core/mappers/product.mapper";
import {Observable, Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import { ProductListResponse } from 'src/app/core/models/product.model';
import { VentasCreateRequest,
  VentasCreateResponse,
  VentasUpdateRequest, VentasUpdateResponse} from 'src/app/core/models/ventas.model'
import {debounceTime, map, take, takeUntil, tap} from "rxjs/operators";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, OnDestroy{
  private _unsubscribed: Subject<void>;
  public products: ProductListResponse[]=[];
  loading = false;

  control = new FormControl();
  listaProductosParaVenta:VentasUpdateRequest[] = [];
  
  columnasTabla:string[] = ['img','producto','precio','estado','cantidad'];
  datosDetalleVenta= new MatTableDataSource(this.listaProductosParaVenta)

  constructor(private _productService: ProductosService,
              private _router: Router) {
                this._unsubscribed = new Subject<void>();
               
                
              }


  ngOnInit(): void {
    
    this.observerChangeSearch();
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }
  

  observerChangeSearch(){
    this.control.valueChanges.pipe(
      debounceTime(1000)).subscribe(query => {
      this.getNombreByQuery(query);
    });
  }
  
  getNombreByQuery(query: string) {
    this.loading = true;
    this._productService.getAllProducts().subscribe(products => {
      this.products = products.filter(product => product.name.includes(query));
      this.loading=false;
    });
  }
  registrarVenta(){

  }
 
}
