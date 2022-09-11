import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TicketService } from '@grid-watch/shared-ui';
import { } from 'chart.js/auto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { response } from 'express';
import { Loader } from '@googlemaps/js-api-loader';
import { GoogleMapsService } from '@grid-watch/shared-ui';


@Component({
    selector: 'grid-watch-dashboard-overview',
    templateUrl: './dashboard-overview.component.html',
    styleUrls: ['./dashboard-overview.component.scss'],
})
export class DashboardOverviewComponent implements AfterViewInit
{
    constructor(
        private ticketService: TicketService,
        private googleMapsService: GoogleMapsService,
    ){}
    Pothole: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    TrafficLights: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    StreetLights: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    Electricity: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    Water: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
    Other: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

    map!: google.maps.Map;
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

    backgroundColor: string[] = [
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
    chartTitles = ["Pothole", "Sinkhole", "Water Outage", "Electricity Outage", "Other"];

    ngAfterViewInit(): void
    {
        this.initiateGraphs();
        this.setCount();
        const loader = new Loader({
            apiKey: 'AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE',
            version: 'weekly',
            libraries: ['places','visualization'],
          });
      
          loader.load().then(
            () => {
              this.initMap();
            },
            (error) => {
              console.log(error);
            }
          );
    }

    initMap(): void
    {
        const locations: google.maps.LatLng[] = [];
        this.ticketService.getTickets().subscribe(async (tickets) => {
            this.tickets = tickets;
            this.tickets.forEach((value) =>{
              locations.push(new google.maps.LatLng(value.ticketLat, value.ticketLong));
            })

            
        
            const map = new google.maps.Map(
              document.getElementById('heatmap') as HTMLElement,
              {
                zoom: 13,
                center: { lat: -25.748733, lng: 28.238043},
                mapTypeId: 'satellite',
              }
            );

            this.tickets.forEach((value) => {
                const infoWindow = new google.maps.InfoWindow({
                    content: value.ticketType,
                    
                })
                google.maps.event.addListener(map,'mouseover', function(event: { value: { ticketLat: any; ticketLong: any; }; }) {
                infoWindow.setPosition({lat: event.value.ticketLat,lng:event.value.ticketLong})
                infoWindow.open(map);});
            });
      

            const heatmap = new google.maps.visualization.HeatmapLayer({data: locations});
            heatmap.setMap(map);
            heatmap.set("radius", heatmap.get("radius") ? null : 30);
        });

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

                    for (let a = 0; a < ticketTypes.length; a++) {

                        if (a+1 < ticketTypes.length){
                            if (ticketTypes[a] == "Water outage"){
                                this.backgroundColor[a+1] = this.backgroundColor[a];
                                this.backgroundColor[a] = 'rgb(3,100,180)';
                            }
                            if (ticketTypes[a] == "Electricity outage"){
                                this.backgroundColor[a+1] = this.backgroundColor[a];
                                this.backgroundColor[a] = 'rgb(255,255,0)';
                            }
                            if (ticketTypes[a] == "Sinkhole"){
                                this.backgroundColor[a+1] = this.backgroundColor[a];
                                this.backgroundColor[a] = 'rgb(77,0,50)';
                            }
                            if (ticketTypes[a] == "Pothole"){
                                this.backgroundColor[a+1] = this.backgroundColor[a];
                                this.backgroundColor[a] = 'rgb(127,127,127)';
                            }
                        }
                        else{
                            if (ticketTypes[a] == "Water outage"){
                                this.backgroundColor[a] = 'rgb(3,100,180)';
                            }
                            if (ticketTypes[a] == "Electricity outage"){
                                this.backgroundColor[a] = 'rgb(255,255,0)';
                            }
                            if (ticketTypes[a] == "Sinkhole"){
                                this.backgroundColor[a] = 'rgb(77,0,50)';
                            }
                            if (ticketTypes[a] == "Pothole"){
                                this.backgroundColor[a] = 'rgb(127,127,127)';
                            } 
                        }
                    }                         

                    const typesdata = 
                    {
                        labels: ticketTypes,
                        datasets:[{
                            labels: "Types of issues",
                            data: ticketCount,
                            backgroundColor: this.backgroundColor,
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
        const c = document.getElementById('pieChart');
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

        const canvas = <HTMLCanvasElement>document.getElementById('lineChart');
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
            console.log(ticket);
            for(let i=0; i < ticket.length; i++){
                const tick = ticket.at(i);

                if (tick != undefined) {
                    const date =  new Date( tick.ticketCreateDate);           
                    const month = date.getMonth();
                    const type = tick.ticketType;   

                    if (month !=undefined){
                        
                        if(type == "Pothole")
                        {
                            this.Pothole[month]++;
                        }
                        else if (type == "Water outage")
                        {
                        // console.log("Water");
                            this.Water[month]++;
                        }
                        else if (type == "Broken Street Light")
                        {
                            this.StreetLights[month]++;
                        }
                        else if (type == "Broken Traffic Light")
                        {
                            this.TrafficLights[month]++;
                        }
                        else if (type == "Electricity outage")
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

    showChart(type: string, e: any): void{
        if (!e.checked)
        {
            const c = document.getElementById('pieChart');
            if(c != undefined){
                c.style.display = 'none';
            }
        }
        else{
            const c = document.getElementById('pieChart');
            // const ch = document.getElementById('chart');
            if(c != undefined ){
               // ch.innerHTML = 'Hide graph';ch != undefined
                c.style.display = '';
            }
        }

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
                case "Water outage":
                    typeIndex = this.getTypeIndex("Water outage");
                    break;
                case "Electricity outage":
                    typeIndex = this.getTypeIndex("Electricity outage");
                    break;
                case "Broken Street Light":
                    typeIndex = this.getTypeIndex("Broken Street Light");
                    break;
                case "Broken Traffic Light":
                    typeIndex = this.getTypeIndex("Broken Traffic Light");
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
            else if (type === "Water outage")
                this.chart.config.data.datasets.push({
                    label: 'Water outage',
                    data: this.Water,
                    borderColor: 'rgba(3, 100, 180, 0.6)',
                    backgroundColor: 'rgba(3, 100, 180, 0.6)',
                    yAxisID: 'y',
                })
            else if (type === "Electricity outage")
                this.chart.config.data.datasets.push({
                    label: 'Electricity outage',
                    data: this.Electricity,
                    borderColor: 'rgba(1, 235, 194, 0.6)',
                    backgroundColor: 'rgba(0, 255, 0, 0.6)',
                    yAxisID: 'y',
                })
            else if (type === "Broken Street Light")
                this.chart.config.data.datasets.push({
                    label: 'Broken Street Light',
                    data: this.StreetLights,
                    borderColor: this.backgroundColor[3],
                    backgroundColor: this.backgroundColor[3],
                    yAxisID: 'y',
            })
            else if (type === "Broken Traffic Light")
                this.chart.config.data.datasets.push({
                    label: 'Broken Traffic Light',
                    data: this.TrafficLights,
                    borderColor: this.backgroundColor[4],
                    backgroundColor: this.backgroundColor[4],
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

    toggleElement(id: string)
    {
        console.log();
        $("#"+id).toggleClass("hidden");
    }
}
