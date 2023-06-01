import { Pipe, PipeTransform } from '@angular/core';
import {VentasListResponse} from "../../../core/models/ventas.model";
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
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
                ((ventaPrevious.total > ventaNext.total) ? 1 : -1):
                ((ventaPrevious.total > ventaNext.total) ? -1 : 1);
            });
      case 'status':
          return ventas.sort(
            (ventaPrevious, ventaNext) => {
              return (order === 'ascendent') ?
                ((ventaPrevious.state > ventaNext.state) ? 1 : -1):
                ((ventaPrevious.state > ventaNext.state) ? -1 : 1);
            });
      default:
        return ventas;
    }
  }
}
