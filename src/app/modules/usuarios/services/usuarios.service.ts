import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserCreateRequest,
        UserCreateResponse,
        UserListResponse,
        UserGetAllResponse,
        UserUpdateRequest,
        UserUpdateResponse,
        UserGetByIdResponse} from "../../../core/models/user.model";
import {Observable,BehaviorSubject} from "rxjs";
import {switchMap, tap} from "rxjs/operators";
import {map} from "rxjs/operators";
@Injectable()
export class UsuariosService {
  private _baseURL: string;
  private _users: BehaviorSubject<UserListResponse[]>;
  constructor(private _http: HttpClient) {
    this._baseURL = environment.baseURL;
    this._users = new BehaviorSubject<UserListResponse[]>([/*{name:'hola',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'halo',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'hi',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'hello',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'wasad',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'wasad',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'wasad',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'wasad',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'wasad',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'wasad',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'wasad',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'wasad',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'wasad',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'wasad',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
    {name:'wasad',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0},
  {name:'wasad',lastName:'serg',password:'123',username:'asdf',image:'',email:'asdfffff',id:0,phone:0}*/]);

    this.getAllUsers().subscribe(response => {
      this._users.next(response);
    })
  }

  public createUser(user: UserCreateRequest): Observable<UserCreateResponse> {
    return this._http.post<UserCreateResponse>(`${this._baseURL}/users/create`, user);
  }


  public get usersObservable(): Observable<UserListResponse[]> {
    return this._users.asObservable();
  }

  // Evitar usar este metodo directamente utilizar el usersObservable
  public getAllUsers(): Observable<UserListResponse[]> {
    return this._http.get<UserGetAllResponse>(`${this._baseURL}/users/getAll`)
      .pipe(map(res => res.users));
  }



  public updateUser(userUpdateRequest: UserUpdateRequest): Observable<UserUpdateResponse> {
    return this._http.put<UserUpdateResponse>(`${this._baseURL}/users/${userUpdateRequest.id}`, userUpdateRequest)
      .pipe(
        tap((response) => console.warn("USUARIO", response)),
        map((response: UserUpdateResponse) => {
          const currentUsers = this._users.getValue();
          const updatedUsers = currentUsers.map((user) => {
            if (user.id === userUpdateRequest.id) {
              return {
                ...user,
                ...userUpdateRequest // Optional: update the product locally as well
              };
            }
            return user;
          });
          this._users.next(updatedUsers);
          return response;
        })
      );
  }


  public getUserById(userId: number): Observable<UserGetByIdResponse> {
    return this._http.get<UserGetByIdResponse>(`${this._baseURL}/users/${userId}/findById`);
  }

  public deleteUserById(userId: number): Observable<void> {
    return this._http.delete<void>(`${this._baseURL}/users/${userId}`)
      .pipe(
        map(() => {
          const currentUsers = this._users.getValue();
          const updatedProducts = currentUsers.filter((user:UserUpdateResponse) => user.id != userId);
          this._users.next(updatedProducts);
        })
      );
  }
}
