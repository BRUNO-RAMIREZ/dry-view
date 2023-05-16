import { Component, OnInit , OnDestroy} from '@angular/core';
import {Chart,registerables} from 'node_modules/chart.js';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
Chart.register(...registerables);
@Component({
  selector: 'app-home-estadisticas',
  templateUrl: './home-estadisticas.component.html',
  styleUrls: ['./home-estadisticas.component.scss']
})



export class HomeEstadisticasComponent implements OnInit, OnDestroy {

  private _unsubscribed: Subject<void>;

  public desde:any;
  public hasta:any;
  public tiempoElegido1:number;
  public myChart?:Chart;
  constructor(
    
    private _activateRoute: ActivatedRoute,
    private _router: Router) { 
      this._unsubscribed = new Subject<void>();
      this.tiempoElegido1 = 0;
    }
  
  convertirADate(){

  }
  repaintChart(){

  }
  ngOnInit(): void {
    this.tiempoElegido1 = 0;
    this.renderChart();

  }

  ngOnDestroy(): void {
    this._unsubscribed.next();
    this._unsubscribed.complete();
  }

  private _validate(): void {
   

  }

  renderChart(){
    console.log("holas");
    if (this.myChart) {
      this.myChart.destroy();
    }
    const ctx = document.getElementById('myChart');
          
    this.myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
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
