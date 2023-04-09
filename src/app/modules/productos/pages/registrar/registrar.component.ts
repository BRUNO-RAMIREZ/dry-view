import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductCommon, ProductCreateRequest, ProductCreateResponse} from "../../../../core/models/product.model";
import {Subject} from "rxjs";
import {switchMap, take} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit, OnDestroy {
  public formularyProducts!: FormGroup;
  public imageData: string;
  public productCommon: ProductCommon;

  private _unsubscribed: Subject<void>;


  constructor(private _productService: ProductosService,
              private _formsBuilder: FormBuilder,
              private _activateRoute: ActivatedRoute) {
    this.imageData = '';
    this._unsubscribed = new Subject<void>();
    this.productCommon = {
      name: '',
      description: '',
      image: '',
      purchasePrice: 0,
      salePrice: 0,
      stock: 0
    }
  }

  ngOnInit(): void {
    this._activateRoute.params
      .pipe(
        switchMap(({id}) => this._productService.getProductById(id))
      ).subscribe(response => console.log('PRODUCTO: ', response))
    this._validate();
  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }

  public createProduct(): void {
    if (this.formularyProducts.valid) {
      const product = this._buildProduct();
      console.warn(product);
      this._productService.createProduct(product)
        .pipe(take(1))
        .subscribe(
          (response: ProductCreateResponse) => {
            console.warn('Product created successfully', response)
          },
          (error) => {
            console.error('An error occurred while creating the product', error)
          });
      this.formularyProducts.reset();
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
      name: ['', [Validators.required, Validators.maxLength]],
      description: ['', [Validators.required, Validators.maxLength]],
      purchasePrice: [0, Validators.min(0)],
      salePrice: [0, Validators.min(0)],
      stock: [0, Validators.min(0)]
    });
  }
}
