export interface InformacionGetResponce {
    id: number;
    tittle:string;
    description: string;
    phone: number;
    direction:string;
    email:string;
    links: string[]; //1 fb, 2 yt, 3 ws
  }

  export interface InformacionUpdateRequest {
    id: number;
    tittle:string;
    description: string;
    phone: number;
    direction:string;
    email:string;
    links: string[]; //1 fb, 2 yt, 3 ws
  }

  export interface InformacionUpdateResponse {
    id: number;
    tittle:string;
    description: string;
    phone: number;
    direction:string;
    email:string;
    links: string[]; //1 fb, 2 yt, 3 ws
  }