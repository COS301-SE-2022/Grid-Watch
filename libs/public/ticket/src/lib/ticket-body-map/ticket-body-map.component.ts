import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { Router } from '@angular/router';
import { sharedAssets } from '@grid-watch/shared-assets';

@Component({
  selector: 'grid-watch-ticket-body-map',
  templateUrl: './ticket-body-map.component.html',
  styleUrls: ['./ticket-body-map.component.scss'],
})
export class TicketBodyMapComponent implements OnInit
{
  icons: Record<string, { icon: string }> =
    {
      issueLight: {
        icon: "issue-brokenlight-pin.png"
      },
      issuePower: {
        icon: "issue-brokenpower-pin.png"
      },
      issueRobot: {
        icon: "issue-brokenrobot-pin.png"
      },
      issueMaintenance: {
        icon: "issue-maintenance-pin.png"
      },
      issuePothole: {
        icon: "issue-pothole-pin.png"
      },
      issueSinkhole: {
        icon: "issue-sinkhole-pin.png"
      },
      issueWater: {
        icon: "issue-water-pin.png"
      }
    }

  locations!: google.maps.LatLngLiteral[];

  map!: google.maps.Map;
  zoom!: number;
  center!: google.maps.LatLngLiteral;

  tickets!: TicketDto[];
  // markers!: google.maps.Marker[];
  infoWindow!: google.maps.InfoWindow;
  constructor(
    private googleMapsService: GoogleMapsService,
    private ticketService: TicketService,
    private router: Router
  ) { }

  ngOnInit(): void
  {
    this.locations = [];
    // this.markers = [];
    const loader = new Loader({
      apiKey: 'AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE',
      version: 'weekly',
      libraries: ['places', 'visualization'],
    });

    loader.load().then(
      () =>
      {
        this.initMap();
      },
      (error) =>
      {
        console.log(error);
      }
    );
  }

  initMap(): void
  {
    this.ticketService.getTickets().subscribe(async (response) =>
    {
      this.tickets = response;
      this.tickets.forEach((value) =>
      {
        this.locations.push({ lat: value.ticketLat, lng: value.ticketLong })
      })
      console.log(this.tickets);
      const myLocation = await this.googleMapsService.getCurrentLocation();
      const map = new google.maps.Map(
        document.getElementById('mapContainer') as HTMLElement,
        {
          zoom: 7,
          center: { lat: myLocation.latitude, lng: myLocation.longitude },
        }
      );

      const infoWindow = new google.maps.InfoWindow({
        content: '',
        disableAutoPan: true,
      });


      const markers = this.locations.map((position, i) =>
      {
        // const icon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png";
        const label = "";
        let temp:string;

        switch (this.tickets[i]["ticketType"])
				{
					case "Electricity Outage":
						temp = "assets/issue-brokenpower-pin1.png";
						break;
					case "Water Outage":
						temp = "assets/issue-water-pin1.png";
						break;
					case "Pothole":
						temp = "assets/issue-pothole-pin1.png";
						break;
					case "Sinkhole":
						temp = "assets/issue-sinkhole-pin1.png";
						break;
					case "Broken Traffic Light":
						temp = "assets/issue-brokenrobot-pin1.png";
						break;
					case "Broken Street Light":
						temp = "assets/issue-brokenlight-pin1.png";
						break;
					default:
						temp = "assets/issue-maintenance-pin1.png";
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

        marker.addListener('click', () =>
        {
          // const html = 
          // `<div> 
          //   ${this.tickets[i].ticketType}
          //   <button (click)="test()">View</button>
          // </div>`;
          const html = document.createElement("div");
          html.innerHTML = this.tickets[i].ticketType;
          html.onclick = () =>
          {
            this.router.navigate(['/viewTicket', { id: this.tickets[i].ticketId }]);
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
    });
  }

}