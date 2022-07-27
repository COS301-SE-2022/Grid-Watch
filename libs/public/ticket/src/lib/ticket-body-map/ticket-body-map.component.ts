import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';
import { MarkerClusterer } from "@googlemaps/markerclusterer";


@Component({
  selector: 'grid-watch-ticket-body-map',
  templateUrl: './ticket-body-map.component.html',
  styleUrls: ['./ticket-body-map.component.scss'],
})
export class TicketBodyMapComponent implements OnInit {

  map!: google.maps.Map;
  zoom! : number;
  center! : google.maps.LatLngLiteral


  tickets! : TicketDto[];
  markers!: google.maps.Marker []
  infoWindow!: google.maps.InfoWindow;
  constructor(
    private googleMapsService : GoogleMapsService, 
    private ticketService : TicketService
  ) {}

  ngOnInit(): void {
    this.markers = [];
    const loader = new Loader({
      apiKey: "AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE",
      version: "weekly",
      libraries: ["places"]
    });
    
    loader.load().then(() => {

      this.initMap();
      
      }, (error) =>{console.log(error);
      });
  }

  async initMap(){
    this.zoom = 9;
    const temp = await this.googleMapsService.getCurrentLocation();
    console.log(temp);
    
    this.center =  {
      lat: temp.latitude,
      lng: temp.longitude,
    };
    this.map = this.googleMapsService.createMapObject("mapContainer",this.center,this.zoom)
    
    this.ticketService.getTickets().subscribe(
      (response) =>
      {
        this.tickets = response;
        console.log(response);
        this.initialiseMarkers()
      }
    )

    this.infoWindow = new google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    // marker.addListener("click", () => {
    //   infoWindow.setContent(label);
    //   infoWindow.open(map, marker);
    // });
  }

  initialiseMarkers(){
    for (let k = 0; k < this.tickets.length; k++) {
      const pos = {
        lat: this.tickets[k].ticketLat,
        lng: this.tickets[k].ticketLong
      }
      this.markers.push(this.googleMapsService.createMarkerObject(pos, this.map, this.tickets[k].ticketType));
      this.markers[k].addListener("click", () => {
          this.infoWindow.setContent(this.tickets[k].ticketType);
          this.infoWindow.open(this.map, this.markers[k]);
        });
    }
    
    new MarkerClusterer(this.map, this.markers);
  }
}
