import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserCreateRequest, UserCreateResponse} from "../../../core/models/user.model";
import {Observable} from "rxjs";

@Injectable()
export class UsuariosService {
  private _baseURL: string;

  constructor(private _http: HttpClient) {
    this._baseURL = environment.baseURL;
  }

  public createUser(user: UserCreateRequest): Observable<UserCreateResponse> {
    return this._http.post<UserCreateResponse>(`${this._baseURL}/users/create`, user);
  }
}
