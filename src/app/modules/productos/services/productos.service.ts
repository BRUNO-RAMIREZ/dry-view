import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

import {
  ProductCreateRequest,
  ProductCreateResponse,
  ProductGetAllResponse, ProductGetByIdResponse,
  ProductListResponse, ProductUpdateRequest, ProductUpdateResponse, ProductUpdateStockRequest,
} from "../../../core/models/product.model";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class ProductosService {
  private _baseURL: string;
  private _products: BehaviorSubject<ProductListResponse[]>;

  constructor(private _http: HttpClient) {
    this._baseURL = environment.baseURL;
    this._products = new BehaviorSubject<ProductListResponse[]>([]);
    this.getAllProducts().subscribe(response => {
      this._products.next(response);
    })
  }

  public get productsObservable(): Observable<ProductListResponse[]> {
    return this._products.asObservable();
  }

  public createProduct(product: ProductCreateRequest): Observable<ProductCreateResponse> {
    return this._http.post<ProductCreateResponse>(`${this._baseURL}/products/create`, product)
      .pipe(map((newProduct: ProductCreateResponse) => {
        const currentProducts = this._products.getValue();
        this._products.next([...currentProducts, newProduct]);
        return newProduct;
      }));
  }

  // Evitar usar este metodo directamente utilizar el productsObservable
  public getAllProducts(): Observable<ProductListResponse[]> {
    return this._http.get<ProductGetAllResponse>(`${this._baseURL}/products/getAll`)
      .pipe(map(res => res.products));
  }

  public updateStock(productId: number): Observable<void> {
    return this._http.put<void>(`${this._baseURL}/products/${productId}/updateStock`, {})
      .pipe(map(() => {
          const currentProducts = this._products.getValue();
        const updatedProducts = currentProducts.map((product: ProductUpdateStockRequest) => {
          if (product.id === productId) {
            const updatedProduct = {
              ...product,
              stock: product.stock + 1
            };
            return updatedProduct;
          }
          return product;
        });
        const updatedProductsCopy = [...updatedProducts];
        this._products.next(updatedProductsCopy);
        })
      );
  }

  public updateProduct(productUpdateRequest: ProductUpdateRequest): Observable<ProductUpdateResponse> {
    return this._http.put<ProductUpdateResponse>(`${this._baseURL}/products/${productUpdateRequest.id}`, productUpdateRequest)
      .pipe(
        map((response: ProductUpdateResponse) => {
          const currentProducts = this._products.getValue();
          const updatedProducts = currentProducts.map((product: ProductUpdateRequest) => {
            if (product.id === productUpdateRequest.id) {
              return {
                ...product,
                ...productUpdateRequest // Optional: update the product locally as well
              };
            }
            return product;
          });
          this._products.next(updatedProducts);
          return response;
        })
      );
  }


  public getProductById(productId: number): Observable<ProductGetByIdResponse> {
    return this._http.get<ProductGetByIdResponse>(`${this._baseURL}/products/${productId}/findById`);
  }

  public deleteProductById(productId: number): Observable<void> {
    return this._http.delete<void>(`${this._baseURL}/products/${productId}`)
      .pipe(
        map(() => {
          const currentProducts = this._products.getValue();
          const updatedProducts = currentProducts.filter((product: ProductUpdateRequest) => product.id !== productId);
          this._products.next(updatedProducts);
        })
      );
  }
}
