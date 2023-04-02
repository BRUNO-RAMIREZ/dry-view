import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
  

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  public tituloForm;
  
  
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
              private fb: FormBuilder) { 
  this.tituloForm = "";
    this.formProduct=this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(4),Validators.maxLength(80)]],
      descripcion:['',[Validators.required,Validators.minLength(4),Validators.maxLength(80)]],
      precioCompra:['',Validators.required],
      precioVenta:['',Validators.required],
      cantidad:['',Validators.required],

    });
  }
  public registrar(){

  }
  ngOnInit(): void {
    this.activatedroute.params.subscribe(params =>{
      if(params.id){
       this.tituloForm = "Edicion de Productos";
      }else{
       this.tituloForm = "Registro de Productos";
      }
   });
 }

}
