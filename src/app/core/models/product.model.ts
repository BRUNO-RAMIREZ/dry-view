export interface ProductCommon {
  id?: number;
  name: string;
  description: string;
  image: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
}

export interface ProductCreateRequest {
  name: string;
  description: string;
  image: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
}

export interface ProductListRequest {
  id: number;
  stock: number;
}
export interface ProductCreateResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
}

export interface ProductUpdateStockRequest {
  id: number;
  name: string;
  description: string;
  image: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
}

export interface ProductUpdateRequest {
  id: number;
  name: string;
  description: string;
  image: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
}

export interface ProductUpdateResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
}

export interface ProductGetAllResponse {
  products: ProductListResponse[];
}

export interface ProductListResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
}

export interface ProductDeleteRequest {
  id: number;
  name: string;
  description: string;
  image: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
}

export interface ProductGetByIdResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
}
