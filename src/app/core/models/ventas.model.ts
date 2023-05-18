  import {ClienteCreate, Cliente} from './client.model';
  import {ProductGetByIdResponse, ProductCreateRequest} from './product.model';
  export interface VentasUpdateRequest {
    id: number;
    code: string;
    client:ClienteCreate;
    products:ProductCreateRequest[];
    total:number;
    
    saleDate: Date;
    state:boolean;
  }
  



  export interface VentasUpdateResponse {
    id: number;
    code: string;
    client:ClienteCreate;
    products:ProductCreateRequest[];
    total:number;
    
    saleDate: Date;
    state:boolean;
  }
  
  
  export interface VentasGetByIdResponse {
    id: number;
    code: string;
    client:ClienteCreate;
    products:ProductCreateRequest[];
    total:number;
    
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
    products:ProductCreateRequest[];
    total:number;
    
    saleDate: Date;
    state:boolean;
  }
  

  
  export interface VentasCreateRequest {
    code: string;
    client:ClienteCreate;
    products:ProductCreateRequest[];
    total:number;
    saleDate: Date;
    state:boolean;
  }
  
  export interface VentasCreateResponse {
    id: number;
    code: string;
    client:ClienteCreate;
    products:ProductCreateRequest[];
    total:number;
    saleDate: Date;
    state:boolean;
  }
