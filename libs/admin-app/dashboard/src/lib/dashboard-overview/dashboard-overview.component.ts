import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';

@Component({
  selector: 'grid-watch-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
})
export class DashboardOverviewComponent implements OnInit {

  chartTitles = ["Pothole", "Sinkhole", "Water Outage", "Electricity Outage", "Other"];

  constructor() {}

  ngOnInit(): void {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.initiateGraphs();
  }

  initiateGraphs() : void {
    for (let index = 0; index < 1; index++) {
      
      const canvas = <HTMLCanvasElement> document.getElementById('myChart' + index);
      // console.log(canvas);
      if (canvas !== null)
      {
        const ctx = canvas.getContext('2d');
        if (ctx !== null)
        {
          const myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ["1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",],
              datasets: [
                {
                  label: '# of Votes',
                  data: [Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0), Math.floor(Math.random() * (1000 - 0 + 1) + 0)],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: false,
                },
              },
            },
          });
        }
      }
    }
  }
}
