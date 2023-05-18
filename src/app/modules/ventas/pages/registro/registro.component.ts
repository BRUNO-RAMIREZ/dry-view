import { Component,DoCheck, OnInit , OnDestroy} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductosService } from '../../../productos/services/productos.service';
import { VentasService } from '../../services/ventas.service';
import { FormBuilder,FormControl,FormGroup, Validators } from "@angular/forms";
import {ProductMapper} from "../../../../core/mappers/product.mapper";
import {Observable, Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import { ProductListResponse ,ProductCreateRequest} from 'src/app/core/models/product.model';
import { VentasCreateRequest,
  VentasCreateResponse,
  VentasGetByIdResponse,
  VentasUpdateRequest, VentasUpdateResponse} from 'src/app/core/models/ventas.model'
import {debounceTime, map, subscribeOn, take, takeUntil, tap} from "rxjs/operators";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, OnDestroy{
  private _unsubscribed: Subject<void>;
  public products: ProductListResponse[]=[];
  public cantidadesVentas:number[] = [];
  public venta:VentasCreateRequest;
  public productNameSearch:string;
  public page: number;
  public productosEnCarrito: ProductListResponse[] = [];
  loading = false;

  control = new FormControl();
  listaProductosParaVenta:VentasUpdateRequest[] = [];
  
  columnasTabla:string[] = ['img','producto','precio','estado','cantidad'];
  datosDetalleVenta= new MatTableDataSource(this.listaProductosParaVenta)

  constructor(private _productService: ProductosService,
              private _router: Router,
              private _ventaService:VentasService,
              private _toastService:ToastrService) {
                this._unsubscribed = new Subject<void>();
                this.venta = {client:{ci:'',lastName:''},code:"0",saleDate:new Date(),products:[],state:true,total:0};
                this.productNameSearch = "";
                this.page              = 0;
              }


  ngOnInit(): void {
    this._productService.getAllProducts().subscribe(prod =>{
      this.products = prod;
    });
    this.observerChangeSearch();


  }
  public pageChangeA(event:any):void{
    this.page = event;
  }
  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }
  

  observerChangeSearch(){
    this.control.valueChanges.pipe(
      debounceTime(1000)).subscribe(query => {
      this.getNombreByQuery(query);
    });
  }
  
  getNombreByQuery(query: string) {
    this.loading = true;
    this._productService.getAllProducts().subscribe(products => {
      this.products = products.filter(product => product.name.includes(query));
      this.loading=false;
    });
  }

  calcularPrecioTotal(){
    var pt = 0;
    for(let i = 0 ; i < this.cantidadesVentas.length ; i++){
      pt += this.cantidadesVentas[i] * this.productosEnCarrito[i].salePrice;
    }
    this.venta.total = pt;
  }

  
  addProd(product:ProductListResponse){
    if(product.stock >0){
      if(this.productosEnCarrito.indexOf(product) != -1){
        this.cantidadesVentas[this.productosEnCarrito.indexOf(product)]++;
        product.stock--;
      }else{
        this.cantidadesVentas.push(1);
        this.productosEnCarrito.push(product);
        product.stock--;
      }
      this.productNameSearch = '';
      this.calcularPrecioTotal();
    }else{
    //toast feo
    }
    
  }


  restProduct(product:ProductListResponse){
    var inde = this.productosEnCarrito.indexOf(product);
    if(this.cantidadesVentas[inde] > 1){
      product.stock++;
      this.cantidadesVentas[inde]--;
      this.calcularPrecioTotal();
    }else{

    }
  }

  quitarProducto(product:ProductListResponse){
    var inde = this.productosEnCarrito.indexOf(product);
    product.stock += this.cantidadesVentas[inde];
    this.productosEnCarrito.splice(inde,1);
    this.cantidadesVentas.splice(inde,1);
    this.calcularPrecioTotal();
  }
  registrarVenta(){
    this._ventaService.getAllVenta().subscribe(res =>{
      
        this.venta.code = '#'+(res.length+1);
      
      
      this.venta.saleDate = new Date();
      this.venta.client.ci = this.venta.client.ci.trim();
      this.venta.client.lastName = this.venta.client.lastName.trim();
      this.venta.state = true;
      this.venta.products = [];
      for(let i = 0 ; i < this.productosEnCarrito.length ; i++){
        this.venta.products.push({description:this.productosEnCarrito[i].description,image:this.productosEnCarrito[i].image,name:this.productosEnCarrito[i].name,purchasePrice:this.productosEnCarrito[i].purchasePrice,salePrice:this.productosEnCarrito[i].salePrice,stock:this.productosEnCarrito[i].stock});
      }
      this._ventaService.createVenta(this.venta).subscribe(() => {
        this._toastService.success(`Venta registrada con éxito`, 'Registrar')
       this._router.navigate(['ventas/listado']);
      }, error => {
        this._toastService.error('No se pudo registrar esta venta', 'Error');
      });
    })
  }
  public searchProductByName(productName: string): void {
    this.productNameSearch = productName;
  }
 
}