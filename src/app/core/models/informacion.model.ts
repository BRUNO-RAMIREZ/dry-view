export interface InformacionGetResponce {
    id: number;
    tittle:string;
    description: string;
    phone: number;
    direction:string;
    email:string;
    wslink: string;
    fblink: string;
    ytlink: string;
  }

  export interface InformacionUpdateRequest {
    id: number;
    tittle:string;
    description: string;
    phone: number;
    direction:string;
    email:string;
    wslink: string;
    fblink: string;
    ytlink: string;
  }

  export interface InformacionUpdateResponse {
    id: number;
    tittle:string;
    description: string;
    phone: number;
    direction:string;
    email:string;
    wslink: string;
    fblink: string;
    ytlink: string;
  }