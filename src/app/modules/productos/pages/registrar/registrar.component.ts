import {Component, OnInit} from '@angular/core';
import {ProductosService} from "../../services/productos.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductModel} from "../../../../core/models/product.model";

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  public formularioProductos!: FormGroup;

  constructor(private _productService: ProductosService,
              private _formsBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.validate();
  }

  public validate(): void {
    this.formularioProductos = this._formsBuilder.group({
      name: ['', [Validators.required, Validators.maxLength]],
      description: ['', [Validators.required, Validators.maxLength]],
      purchasePrice: [0, Validators.min(0)],
      salePrice: [0, Validators.min(0)],
      stock: [0, Validators.min(0)]
    });
  }

  public createProduct(): void {
    if (this.formularioProductos.valid) {
      const formValue = this.formularioProductos.value;
      const product: ProductModel = {
        name: formValue.name,
        description: formValue.description,
        purchasePrice: formValue.purchasePrice,
        salePrice: formValue.salePrice,
        stock: formValue.stock,
      }
      this._productService.createProduct(product).subscribe(console.log);
    }
  }
}
