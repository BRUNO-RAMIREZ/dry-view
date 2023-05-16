  import {Cliente} from './client.model';
  import {ProductGetByIdResponse} from './product.model';
  export interface VentasUpdateRequest {
    id: number;
    code: string;
    client:Cliente;
    products:ProductGetByIdResponse[];
    total:number[];
    finalPrice: number;
    dateSale: Date;
    status:string;
  }
  



  export interface VentasUpdateResponse {
    id: number;
    code: string;
    client:Cliente;
    products:ProductGetByIdResponse[];
    total:number[];
    finalPrice: number;
    dateSale: Date;
    status:string;
  }
  
  
  export interface VentasGetByIdResponse {
    id: number;
    code: string;
    client:Cliente;
    products:ProductGetByIdResponse[];
    total:number[];
    finalPrice: number;
    dateSale: Date;
    status:string;
  }
  
  export interface VentasGetAllResponse {
    users: VentasListResponse[];
  }
  export interface VentasListResponse {
    id: number;
    code: string;
    client:Cliente;
    products:ProductGetByIdResponse[];
    total:number[];
    finalPrice: number;
    dateSale: Date;
    status:string;
  }
  

  
  export interface VentasCreateRequest {
    id: number;
    code: string;
    client:Cliente;
    products:ProductGetByIdResponse[];
    total:number[];
    finalPrice: number;
    dateSale: Date;
    status:string;
  }
  
  export interface VentasCreateResponse {
    id: number;
    code: string;
    client:Cliente;
    products:ProductGetByIdResponse[];
    total:number[];
    finalPrice: number;
    dateSale: Date;
    status:string;
  }
