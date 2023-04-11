import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  ProductCreateRequest,
  ProductCreateResponse,
  ProductUpdateRequest, ProductUpdateResponse
} from "../../../../core/models/product.model";
import {Subject} from "rxjs";
import {switchMap, take} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit, OnDestroy {
  public formularyProducts!: FormGroup;
  public imageData: string;
  public productUpdateRequest: ProductUpdateRequest;

  private _unsubscribed: Subject<void>;


  constructor(private _productService: ProductosService,
              private _formsBuilder: FormBuilder,
              private _activateRoute: ActivatedRoute,
              private _router: Router) {
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
    this._unsubscribed = new Subject<void>();
    this._validate();
  }

  ngOnInit(): void {
    this._activateRoute.params
      .pipe(
        switchMap(({id}) => this._productService.getProductById(id))
      ).subscribe(response => {
      this.productUpdateRequest = response;
      this.imageData = this.productUpdateRequest.image;
      this._validate();
    })
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }

  public createProduct(): void {
    if (this.productUpdateRequest.id) {
      const productUpdateRequest: ProductUpdateRequest = {...this.formularyProducts.value, id: this.productUpdateRequest.id};
      console.warn(productUpdateRequest);
      this._productService.updateProduct(productUpdateRequest)
        .pipe(take(1))
        .subscribe(
          (response: ProductUpdateResponse) => {
            console.warn('Product Updated successfully', response)
          },
          (error) => {
            console.error('An error occurred while updated the product', error)
          });
    }else {
      if (this.formularyProducts.valid) {
        const product = this._buildProduct();
        console.warn(product);
        this._productService.createProduct(product)
          .pipe(take(1))
          .subscribe(
            (response: ProductCreateResponse) => {
              this._router.navigate(['/productos/listado']);
              console.warn('Product created successfully', response)
            },
            (error) => {
              console.error('An error occurred while creating the product', error)
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

  private _buildProduct(): ProductCreateRequest {
    const formValue = this.formularyProducts.value;
    const product: ProductCreateRequest = {
      name: formValue.name,
      description: formValue.description,
      image: this.imageData,
      purchasePrice: formValue.purchasePrice,
      salePrice: formValue.salePrice,
      stock: formValue.stock,
    }
    return product;
  }

  private _validate(): void {
    this.formularyProducts = this._formsBuilder.group({
      name: [this.productUpdateRequest.name ? this.productUpdateRequest.name: '', [Validators.required, Validators.maxLength]],
      description: [this.productUpdateRequest.description ? this.productUpdateRequest.description: '', [Validators.required, Validators.maxLength]],
      purchasePrice: [this.productUpdateRequest.purchasePrice ? this.productUpdateRequest.purchasePrice: 0, Validators.min(0)],
      salePrice: [this.productUpdateRequest.salePrice ? this.productUpdateRequest.salePrice: 0, Validators.min(0)],
      stock: [this.productUpdateRequest.stock ? this.productUpdateRequest.stock: 0, Validators.min(0)]
    });

  }
}
