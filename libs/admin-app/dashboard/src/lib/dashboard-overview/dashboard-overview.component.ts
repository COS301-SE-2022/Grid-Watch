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
    Pothole: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    Electricity: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    Water: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    Other: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

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
        this.setCount();
    }

    async getDatabaseData() 
    {
        let tcount = 0;

        const ticketTypes:string[] = [];

        if (tcount == 0){

           this.ticketService.getTickets().subscribe(
                async (response) => {
        //calculate # of different ticket types
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

                    //draw piechart

                    const backgroundColor: string[] = [
                    'rgb(255,10,102)',
                    'rgb(255,153,20)',
                    'rgb(153,255,51)',
                    'rgb(0,153,51)',
                    'rgb(51,51,255)',
                    'rgb(255,20,20)',
                    'rgb(3,55,0)',
                    'rgb(88,22,99)',
                    'rgb(27,244,22)',
                    'rgb(60,10,30)',
                ]

                    for (let a = 0; a < ticketTypes.length; a++) {

                        if (a+1 < ticketTypes.length){
                            if (ticketTypes[a] == "Water"){
                                backgroundColor[a+1] = backgroundColor[a];
                                backgroundColor[a] = 'rgb(3,100,180)';
                            }
                            if (ticketTypes[a] == "Electricity"){
                                backgroundColor[a+1] = backgroundColor[a];
                                backgroundColor[a] = 'rgb(255,255,0)';
                            }
                            if (ticketTypes[a] == "Sinkhole"){
                                backgroundColor[a+1] = backgroundColor[a];
                                backgroundColor[a] = 'rgb(77,0,50)';
                            }
                            if (ticketTypes[a] == "Pothole"){
                                backgroundColor[a+1] = backgroundColor[a];
                                backgroundColor[a] = 'rgb(127,127,127)';
                            }
                        }
                        else{
                            if (ticketTypes[a] == "Water"){
                                backgroundColor[a] = 'rgb(3,100,180)';
                            }
                            if (ticketTypes[a] == "Electricity"){
                                backgroundColor[a] = 'rgb(255,255,0)';
                            }
                            if (ticketTypes[a] == "Sinkhole"){
                                backgroundColor[a] = 'rgb(77,0,50)';
                            }
                            if (ticketTypes[a] == "Pothole"){
                                backgroundColor[a] = 'rgb(127,127,127)';
                            } 
                        }
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
                            display: false,
                        }
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            suggestedMin : 0,
                            suggestedMax : 10,
                        },
                    },

                },
            });

        }
    }

    setCount(){
        this.ticketService.getTickets().subscribe((ticket)=>{

            for(let i=0; i < ticket.length; i++){
                const tick = ticket.at(i);
                if (tick != undefined) {
    
                const date =  new Date( tick.ticketCreateDate);
                                
                const month = date.getMonth();
                const type = tick.ticketType;   

                if (month !=undefined){
                    console.log(month);
                    if(type == "Pothole"){
                    {
                        this.Pothole[month]++;
                    }
                    }else if(type == "Water Outage")
                    {
                        this.Water[month]++;
                    }
                    else if (type == "Electricity" || type == "Broken Street Light")
                    {
                        this.Electricity[month]++;
                    }
                    else if(type == "Sinkholes" || type == "Other")
                    {
                        this.Other[month]++;
                    }  
                }
            }
        }
        })
    }

    showLineGraph(type: string, e: any): void
    {

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
                    data: this.Pothole,
                    borderColor: 'rgba(235, 12, 148, 0.6)',
                    backgroundColor: 'rgba(235, 12, 148, 0.6)',
                    yAxisID: 'y',
                })
            else if (type === "Water")
                this.chart.config.data.datasets.push({
                    label: 'Water',
                    data: this.Water,
                    borderColor: 'rgba(3, 100, 180, 0.6)',
                    backgroundColor: 'rgba(3, 100, 180, 0.6)',
                    yAxisID: 'y',
                })
            else if (type === "Electricity")
                this.chart.config.data.datasets.push({
                    label: 'Electricity',
                    data: this.Electricity,
                    borderColor: 'rgba(1, 235, 194, 0.6)',
                    backgroundColor: 'rgba(0, 255, 0, 0.6)',
                    yAxisID: 'y',
                })
            else if (type === "Other")
                this.chart.config.data.datasets.push({
                    label: 'Other',
                    data: this.Other,
                    borderColor: 'rgba(40,235,23, 0.6)',
                    backgroundColor: 'rgba(40,235,23, 0.6)',
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
