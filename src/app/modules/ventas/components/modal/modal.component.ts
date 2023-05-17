import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

/*
import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {VentasListResponse} from "../../../../core/models/ventas.model";
import {Cliente} from "../../../../core/models/client.model";
import {catchError, take} from "rxjs/operators";
import {VentasService} from "../../services/ventas.service";
import {ToastrService} from "ngx-toastr";

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
  @Input() public venta: VentasListResponse;
  @Input() public cliente: Cliente;
  @Input() public color: string;
  @Input() public icon: string;
  @Input() public txtButton: string;

  constructor(private _ventaService: VentasService,
              private _toastrService: ToastrService) {
    this.onCloseModal = new EventEmitter<boolean>();
    this.title = '';
    this.cliente = {id: 0, ci: '', lastName: ''}
    this.venta = {id: 0,code: '',client: cliente, products: [],total:[], finalPrice: 0, dateSale: new Date(), status:''}
    this.color = '';
    this.icon = '';
    this.txtButton = '';
  }
}
  ngAfterViewInit() {
    this.marginTopModal.nativeElement.style.backgroundColor = this.color;
    this.marginBottomModal.nativeElement.style.backgroundColor = this.color;
    this.iconBottomModal.nativeElement.hidden = this.icon ? false : true;
  }

  public closeModal(): void {
    this.onCloseModal.emit(true);
  }

  public deleteProductById(): void {
    if (this.txtButton === 'Eliminar') {
      this._ventaService.deleteProductById(this.product.id)
        .pipe(take(1))
        .subscribe(() => {
          this._toastrService.warning(`${this.product.name} eliminado con éxito`, 'Eliminar')
        }, (error) => {
          this._toastrService.error(`Ocurrió un error al eliminar el producto`)
        });
    }
    this.closeModal();
  }
}
*/