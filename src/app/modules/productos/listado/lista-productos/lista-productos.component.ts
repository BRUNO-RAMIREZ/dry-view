import { Component, OnInit } from '@angular/core';
import {ProductModel} from '../../../../core/models/product.model';
import {ProductosService} from '../../services/productos.service';
import {productos} from '../../../../data/productos';
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss']
})
export class ListaProductosComponent implements OnInit {
  public listaProductos:ProductModel[];

  public maxProductosPorHoja:number;
  public numPaginas:number;
  public pagActual:number;

  public numBotones:number[];
  constructor(private productoservice:ProductosService) {
    this.listaProductos = productos;
    this.maxProductosPorHoja = 10;
    this.numPaginas = 1;
    this.pagActual = 1;
    this.numBotones = [1];
  }

  public cambiarPagina(pag:number):void{

  }

  ngOnInit(): void {
    /*this.productoservice.getAllProductos().subscribe(list =>{
      this.listaProductos = list;
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
    }, error =>{
      console.log('error en : ' + error);
    });*/
  }

}
