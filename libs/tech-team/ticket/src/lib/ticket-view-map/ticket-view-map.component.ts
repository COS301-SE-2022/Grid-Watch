import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, SessionManagerService, TechTeamProfileService, TicketService } from '@grid-watch/shared-ui';
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { Router } from '@angular/router';

@Component({
  selector: 'grid-watch-ticket-view-map',
  templateUrl: './ticket-view-map.component.html',
  styleUrls: ['./ticket-view-map.component.scss'],
})
export class TicketViewMapComponent implements OnInit {
  locations! : google.maps.LatLngLiteral [];

  map!: google.maps.Map;
  zoom!: number;
  center!: google.maps.LatLngLiteral;

  tickets: TicketDto[] = [];
  // markers!: google.maps.Marker[];
  infoWindow!: google.maps.InfoWindow;
  specialisation: string[] = [];
  ticketsPerm: TicketDto[] = [];
  constructor(
    private googleMapsService: GoogleMapsService,
    private ticketService: TicketService,
    private router : Router,
    private userService: TechTeamProfileService,
    private sessionService: SessionManagerService
  ) {}

  ngOnInit(): void {
    this.locations = [];
    // this.markers = [];
    const loader = new Loader({
      apiKey: 'AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE',
      version: 'weekly',
      libraries: ['places', 'visualization'],
    });

    loader.load().then(
      () => {
        this.ticketService.getTickets().subscribe(
          (res) =>{
            this.ticketsPerm = res;
            this.ticketsPerm = this.ticketsPerm.filter((ticket) =>{
              return (ticket.ticketStatus === "Dispatched")
            })
            console.log(this.ticketsPerm);
            
            this.initTicket();
          }
        )
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initTicket(){
    this.userService
    .getTechTeamID(this.sessionService.getID() || '')
    .subscribe((response) => {
      this.specialisation = response[0].specialisation;
      console.log(this.specialisation);
      this.specialisation.forEach((specialty) => {
        //  console.log(specialty);
         this.tickets.push(...this.ticketsPerm.filter((ticket) => {
           return ticket.ticketType.includes(specialty)
         }))
        
      });
      this.initMap();
    });
  }

  async initMap(): Promise<void> {
      this.tickets.forEach((value) =>{
        this.locations.push({lat : value.ticketLat, lng : value.ticketLong})
      })
      console.log(this.tickets);
      const myLocation = await this.googleMapsService.getCurrentLocation();
      const map = new google.maps.Map(
        document.getElementById('mapContainer') as HTMLElement,
        {
          zoom: 7,
          center: { lat: myLocation.latitude, lng: myLocation.longitude},
        }
      );

      const infoWindow = new google.maps.InfoWindow({
        content: '',
        disableAutoPan: true,
      });


      const markers = this.locations.map((position, i) => {
        // const icon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png";
        const label = "";
        let temp:string;

        switch (this.tickets[i]["ticketType"])
				{
					case "Electricity Outage":
						temp = "assets/issue-brokenpower-pin.png";
						break;
					case "Water Outage":
						temp = "assets/issue-water-pin.png";
						break;
					case "Pothole":
						temp = "assets/issue-pothole-pin.png";
						break;
					case "Sinkhole":
						temp = "assets/issue-sinkhole-pin.png";
						break;
					case "Broken Traffic Light":
						temp = "assets/issue-brokenrobot-pin.png";
						break;
					case "Broken Street Light":
						temp = "assets/issue-brokenlight-pin.png";
						break;
					default:
						temp = "assets/issue-maintenance-pin.png";
						break;
				}


        const marker = new google.maps.Marker({
          position,
          label,
          icon: { 
						url: temp, 
						size: new google.maps.Size(43, 56),
						scaledSize: new google.maps.Size(43, 56),
						origin: new google.maps.Point(0,0)
					}
        });

        marker.addListener('click', () => {
          // const html = 
          // `<div> 
          //   ${this.tickets[i].ticketType}
          //   <button (click)="test()">View</button>
          // </div>`;
          const html = document.createElement("div");
          html.innerHTML = this.tickets[i].ticketType;
          html.onclick = () =>{
            this.router.navigate(['/viewTicket', {id:this.tickets[i].ticketId}]) ;
          };
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
        });

        // infoWindow.addListener('click', () => {
        //   this.router.navigate(['/viewTicket', {id:this.tickets[i].ticketId}]) ;
        // });

        return marker;
      });

      new MarkerClusterer({ markers, map });
  }
}
