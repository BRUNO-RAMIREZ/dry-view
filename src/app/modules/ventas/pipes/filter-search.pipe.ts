import { Pipe, PipeTransform } from '@angular/core';
import {VentasListResponse} from "../../../core/models/ventas.model";

@Pipe({
  name: 'filterSearchPipeVenta'
})
export class FilterSearchPipe implements PipeTransform {

 /* transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }*/

  transform(ventas: VentasListResponse[] | null, saleCodeSearch: string = ''): VentasListResponse[] {
    if (ventas === null) return [];

    if (saleCodeSearch.length === 0) return ventas;

    saleCodeSearch = saleCodeSearch.trim().toUpperCase();
    const ventasFiltered = ventas.filter(venta => {
      const lastName = venta.client.lastName.trim().toUpperCase();
      const code = venta.code.trim().toUpperCase();
      return lastName.includes(saleCodeSearch) || code.includes(saleCodeSearch);
    });
    return ventasFiltered;
  }

}
