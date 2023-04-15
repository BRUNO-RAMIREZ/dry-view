import {Pipe, PipeTransform} from '@angular/core';
import {ProductListResponse} from "../../../core/models/product.model";

@Pipe({
  name: 'sortByPipe'
})
export class SortByPipe implements PipeTransform {

  transform([...products]: ProductListResponse[], sortBy: string , order:string): ProductListResponse[] {
    switch (sortBy) {
      case 'nombre':
          return products.sort(
            (productPrevious, productNext) => {
              return (order === 'ascendent') ?
                ((productPrevious.name > productNext.name) ? 1 : -1):
                ((productPrevious.name > productNext.name) ? -1 : 1);
            });
        break;
      case 'purchasePrice':
          return products.sort(
            (productPrevious, productNext) => {
              return (order === 'ascendent') ?
                ((productPrevious.purchasePrice > productNext.purchasePrice) ? 1 : -1):
                ((productPrevious.purchasePrice > productNext.purchasePrice) ? -1 : 1);
            });
        break;
      case 'salePrice':
          return products.sort(
            (productPrevious, productNext) => {
              return (order === 'ascendent') ?
                ((productPrevious.salePrice > productNext.salePrice) ? 1 : -1):
                ((productPrevious.salePrice > productNext.salePrice) ? -1 : 1);
            });
      case 'stock':
          return products.sort(
            (productPrevious, productNext) => {
              return (order === 'ascendent') ?
                ((productPrevious.stock > productNext.stock) ? 1 : -1):
                ((productPrevious.stock > productNext.stock) ? -1 : 1);
            });
      default:
        return products;
    }
  }

}
