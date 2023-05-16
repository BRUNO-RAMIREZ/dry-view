
  export interface VentasUpdateRequest {
    id: number;
    code: string;
    ci_Client: number;
    id_seller:number;
    lastName_Client: string;
    ids_Products: number[];
    amount_Product:number[];
    finalPrice: number;
    dateTime: Date;
    state:string;
  }
  
  export interface VentasUpdateResponse {
    id: number;
    code: string;
    ci_Client: number;
    id_seller:number;
    lastName_Client: string;
    ids_Products: number[];
    amount_Product:number[];
    finalPrice: number;
    dateTime: Date;
    state:string;
  }
  
  
  export interface VentasGetByIdResponse {
    id: number;
    code: string;
    ci_Client: number;
    id_seller:number;
    lastName_Client: string;
    ids_Products: number[];
    amount_Product:number[];
    finalPrice: number;
    dateTime: Date;
    state:string;
  }
  
  export interface VentasGetAllResponse {
    ventas: VentasListResponse[];
  }
  export interface VentasListResponse {
    id: number;
    code: string;
    ci_Client: number;
    id_seller:number;
    lastName_Client: string;
    ids_Products: number[];
    amount_Product:number[];
    finalPrice: number;
    dateTime: Date;
    state:string;
  }
  

  
  export interface VentasCreateRequest {
    id: number;
    code: string;
    ci_Client: number;
    id_seller:number;
    lastName_Client: string;
    ids_Products: number[];
    amount_Product:number[];
    finalPrice: number;
    dateTime: Date;
    state:string;
  }
  
  export interface VentasCreateResponse {
    id: number;
    code: string;
    ci_Client: number;
    id_seller:number;
    lastName_Client: string;
    ids_Products: number[];
    amount_Product:number[];
    finalPrice: number;
    dateTime: Date;
    state:string;
  }
