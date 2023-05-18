import { Pipe, PipeTransform } from '@angular/core';
import {VentasListResponse} from "../../../core/models/ventas.model";
@Pipe({
  name: 'sortByPipe'
})
export class SortByPipePipe implements PipeTransform {

  transform([...ventas]: VentasListResponse[], sortBy: string , order:string): VentasListResponse[] {
    switch (sortBy) {
      case 'code':
          return ventas.sort(
            (ventaPrevious, ventaNext) => {
              return (order === 'ascendent') ?
                ((ventaPrevious.code > ventaNext.code) ? 1 : -1):
                ((ventaPrevious.code > ventaNext.code) ? -1 : 1);
            });
        break;
      case 'lastName':
          return ventas.sort(
            (ventaPrevious, ventaNext) => {
              return (order === 'ascendent') ?
                ((ventaPrevious.client.lastName > ventaNext.client.lastName) ? 1 : -1):
                ((ventaPrevious.client.lastName > ventaNext.client.lastName) ? -1 : 1);
            });
        break;
      case 'totalprice':
          return ventas.sort(
            (ventaPrevious, ventaNext) => {
              return (order === 'ascendent') ?
                ((ventaPrevious.finalPrice > ventaNext.finalPrice) ? 1 : -1):
                ((ventaPrevious.finalPrice > ventaNext.finalPrice) ? -1 : 1);
            });
      case 'status':
          return ventas.sort(
            (ventaPrevious, ventaNext) => {
              return (order === 'ascendent') ?
                ((ventaPrevious.status > ventaNext.status) ? 1 : -1):
                ((ventaPrevious.status > ventaNext.status) ? -1 : 1);
            });
      default:
        return ventas;
    }
  }
}