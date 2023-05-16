import { Component, OnInit } from '@angular/core';
import {Chart,registerables} from 'node_modules/chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-home-estadisticas',
  templateUrl: './home-estadisticas.component.html',
  styleUrls: ['./home-estadisticas.component.scss']
})
export class HomeEstadisticasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart(){
    const ctx = document.getElementById('myChart');
          
    new Chart("myChart", {
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
