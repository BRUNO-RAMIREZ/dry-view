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
}

export interface UserCreateResponse  {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: number;
  username: string;
  password: string;
}
