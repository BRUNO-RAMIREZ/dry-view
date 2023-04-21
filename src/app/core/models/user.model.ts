/**
 * Author: Bruno Ramirez
 */
export interface UserAuthResponse {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: number;
  username: string;
  password: string;
  image:string;
}
export interface UserUpdateRequest {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: number;
  username: string;
  password: string;
  image:string
}

export interface UserUpdateResponse {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: number;
  username: string;
  password: string;
  image:string
}


export interface UserGetByIdResponse {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: number;
  username: string;
  password: string;
  image:string
}

export interface UserGetAllResponse {
  users: UserListResponse[];
}
export interface UserListResponse {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: number;
  username: string;
  password: string;
  image:string
}

export interface UserAuthRequest {
  email: string;
  password: string;
}

export interface UserCreateRequest {
  name: string;
  lastName: string;
  email: string;
  phone: number;
  username: string;
  password: string;
  image:string;
}

export interface UserCreateResponse  {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: number;
  username: string;
  password: string;
  image:string
}
