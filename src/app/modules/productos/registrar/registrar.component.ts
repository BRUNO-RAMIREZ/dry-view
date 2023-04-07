import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {ProductosService} from '../services/productos.service';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductModel } from 'src/app/core/models/product.model';
  

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  public tituloForm;
  private edicion:boolean;
  public imgPro:string;
  public producto:ProductModel;
  get nombre(){
    return this.formProduct.get('nombre')
  }
  get descripcion(){
    return this.formProduct.get('descripcion')
  }
  get precioCompra(){
    return this.formProduct.get('precioCompra')
  }
  get precioVenta(){
    return this.formProduct.get('precioVenta')
  }
  get cantidad(){
    return this.formProduct.get('cantidad')
  }

   public formProduct:FormGroup;
  constructor(private activatedroute:ActivatedRoute,
              private fb: FormBuilder,
              private router:Router,
              private productosservice:ProductosService) { 
      this.edicion = false;
    this.tituloForm = "";
    this.imgPro ='';
    this.producto = {description:'',image:'',name:'',id:0,purchasePrice:0,salePrice:0,stock:0};
    this.formProduct=this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(4),Validators.maxLength(80),Validators.pattern('[a-zA-Z0-9]*')]],
      descripcion:['',[Validators.required,Validators.minLength(4),Validators.maxLength(80),Validators.pattern('[a-zA-Z0-9]*')]],
      precioCompra:['',Validators.required],
      precioVenta:['',Validators.required],
      cantidad:['',Validators.required],

    });
  }
  public registrar(){
    if(this.formProduct.valid){
      this.producto.name = this.nombre?.value;
      this.producto.image = this.imgPro;
      this.producto.description = this.descripcion?.value;
      this.producto.purchasePrice = this.precioCompra?.value;
      this.producto.salePrice = this.precioVenta?.value;
      this.producto.stock = this.cantidad?.value;
      console.log(JSON.stringify(this.producto));
      if(this.edicion){
        
        this.productosservice.updateProduct(this.producto).subscribe(pr =>{

          this.redireccionar('/products/list');
        },error =>{console.log(error)});
      }else{
        this.productosservice.createProduct(this.producto).subscribe(pr=>{
          console.log(pr);
          this.redireccionar('/products/list');
        },error =>{console.log(error)})
      }
    }else{
      console.log("algo esta mal");
    }
  }
  public redireccionar(ruta:string){
    this.router.navigate([ruta]);    
  }
  public cambImagen(e:any){
    this.imgPro = e[0].base64;
  }
  ngOnInit(): void {
    this.activatedroute.params.subscribe(params =>{
      if(params.id){
       this.tituloForm = "Edicion de Productos";
       this.edicion = true;
       this.productosservice.getProductById(params.id).subscribe(p=>{
        this.producto = p;
        this.nombre?.setValue(p.name);
        this.descripcion?.setValue(p.description);
        this.precioCompra?.setValue(p.purchasePrice);
        this.precioVenta?.setValue(p.salePrice);
        this.cantidad?.setValue(p.stock);
        if(p.image){
          this.imgPro = p.image;
        }else{
          this.imgPro = '';
        }
        
       });
      }else{
       this.tituloForm = "Registro de Productos";
      }
   });
 }

}
