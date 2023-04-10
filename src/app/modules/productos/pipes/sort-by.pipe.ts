import {Pipe, PipeTransform} from '@angular/core';
import {ProductListResponse} from "../../../core/models/product.model";

@Pipe({
  name: 'sortByPipe'
})
export class SortByPipe implements PipeTransform {

  transform([...products]: ProductListResponse[], sortBy: string = ''): ProductListResponse[] {
    switch (sortBy) {
      case 'nombre':
        return products.sort(
          (productPrevious, productNext) => {
            return (productPrevious.name > productNext.name) ? 1 : -1;
          });
        break;
      case 'purchasePrice':
        return products.sort(
          (productPrevious, productNext) => {
            return (productPrevious.purchasePrice > productNext.purchasePrice) ? 1 : -1;
          });
      case 'salePrice':
        return products.sort(
          (productPrevious, productNext) => {
            return (productPrevious.salePrice > productNext.salePrice) ? 1 : -1;
          });
      case 'stock':
        return products.sort(
          (productPrevious, productNext) => {
            return (productPrevious.stock > productNext.stock) ? 1 : -1;
          });
      default:
        return products;
    }
  }

}
