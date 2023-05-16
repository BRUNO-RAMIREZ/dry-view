import { Pipe, PipeTransform } from '@angular/core';
import {VentasListResponse} from "../../../core/models/ventas.model";

@Pipe({
  name: 'filterSearchPipeProd'
})
export class FilterSearchPipe implements PipeTransform {

 /* transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }*/

  transform(ventas: VentasListResponse[] | null, productNameSearch: string = ''): VentasListResponse[] {
    if (ventas === null) return [];

    if (productNameSearch.length === 0) return ventas;

    productNameSearch = productNameSearch.trim().toUpperCase();
    const ventasFiltered = ventas.filter(product => {
      const name = product.client.lastName.trim().toUpperCase();
      return name.includes(productNameSearch)
    });
    return ventasFiltered;
  }

}
