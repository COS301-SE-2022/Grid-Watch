import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { MarkerClusterer } from '@googlemaps/markerclusterer';

@Component({
  selector: 'grid-watch-ticket-body-map',
  templateUrl: './ticket-body-map.component.html',
  styleUrls: ['./ticket-body-map.component.scss'],
})
export class TicketBodyMapComponent implements OnInit {
  locations! : google.maps.LatLngLiteral [];

  map!: google.maps.Map;
  zoom!: number;
  center!: google.maps.LatLngLiteral;

  tickets!: TicketDto[];
  markers!: google.maps.Marker[];
  infoWindow!: google.maps.InfoWindow;
  constructor(
    private googleMapsService: GoogleMapsService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.locations = [];
    this.markers = [];
    const loader = new Loader({
      apiKey: 'AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE',
      version: 'weekly',
      libraries: ['places'],
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

  initMap(): void {
    this.ticketService.getTickets().subscribe(async (response) => {
      this.tickets = response;
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

      // Create an array of alphabetical characters used to label the markers.
      const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

      // Add some markers to the map.
      const markers = this.locations.map((position, i) => {
        // const label = this.tickets[i].ticketType.charAt(0);
        const icon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png";
        const label = "";
        const marker = new google.maps.Marker({
          position,
          label,
          icon
        });

        // markers can only be keyboard focusable when they have click listeners
        // open info window when marker is clicked
        marker.addListener('click', () => {
          infoWindow.setContent(this.tickets[i].ticketType);
          infoWindow.open(map, marker);
        });

        return marker;
      });

      // Add a marker clusterer to manage the markers.
      new MarkerClusterer({ markers, map });
    });
  }
}
