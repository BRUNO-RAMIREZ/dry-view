import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {tap} from "rxjs/operators";

import {UsuariosService} from "../../services/usuarios.service";
import {UserListResponse} from "../../../../core/models/user.model";
import {ProductMapper} from "../../../../core/mappers/product.mapper";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit, OnDestroy {

  public users: Observable<UserListResponse[]>;
  public totalUsers: number;
  public userMapper: ProductMapper;
  public deleteBoolean: boolean;
  public seeBoolean: boolean;
  public userNameSearch: string;
  public page: number;
  public sortBy: string;
  public order: string;
  public iconArrow: string;
  public userModal!: UserListResponse;
  private _unsubscribed: Subject<void>;

  constructor(private _userService: UsuariosService,
              private _router: Router) {
    this.users          = new Observable<UserListResponse[]>();
    this.totalUsers     = 0;
    this.userMapper     = new ProductMapper();
    this.deleteBoolean     = false;
    this.order             = 'ascendent';
    this.iconArrow         = 'unfold_more';
    this.seeBoolean        = false;
    this.userNameSearch = '';
    this.page              = 0;
    this.sortBy            = '';
    this._unsubscribed = new Subject<void>();
  }

  ngOnInit(): void {
    this.users = this._userService.usersObservable
      .pipe(
        tap(users => this.totalUsers = users.length)
      );
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }



  public trackById(index: number, user: UserListResponse): number{
    return user.id;
  }

  public goNavigateWindowRegister(): void {
    this._router.navigate(['/usuarios/registrar']);
  }

  public searchUserByName(userName: string): void {

    this.userNameSearch = userName;
  }

  public seeUsersById(): void {
    if (this.seeBoolean) {
      this.seeBoolean = false;
    }
  }

  public openModalSee(user: UserListResponse): void {
    this.seeBoolean = true;
    this.userModal = user;
  }

  public openModalDelete(user: UserListResponse): void {
    this.deleteBoolean = true;
    this.userModal = user;
  }
  public pageChangeA(event:any):void{
    this.page = event;
  }
  public closeModal(): void{
    this.deleteBoolean = false;
    this.seeBoolean = false;
  }

  public changeOrder(value: string): void {
    this.sortBy = value;
    this._orderCase();
  }

  private _orderCase(): void {
    switch (this.order) {
      case 'ascendent': {
        this.order = 'descendent';
        this.iconArrow = 'expand_less';
      } break;
      case 'descendent': {
          this.order = 'ascendent',
          this.iconArrow = 'expand_more';
      }; break;
    }
  }

}
