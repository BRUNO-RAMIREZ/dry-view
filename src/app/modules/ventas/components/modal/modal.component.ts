import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {VentasListResponse,VentasCancelRequest} from "../../../../core/models/ventas.model";
import {take} from "rxjs/operators";
import {VentasService} from "../../services/ventas.service";
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
  @Input() public venta?: VentasListResponse;
  @Input() public color: string;
  @Input() public icon: string;
  @Input() public txtButton: string;

  constructor(private _ventaService: VentasService,
              private _toastrService: ToastrService,
              private _authService: AuthService) {
    this.onCloseModal = new EventEmitter<boolean>();
    this.title = '';
  
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

  public cancelVenta(): void {
    if (this.txtButton === 'Cancelar' && this.venta) {
      this.venta.state = false;
      let cv:VentasCancelRequest = {id:this.venta.id,idsproducts:[],quantityStockOfProductsSaled:this.venta.quantityStockOfProductsSaled,state:false}; 
      for(let i = 0; i < this.venta.products.length; i++){
        cv.idsproducts.push(this.venta.products[i].id);
      }
      this._ventaService.cancelVenta(cv).pipe(take(1)).subscribe(() =>{
        this._toastrService.warning(`${this.venta?.code} fue cancelado exitosamente`, 'Cancelar');
      }, (error) =>{
        this._toastrService.error(`${this.venta?.code} no fue cancelado, intente nuevamente`)
      });
    }
    this.closeModal();
  }
}
