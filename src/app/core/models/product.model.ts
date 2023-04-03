export interface ProductHTTPResponse {
  products: ProductModel[];
}

export interface ProductModel {
  id:            number;
  name:          string;
  description:   string;
  image:         string;
  purchasePrice: number;
  salePrice:     number;
  stock:         number;
}

