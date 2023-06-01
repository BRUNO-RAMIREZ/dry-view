import { Component, OnInit , OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Chart,registerables} from 'node_modules/chart.js';
import { Subject } from 'rxjs/internal/Subject';
import { EstadisticasService } from '../../services/estadisticas.service';

import {VentasListResponse} from '../../../../core/models/ventas.model';

Chart.register(...registerables);
@Component({
  selector: 'app-home-estadisticas',
  templateUrl: './home-estadisticas.component.html',
  styleUrls: ['./home-estadisticas.component.scss']
})



export class HomeEstadisticasComponent implements OnInit, OnDestroy {

  private _unsubscribed: Subject<void>;
  public ventas:VentasListResponse[] = [];
  public desde1:any;
  public hasta1:any;
  public tiempoElegido1:number;
  public desde2:any;
  public hasta2:any;
  public tiempoElegido2:number;
  public desde3:any;
  public maximaFecha:string;
  public hasta3:any;
  public tiempoElegido3:number;
  public myChart?:Chart;
  public myChart2?:Chart;
  public myChart3?:Chart; 
  constructor(
    private _estadisticasServices:EstadisticasService,
    private _activateRoute: ActivatedRoute,
    private _router: Router) { 
      this._unsubscribed = new Subject<void>();
      this.tiempoElegido1 = 0;
      this.tiempoElegido2 = 0;
      this.tiempoElegido3 = 0;
      let datAct = new Date();
      this.maximaFecha = ""+datAct.getFullYear()+"-";
      if(datAct.getMonth() <9){
        this.maximaFecha += "0";
      }
      this.maximaFecha += (datAct.getMonth() +1)+"-";
      if(datAct.getDate() <10){
        this.maximaFecha += "0";
      }
      this.maximaFecha += datAct.getDate();
    }
  

  convertirADate(fecha:any):Date{
    if(fecha){
      var f:string = fecha;
      var c = 0;
      var anio = '';
      var mes = '';
      var dia = '';
      while(f.length > 0){
        if(f.charAt(0) != '-'){
          if(c == 0){
            anio = anio + f.charAt(0);
          }else if(c == 1){
            mes = mes + f.charAt(0);
          }else{
            dia = dia + f.charAt(0);
          }
        }else{
          c++;
        }
        if(f.length >1){
          f = f.substring(1);
        }else{
          f = '';
        }
      }
      var d = new Date();
      d.setDate(Number(dia));
      d.setFullYear(Number(anio));
      d.setMonth((Number(mes) -1 ));
      return d;
    }else{
      return new Date();
    }
  }

  ngOnInit(): void {

    this.tiempoElegido1 = 0;
    this.renderChart();
    this._estadisticasServices.getAllVentas().subscribe(res =>{
      this.ventas = res;
    })


    //05-30-2023
   // this.renderChart2();
    //this.renderChart3();

  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }

  getSubVentasFechas(desde:Date, hasta:Date):VentasListResponse[]{
    var res:VentasListResponse[] = [];
    var d = new Date();
    d.setDate(desde.getDate());
    d.setFullYear(desde.getFullYear());
    d.setMonth(desde.getMonth());
    d.setHours(0,0);

    var h = new Date();
    h.setDate(hasta.getDate());
    h.setFullYear(hasta.getFullYear());
    h.setMonth(hasta.getMonth());
    h.setHours(23,59);
    for(let i = 0 ; i < this.ventas.length ; i++){
      if(this.ventas[i].saleDate >= d && this.ventas[i].saleDate <= h){
        res.push(this.ventas[i]);
      }
    }
    return res;

  }
  renderChart(){

    if(this.desde1 != '' && this.hasta1 != '' && this.desde1 != undefined && this.hasta1 != undefined){
      let des = this.convertirADate(this.desde1);
      let has = this.convertirADate(this.hasta1);
      if(des <= has){
        this._estadisticasServices.getAllVentas().subscribe(res =>{
          this.ventas = res;
          var ventas = this.getSubVentasFechas(des, has);

          var labelsProductos:string[] = [];
          var ventasdata:number[] = [];
          if(ventas){
            for(let  i = 0 ; i < ventas.length ; i++){
              for(let j = 0 ; j < ventas[i].products.length ; j++){
                if( labelsProductos.indexOf(ventas[i].products[j].name) != -1){
                  ventasdata[labelsProductos.indexOf(ventas[i].products[j].name)] += ventas[i].quantityStockOfProductsSaled[j];
                }else{
                  labelsProductos.push(ventas[i].products[j].name);
                  ventasdata.push(ventas[i].quantityStockOfProductsSaled[j]);
                }
              }
            }
            if (this.myChart) {
              this.myChart.destroy();
            }
            const ctx = document.getElementById('myChart');
                  
            this.myChart = new Chart("myChart", {
              type: 'bar',
              data: {
                labels: labelsProductos,
                datasets: [{
                  label: 'Número de ventas',
                  data: ventasdata,
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
          }else{
            if (this.myChart) {
              this.myChart.destroy();
            }
            const ctx = document.getElementById('myChart');
                  
            this.myChart = new Chart("myChart", {
              type: 'bar',
              data: {
                labels: [''],
                datasets: [{
                  label: 'Número de ventas',
                  data: [],
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
          }
        });

        
        
      }
    }else{
      if (this.myChart) {
        this.myChart.destroy();
      }
      const ctx = document.getElementById('myChart');
            
      this.myChart = new Chart("myChart", {
        type: 'bar',
        data: {
          labels: [''],
          datasets: [{
            label: 'Número de ventas',
            data: [],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }



}
