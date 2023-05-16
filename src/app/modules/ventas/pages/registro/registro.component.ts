import { Component,DoCheck, OnInit , OnDestroy,NgModule} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductosService } from '../../../productos/services/productos.service';
import { VentasService } from '../../services/ventas.service';
import { FormControl,FormBuilder,FormGroup, Validators } from "@angular/forms";
import {ProductMapper} from "../../../../core/mappers/product.mapper";
import {Observable,Subject} from 'rxjs';
import { map, startWith, debounceTime,tap,filter,distinctUntilChanged,switchMap } from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";
import { ProductCommon, ProductListResponse } from 'src/app/core/models/product.model';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  searchTerm$ : Subject<string>  = new Subject<string>();
  products: Observable<ProductListResponse[]>;
  listFiltered: ProductListResponse[] = [];

  
  constructor(private _productService: ProductosService,private _router: Router) {
    this.products = this._productService.getAllProducts();
    this.filterList();
  }

  filterList(): void {
    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => {
          return this.products.pipe(
            map((products: ProductListResponse[]) =>
              products.filter((product: ProductListResponse) =>
                product.name.toLowerCase().includes(term.toLowerCase())
              )
            )
          );
        })
      )
      .subscribe((filteredProducts: ProductListResponse[]) => {
        this.listFiltered = filteredProducts;
      });
  }

}