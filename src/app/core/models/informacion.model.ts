export interface InformacionGetResponce {
    id: number;
    title:string;
    description: string;
    phone: number;
    direction:string;
    email:string;
    links: string[]; //1 fb, 2 yt, 3 ws
  }

  export interface InformacionUpdateRequest {
    id: number;
    title:string;
    description: string;
    phone: number;
    direction:string;
    email:string;
    links: string[]; //1 fb, 2 yt, 3 ws
  }

  export interface InformacionUpdateResponse {
    id: number;
    title:string;
    description: string;
    phone: number;
    direction:string;
    email:string;
    links: string[]; //1 fb, 2 yt, 3 ws
  }