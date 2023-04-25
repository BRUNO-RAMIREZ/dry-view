import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {
  UserCreateRequest,
  UserCreateResponse,
  UserGetAllResponse,
  UserGetByEmailResponse,
  UserGetByIdResponse,
  UserListResponse,
  UserUpdateRequest,
  UserUpdateResponse
} from "../../../core/models/user.model";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private _baseURL: string;
  private _users: BehaviorSubject<UserListResponse[]>;

  constructor(private _http: HttpClient) {
    this._baseURL = environment.baseURL;
    this._users = new BehaviorSubject<UserListResponse[]>([])
    this.getAllUsers().subscribe(response => this._users.next(response));
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
          const updatedProducts = currentUsers.filter((user: UserUpdateResponse) => user.id != userId);
          this._users.next(updatedProducts);
        })
      );
  }

  public getUserByEmail(email: string): Observable<UserGetByEmailResponse> {
    return this._http.get<UserGetByEmailResponse>(`${this._baseURL}/users/getByEmail/${email}`);
  }

  public changePasswordByUserId(userId: number, passwordNew: string): Observable<void> {
    return this._http.put<void>(`${this._baseURL}/users//${userId}/changePassword/${passwordNew}`, {});
  }
}
