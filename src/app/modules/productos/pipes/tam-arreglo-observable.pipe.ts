import { Pipe, PipeTransform } from '@angular/core';
import {ProductListResponse} from "../../../core/models/product.model";
import {Observable} from 'rxjs';
@Pipe({
  name: 'tamArregloObservable'
})
export class TamArregloObservablePipe implements PipeTransform {
  /*transform(products: ProductListResponse[] | null, productNameSearch: string = ''): ProductListResponse[] {
    if (products === null) return [];

    if (productNameSearch.length === 0) return products;

    productNameSearch = productNameSearch.trim().toUpperCase();
    const productsFiltered = products.filter(product => {
      const name = product.name.trim().toUpperCase();
      return name.includes(productNameSearch)
    });
    return productsFiltered;
  }*/
  transform(products: ProductListResponse[]): number {
    return products.length;
  }

}
