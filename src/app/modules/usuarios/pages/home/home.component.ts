import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UserListResponse} from "../../../../core/models/user.model";
import {UsuariosService} from "../../../usuarios/services/usuarios.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public users: Observable<UserListResponse[]>;
  public userNameSearch: string;
  public totalUsers: number;
  public page: number;

  constructor(private _userService: UsuariosService) {
    this.users = new Observable<UserListResponse[]>();
    this.userNameSearch = '';
    this.totalUsers = 0;
    this.page = 0;
  }

  ngOnInit(): void {
    this.users = this._userService.usersObservable
      .pipe(
        tap(users => this.totalUsers = users.length)
      );
  }

  public searchUserByName(userName: string): void {
    this.userNameSearch = userName;
  }

  public trackById(index: number, user: UserListResponse): number{
    return user.id;
  }

}
