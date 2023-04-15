import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  ProductCreateRequest,
  ProductCreateResponse,
  ProductUpdateRequest, ProductUpdateResponse
} from "../../../../core/models/product.model";
import {Subject} from "rxjs";
import {filter, switchMap, take} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit, DoCheck, OnDestroy {
  public formularyProducts!: FormGroup;
  public imageData: string;
  public productUpdateRequest: ProductUpdateRequest;
  public title: string;

  private _unsubscribed: Subject<void>;


  constructor(private _productService: ProductosService,
              private _formsBuilder: FormBuilder,
              private _activateRoute: ActivatedRoute,
              private _router: Router,
              private _toastrService: ToastrService) {
    this.imageData = '';
    this.productUpdateRequest = {
      id: 0,
      name: '',
      description: '',
      image: '',
      purchasePrice: 0,
      salePrice: 0,
      stock: 0
    }
    this.title = '';
    this._unsubscribed = new Subject<void>();
    this._validate();
  }

  ngOnInit(): void {
    this._activateRoute.params
      .pipe(
        filter(params => params.hasOwnProperty('id')),
        switchMap(({id}) => this._productService.getProductById(id))
      ).subscribe(response => {
      this.productUpdateRequest = response;
      this.imageData = this.productUpdateRequest.image;
      this._validate();
    })
  }

  ngDoCheck(): void {
    this.title = this.productUpdateRequest.id? 'Editar producto': 'Registrar producto';
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }

  public createProduct(): void {
    if (this.productUpdateRequest.id) {
      const productUpdateRequest: ProductUpdateRequest = {
        ...this.formularyProducts.value,
        id: this.productUpdateRequest.id,
        image: this.imageData
      };
      this._productService.updateProduct(productUpdateRequest)
        .pipe(take(1))
        .subscribe(
          (response: ProductUpdateResponse) => {
            this._toastrService.warning(`${response.name} actualizado con éxito`, 'Actualizar')
            this.redirectToWindowProductList();
          },
          (error) => {
            this._toastrService.error(`Ocurrió un error al actualizar el producto`)
          });
    } else {
      if (this.formularyProducts.valid) {
        const product = this._buildProduct();
        this._productService.createProduct(product)
          .pipe(take(1))
          .subscribe(
            (response: ProductCreateResponse) => {
              this._toastrService.success(`${response.name} registrado con éxito`, 'Registrar')
              this.redirectToWindowProductList();
            },
            (error) => {
              this._toastrService.error(`Ocurrió un error al registrar el producto`)
            });
        this.formularyProducts.reset();
      }
    }
  }

  public onFileSelected(event: any): void {
    const files: FileList | null = event?.target?.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

  public redirectToWindowProductList(): void {
    this._router.navigate(['/productos/listado']);
  }

  public verificarNum(event: any) {
    var ch = event.key;

    if (ch.charCodeAt(0) >= 48 && ch.charCodeAt(0) <= 57) {
      console.log("si es");
    } else {

      if (ch == 'e' || ch == 'E' || ch == '+' || ch == '-') {
        this.formularyProducts.setValue({});
      }
    }
  }

  private _buildProduct(): ProductCreateRequest {
    const formValue = this.formularyProducts.value;
    const product: ProductCreateRequest = {
      name: formValue.name,
      description: formValue.description,
      image: this.imageData ? this.imageData : '../../../../../assets/image-default.jpg',
      purchasePrice: formValue.purchasePrice,
      salePrice: formValue.salePrice,
      stock: formValue.stock,
    }
    return product;
  }

  get nombre() {
    return this.formularyProducts.get('name')
  }

  get descripcion() {
    return this.formularyProducts.get('description')
  }

  get precioCompra() {
    return this.formularyProducts.get('purchasePrice')
  }

  get precioVenta() {
    return this.formularyProducts.get('salePrice')
  }

  get cantidad() {
    return this.formularyProducts.get('stock')
  }

  private _validate(): void {
    this.formularyProducts = this._formsBuilder.group({
      name: [this.productUpdateRequest.name ? this.productUpdateRequest.name : '', [Validators.required, Validators.minLength(4), Validators.maxLength(80), Validators.pattern('[a-zA-Z0-9_ñÑ]*')]],
      description: [this.productUpdateRequest.description ? this.productUpdateRequest.description : '', [Validators.required, Validators.minLength(4), Validators.maxLength(80), Validators.pattern('[a-zA-Z0-9_ñÑ]*')]],
      purchasePrice: [this.productUpdateRequest.purchasePrice ? this.productUpdateRequest.purchasePrice : 0, [Validators.min(0), Validators.required]],
      salePrice: [this.productUpdateRequest.salePrice ? this.productUpdateRequest.salePrice : 0, [Validators.min(0), Validators.required]],
      stock: [this.productUpdateRequest.stock ? this.productUpdateRequest.stock : 0, [Validators.min(0), Validators.required]]
    });

  }
}
