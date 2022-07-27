import { Component, OnInit } from '@angular/core';
import { GoogleMap, MapPolygon } from '@angular/google-maps';
import { Loader } from '@googlemaps/js-api-loader';

import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService ,TicketService} from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-home-page-body',
  templateUrl: './home-page-body.component.html',
  styleUrls: ['./home-page-body.component.scss'],
})
export class HomePageBodyComponent implements OnInit{

  application_type! : string | undefined;

  mapHeight! : number;
  zoom! : number;
  center! : google.maps.LatLngLiteral;
  options!: google.maps.MapOptions;
  infoWindow!: google.maps.InfoWindow;
  map!: google.maps.Map;

  constructor(private googleMapsService : GoogleMapsService,
    private ticketService : TicketService)
  {

  }
  
  ngOnInit() : void {

    this.mapHeight = (window.innerHeight - 40 * 3);
    this.zoom = 10;
    this.center =  {
      lat: -25.7479,
      lng: 28.2293,
    };
    this.options = {
      zoomControl: true,
      scrollwheel: false,
    }

    const temp = document.getElementById("application_type");
    this.application_type = temp?.innerHTML;
    
    const loader = new Loader({
      apiKey: "AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE",
      version: "weekly",
      libraries: ["places"]
    });
    
    loader.load().then(() => {

      // this.initMap();
      // this.addMarker();
      
      }, (error) =>{console.log(error);
      });
}

  // Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

initMap() : void
{
  // const map = document.createElement("google-map");
  // map.setAttribute("width", "100%");
  // map.setAttribute("height", this.mapHeight.toString());
  // map.setAttribute("zoom", "10");
  // const mapContainer = document.getElementById("mapContainer");
  // mapContainer?.appendChild(map);
  //  this.map = this.googleMapsService.createMapObject("map",this.center,this.zoom)
    // console.log("working");

}


async addMarker() : Promise<void> {
  // const temp =  {
  //   lat: -25.7479,
  //   lng: 28.2293,
  // };
  // const titles= ["Pothole","Broken Light", "Broken Robot", "Sinkhole", "Electricity Outage", "Water Outage"];
  // for (let k = 0; k < 20; k++)
  // {
  //   const position = {
  //     lat: temp.lat + (((Math.random() - 0.5) * 6) / 10),
  //     lng: temp.lng + ((Math.random() - 0.5) * 6) / 10,
  //   }

  //   const tempLabel = titles[Math.floor(Math.random() * (titles.length-1 - 0 + 1) + 0)];
  //   console.log(tempLabel);
  //   this.googleMapsService.createMarkerObject(position, this.map, tempLabel);
  
  // }

   this.ticketService.getTickets().subscribe((response)=>{
    for(let i=0;i<response.length;i++){
      const position = {
        lat: -25.7479+0.1*i,//response.at(i)?.ticketLat
        lng: 28.2293+0.1*i,//response.at(i)?.ticketLng
      }
      const type = response.at(i)?.ticketType;
       if(type != null){
         this.googleMapsService.createMarkerObject(position,this.map,type);
       }
  
    }
   });

}

}