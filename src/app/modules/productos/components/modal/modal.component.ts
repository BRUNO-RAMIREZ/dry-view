import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ProductListResponse} from "../../../../core/models/product.model";
import {take} from "rxjs/operators";
import {ProductosService} from "../../services/productos.service";

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
  @Input() public product: ProductListResponse;
  @Input() public color: string;
  @Input() public icon: string;
  @Input() public txtButton: string;

  constructor(private _productService: ProductosService) {
    this.onCloseModal = new EventEmitter<boolean>();
    this.title = '';
    this.product = {id: 0, name: '', description: '', image: '', purchasePrice: 0, salePrice: 0, stock: 0}
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

  public deleteProductById(): void {
    if (this.txtButton === 'Eliminar') {
      this._productService.deleteProductById(this.product.id)
        .pipe(take(1))
        .subscribe();
    }
    this.closeModal();
  }
}
