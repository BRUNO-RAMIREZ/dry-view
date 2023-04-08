/**
 * Author: Bruno Ramirez
 */
import {ProductDeleteRequest, ProductListResponse} from "../models/product.model";

export class ProductMapper {
  public fromProductToProductDeleteRequest(product: any): ProductDeleteRequest {
    const productToDelete: ProductDeleteRequest = {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      stock: product.stock,
    };
    return productToDelete;
  }
}
