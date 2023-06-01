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
              let vp = parseInt( ventaPrevious.code.substring(1));
              let vn = parseInt( ventaNext.code.substring(1));
              return (order === 'ascendent') ?
                (vp> vn ? 1 : -1):
                (vp> vn ? -1 : 1);
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
