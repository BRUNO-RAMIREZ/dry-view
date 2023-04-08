import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProductModel} from '../../../../core/models/product.model';
import {ProductosService} from '../../services/productos.service';
import {Route, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {VentanaConfirmacionComponent} from '../../../../shared/ventana-confirmacion/ventana-confirmacion.component';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  
  public listaProductos:ProductModel[];
  public listaProductosMostrandose:ProductModel[];
  public maxProductosPorHoja:number;
  public numPaginas:number;
  public pagActual:number;

  public numBotones:number[];
  constructor(private productoservice:ProductosService,private router:Router,
              public dialogo: MatDialog) {
    this.listaProductos = [];
    this.listaProductosMostrandose = [];
    this.maxProductosPorHoja = 10 ;
    this.numPaginas = 1;
    this.pagActual = 1;
    this.numBotones = [1];
  }

  public cambiarPagina(pag:number):void{
    if(pag >=1 && pag <= this.numPaginas){
      this.listaProductosMostrandose = [];
      

      for(let i = (pag-1)*this.maxProductosPorHoja ; i < this.listaProductos.length && i < this.maxProductosPorHoja*pag; i++ ){
       
        this.listaProductosMostrandose.push(this.listaProductos[i]);
      }

      let primerBoton = 0;
      if(pag - 2 > 0){
        primerBoton = pag -2;
      }
      this.numBotones = [];
      for(let i = primerBoton ; i < primerBoton+4 && i < this.numPaginas;i++){
        this.numBotones.push((i+1));
      }
      this.pagActual = pag;
    }
  }

  public redireccionar(ruta:string){
    this.router.navigate([ruta]);
  }
  public eliminarProducto(producto:ProductModel){
    this.dialogo
    .open(VentanaConfirmacionComponent, {
      data:{mensaje:"¿Estas seguro que desea eliminar el producto?",pro:producto},panelClass:'custom-dialog-container'
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) { 
        if(producto.id){
          this.productoservice.deleteProduct(producto.id).subscribe(res =>{
            console.log(res);
            this.listaProductos.splice(this.listaProductos.indexOf(producto),1);
            this.listaProductosMostrandose.splice(this.listaProductos.indexOf(producto),1);
          },error =>{
            console.log(error);
          });
        }
        
      }
    });
  }


  ngOnInit(): void {
     this.productoservice.getAllProducts().subscribe(list =>{
      this.listaProductos = list.products;
      if(this.listaProductos.length % this.maxProductosPorHoja == 0){
        this.numPaginas = this.listaProductos.length / this.maxProductosPorHoja;
      }else{
        this.numPaginas = ((this.listaProductos.length / this.maxProductosPorHoja) | 0)+1;
      }

      let numBot = 5;
      if(this.numPaginas <5){ // si son menos de 5 paginas, los botones van desde 1 hasta n<5
        numBot = this.listaProductos.length;
      }
      this.numBotones = [];
      for(let i:number = 0 ; i < numBot ; i++){
        this.numBotones[i] = i+1;
      }
      this.cambiarPagina(1);
    }, error =>{
      console.log('error en : ' + error);
    });
  } 
}

  
