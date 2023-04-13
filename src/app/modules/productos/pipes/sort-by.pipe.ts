import {Pipe, PipeTransform} from '@angular/core';
import {ProductListResponse} from "../../../core/models/product.model";

@Pipe({
  name: 'sortByPipe'
})
export class SortByPipe implements PipeTransform {

  transform([...products]: ProductListResponse[], sortBy: string = '',upSort:boolean): ProductListResponse[] {
    switch (sortBy) {
      case 'nombre':
        if(upSort){
          return products.sort(
            (productPrevious, productNext) => {
              return (productPrevious.name > productNext.name) ? 1 : -1;
            });
        }else{
          return products.sort(
            (productPrevious, productNext) => {
              return (productPrevious.name > productNext.name) ? -1 : 1;
            });
        }
        break;
      case 'purchasePrice':
        if(upSort){
          return products.sort(
          
            (productPrevious, productNext) => {
              return (productPrevious.purchasePrice > productNext.purchasePrice) ? 1 : -1;
            });
        }else{
          return products.sort(
          
            (productPrevious, productNext) => {
              return (productPrevious.purchasePrice > productNext.purchasePrice) ? -1 : 1;
            });
        }
        break;
      case 'salePrice':
        if(upSort){
          return products.sort(
            (productPrevious, productNext) => {
              return (productPrevious.salePrice > productNext.salePrice) ? 1 : -1;
            });
        }else{
          return products.sort(
            (productPrevious, productNext) => {
              return (productPrevious.salePrice > productNext.salePrice) ? -1 : 1;
            });
        }
        
      case 'stock':
        if(upSort){
          return products.sort(
            (productPrevious, productNext) => {
              return (productPrevious.stock > productNext.stock) ? 1 : -1;
            });
        }else{
          return products.sort(
            (productPrevious, productNext) => {
              return (productPrevious.stock > productNext.stock) ? -1 : 1;
            });
        }
        
      default:
        return products;
    }
  }

}
