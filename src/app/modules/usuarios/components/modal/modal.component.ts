import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {UserListResponse} from "../../../../core/models/user.model";
import {take} from "rxjs/operators";
import {UsuariosService} from "../../services/usuarios.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../auth/services/auth.service";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('marginTopModal', {static: false}) marginTopModal!: ElementRef;
  @ViewChild('marginBottomModal', {static: false}) marginBottomModal!: ElementRef;
  @ViewChild('iconBottomModal', {static: false}) iconBottomModal!: ElementRef;

  @Output() public onCloseModal: EventEmitter<boolean>;

  @Input() public title: string;
  @Input() public user: UserListResponse;
  @Input() public color: string;
  @Input() public icon: string;
  @Input() public txtButton: string;

  constructor(private _userService: UsuariosService,
              private _toastrService: ToastrService,
              private _authService: AuthService) {
    this.onCloseModal = new EventEmitter<boolean>();
    this.title = '';
    this.user = {id: 0, name: '', lastName: '', email: '', username:'', password:'', image:'', phone: 0}
    this.color = '';
    this.icon = '';
    this.txtButton = '';
  }

  ngAfterViewInit() {
    this.marginTopModal.nativeElement.style.backgroundColor = this.color;
    this.marginBottomModal.nativeElement.style.backgroundColor = this.color;
    this.iconBottomModal.nativeElement.hidden = this.icon ? false : true;
  }

  public closeModal(): void {
    this.onCloseModal.emit(true);
  }

  public deleteUsertById(): void {
    if (this.txtButton === 'Eliminar') {
      if (this.user.email !== this._authService.getAuthToken()) {
      this._userService.deleteUserById(this.user.id)
        .pipe(take(1))
        .subscribe(() => {
          this._toastrService.warning(`${this.user.name} fue eliminado exitosamente`, 'Eliminar')
        }, (error) => {
          this._toastrService.error(`${this.user.name} no fue eliminado, intente nuevamente`)
        });
      }else {
        this._toastrService.error(`No es posible eliminar tu propia cuenta`, 'Error')
      }
    }
    this.closeModal();
  }
}
