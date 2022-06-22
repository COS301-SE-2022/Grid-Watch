import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {} from 'chart.js/auto';


@Component({
  selector: 'grid-watch-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss'],
})
export class DashboardOverviewComponent implements AfterViewInit {
  
  
  chart! : Chart; 

  chartTitles = ["Pothole", "Sinkhole", "Water Outage", "Electricity Outage", "Other"];

  // constructor() {}

  // ngOnInit(): void {
  // }
  
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
    // Chart.register(...registerables);
    this.initiateGraphs();
  }

  initiateGraphs() : void {
    const DATA_COUNT = 7;
    const labels = ["January","February","March","April","May","June","July",];
    const dataExample = {
      labels: labels,
      datasets: [
        {
          label: 'Tickets created',
          data: [51, 25, 65, 35, 58, 100, 58],
          borderColor: 'rgba(255, 0, 0, 0.4)',
          backgroundColor: 'rgba(255, 0, 0, 0.4)',
          yAxisID: 'y',
        },
        {
          label: 'Tickets dispatched',
          data: [33, 88, 25 , 33 , 45 , 15 , 87 ],
          borderColor: 'rgba(0, 0, 255, 0.4)',
          backgroundColor: 'rgba(0, 0, 255, 0.4)',
          yAxisID: 'y2',
        }
      ]
    };
    
    const config = {
      type: "line",
      data: dataExample,
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Line Chart - Multi Axis'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
    
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        }
      },
    };

    const canvas = <HTMLCanvasElement> document.getElementById('myChart0');
    if (canvas !== null)
    {
      const ctx = canvas.getContext('2d');
      if (ctx !== null)
      {
        this.chart = new Chart(ctx, {
          type: "line",
          data: dataExample,
          options: {
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            plugins: {
              title: {
                display: true,
                text: 'Number of tickets recieved and Number of tickets dispatched '
              }
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'right',
              },
              y1: {
                type: 'linear',
                display: false,
                position: 'right',
        
                // grid line settings
                grid: {
                  drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
              },
              
            }
          },
        });
      }
    }
  }

  showLineGraph(type : string) : void
  {
    console.log(type);
    const temp : number [] =[];
    for (let k = 0; k < 7; k++) {
      temp.push(Math.random() * (100 - 0 + 1) + 0);
    }

    if (type === "Pothole")
    this.chart.config.data.datasets.push( {
      label: 'Potholes',
      data: temp,
      borderColor: 'rgba(235, 12, 148, 0.4)',
      backgroundColor: 'rgba(235, 12, 148, 0.4)',
      yAxisID: 'y',
    })
    else if (type === "Water")
    this.chart.config.data.datasets.push( {
      label: 'Water',
      data: temp,
      borderColor: 'rgba(235, 82, 23, 0.4)',
      backgroundColor: 'rgba(235, 82, 23, 0.4)',
      yAxisID: 'y',
    })
    else if (type === "Electricity")
    this.chart.config.data.datasets.push( {
      label: 'Electricity',
      data: temp,
      borderColor: 'rgba(1, 235, 194, 0.4)',
      backgroundColor: 'rgba(0, 255, 0, 0.4)',
      yAxisID: 'y',
    })
    else if (type === "Other")
    this.chart.config.data.datasets.push( {
      label: 'Other',
      data: temp,
      borderColor: 'rgba(40,235,23, 0.4)',
      backgroundColor: 'rgba(40,235,23, 0.4)',
      yAxisID: 'y',
    })
    this.chart.update();
  }
}
