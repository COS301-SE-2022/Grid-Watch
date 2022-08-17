import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TicketService } from '@grid-watch/shared-ui';
import { } from 'chart.js/auto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { response } from 'express';


@Component({
    selector: 'grid-watch-dashboard-overview',
    templateUrl: './dashboard-overview.component.html',
    styleUrls: ['./dashboard-overview.component.scss'],
})
export class DashboardOverviewComponent implements AfterViewInit
{
    constructor(
        private ticketService: TicketService,
    ){}

    tickets : Array<TicketDto> = [];
    ticketTypes : Array<string> = [];
    ticketTypesCount : Array<number> = [];
    filterChecked: string[] = [];
    sortoptions: string[] = [
      'Original',
      'Date',
      'Issue',
      'Location',
      'City',
      'Status',
      'Upvotes',
    ];
    chart!: Chart;
    pieChart!: Chart;

    chartTitles = ["Pothole", "Sinkhole", "Water Outage", "Electricity Outage", "Other"];

    ngAfterViewInit(): void
    {
        this.initiateGraphs();
    }

    async getDatabaseData() 
    {
        //calculate # of different ticket types
        let tcount = 0;

        const ticketTypes:string[] = [];

        if (tcount == 0){

           this.ticketService.getTickets().subscribe(
                async (response) => {

                    for (let i = 0; i < response.length; i++) {
                        if (ticketTypes.length != 0) {
                            let bexist = false;
                            for (let j = 0; j < ticketTypes.length; j++) {
                                if (response[i].ticketType == ticketTypes[j]) {
                                    bexist = true;
                                }
                            }
                            if (!bexist) {
                                ticketTypes.push(response[i].ticketType);
                                tcount++;
                            }
                        } else {
                            ticketTypes.push(response[i].ticketType);
                            tcount++;
                        }
                    }
        const ticketCount: number[] = [];

                    for (let k = 0; k < ticketTypes.length; k++) {
                        ticketCount[k] = 0;
                    }

                    for (let i = 0; i < response.length; i++) {
                        
                        for (let j = 0; j < ticketTypes.length; j++) {
                            
                            if (response[i].ticketType == ticketTypes[j]) {
                               ticketCount[j] += 1;
                            }
                            
                        }
                        
                    }

                    const backgroundColor: string[] = [];

                    for (let a = 0; a < ticketTypes.length; a++) {
                        backgroundColor[a] = "rgb(" +(Math.random() * (255 - 0 + 1) + 0).toString() + ","+(Math.random() * (255 - 0 + 1) + 0).toString()+","+(Math.random() * (255 - 0 + 1) + 0).toString() + ")"; 
                    }

                    const typesdata = 
                    {
                        labels: ticketTypes,
                        datasets:[{
                            labels: "Types of issues",
                            data: ticketCount,
                            backgroundColor: backgroundColor,
                            hoverOffset: 10
                        }]
                    };

                     ///// Draw the piechart /////
         const canvas1 = <HTMLCanvasElement>document.getElementById('pieChart');
         const ctx1 = canvas1.getContext('2d');
         
                    if (ctx1 !== null) {
                        this.pieChart = new Chart(ctx1,{
                            type: 'pie',
                            data: typesdata,
                        })
                    }
                }, 

            )
            
        }

    }

    initiateGraphs(): void
    {

        this.getDatabaseData();

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
