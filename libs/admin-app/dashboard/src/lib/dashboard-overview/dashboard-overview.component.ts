import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { } from 'chart.js/auto';


@Component({
    selector: 'grid-watch-dashboard-overview',
    templateUrl: './dashboard-overview.component.html',
    styleUrls: ['./dashboard-overview.component.scss'],
})
export class DashboardOverviewComponent implements AfterViewInit
{
    chart!: Chart;

    chartTitles = ["Pothole", "Sinkhole", "Water Outage", "Electricity Outage", "Other"];

    

    ngAfterViewInit(): void
    {
        this.initiateGraphs();
    }

    initiateGraphs(): void
    {
        const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dataExample = {
            labels: labels,
            datasets: [
                {
                    label: "",
                    fillColor: "rgba(220,220,220,0.0)",
                    strokeColor: "rgba(220,220,220,0)",
                    pointColor: "rgba(220,220,220,0)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: []
                }
            ]
        };

        const canvas = <HTMLCanvasElement>document.getElementById('myChart0');
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
                            text: 'Number of tickets for issue per month'
                        },
                        legend: {
                            display: false
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
                            grid: {
                                drawOnChartArea: false,
                            },
                        },
                    },

                },
            });

        }
    }

    showLineGraph(type: string, e: any): void
    {
        console.log("ASDKOPWEIPONEWOIPTN");
        const temp: number[] = [];
        for (let k = 0; k < 12; k++)
        {
            temp.push(Math.random() * (100 - 0 + 1) + 0);
        }

        if (!e.checked)
        {
            let typeIndex: number;
            switch (type)
            {
                case "Pothole":
                    typeIndex = this.getTypeIndex("Pothole");
                    break;
                case "Water":
                    typeIndex = this.getTypeIndex("Water");
                    break;
                case "Electricity":
                    typeIndex = this.getTypeIndex("Electricity");
                    break;
                case "Other":
                    typeIndex = this.getTypeIndex("Other");
                    break;
                default:
                    typeIndex = -1;
            }
            this.chart.config.data.datasets.splice(typeIndex, 1);
            this.chart.update();
        }
        else
        {
            if (type === "Pothole")
                this.chart.config.data.datasets.push({
                    label: 'Pothole',
                    data: temp,
                    borderColor: 'rgba(235, 12, 148, 0.4)',
                    backgroundColor: 'rgba(235, 12, 148, 0.4)',
                    yAxisID: 'y',
                })
            else if (type === "Water")
                this.chart.config.data.datasets.push({
                    label: 'Water',
                    data: temp,
                    borderColor: 'rgba(235, 82, 23, 0.4)',
                    backgroundColor: 'rgba(235, 82, 23, 0.4)',
                    yAxisID: 'y',
                })
            else if (type === "Electricity")
                this.chart.config.data.datasets.push({
                    label: 'Electricity',
                    data: temp,
                    borderColor: 'rgba(1, 235, 194, 0.4)',
                    backgroundColor: 'rgba(0, 255, 0, 0.4)',
                    yAxisID: 'y',
                })
            else if (type === "Other")
                this.chart.config.data.datasets.push({
                    label: 'Other',
                    data: temp,
                    borderColor: 'rgba(40,235,23, 0.4)',
                    backgroundColor: 'rgba(40,235,23, 0.4)',
                    yAxisID: 'y',
                })
            this.chart.update();
        }
    }

    getTypeIndex(type: string): number
    {
        let index = -1;
        for (let i = 0; i < this.chart.config.data.datasets.length; i++) 
        {
            if (this.chart.config.data.datasets[i].label === type)
            {
                index = i;
            }
        }
        return index;
    }

}
