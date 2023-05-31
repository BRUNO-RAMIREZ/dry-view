import {ClienteCreate, Cliente} from './client.model';
import {ProductGetByIdResponse, ProductCreateRequest,ProductListRequest,ProductListResponse} from './product.model';


export interface VentasCancelRequest {
  id: number;
  quantityStockOfProductsSaled:number[];
  idsproducts:number[];
  state:boolean;
}

export interface VentasCancelResponse {
  id: number;
  code: string;
  client:ClienteCreate;
  products:ProductListResponse[];
  quantityStockOfProductsSaled:number[];
  total:number;
  saleDate: Date;
  state:boolean;
}


export interface VentasGetByIdResponse {
  id: number;
  code: string;
  client:ClienteCreate;
  products:ProductListResponse[];
  total:number;
  quantityStockOfProductsSaled:number[];
  saleDate: Date;
  state:boolean;
}

export interface VentasGetAllResponse {
  sales: VentasListResponse[];
}
export interface VentasListResponse {
  id: number;
  code: string;
  client:ClienteCreate;
  products:ProductListResponse[];
  total:number;
  quantityStockOfProductsSaled:number[];
  saleDate: Date;
  state:boolean;
}



export interface VentasCreateRequest {
  code: string;
  client:ClienteCreate;
  products:ProductListRequest[];
  quantityStockOfProductsSaled:number[];
  total:number;
  saleDate: Date;
  state:boolean;
}

export interface VentasCreateResponse {
  id: number;
  code: string;
  client:ClienteCreate;
  products:ProductListRequest[];
  quantityStockOfProductsSaled:number[];
  total:number;
  saleDate: Date;
  state:boolean;
}