import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'grid-watch-home-page-body',
  templateUrl: './home-page-body.component.html',
  styleUrls: ['./home-page-body.component.scss'],
})
export class HomePageBodyComponent implements OnInit{

  application_type! : string | undefined;

  mapHeight! : number;
  zoom! : number;
  center! : google.maps.LatLngLiteral | google.maps.LatLng;
  options!: google.maps.MapOptions;
  markers!: {
    position : {
        lat : number,
        lng : number
    };
    label : Record<string, unknown>;
    title: string;
    options: Record<string, unknown>;
} [];
  
  infoWindow!: google.maps.InfoWindow;
  
  ngOnInit() : void {

    this.mapHeight = (window.innerHeight - 40 * 3);
    this.markers = [];
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
    this.initMap();
    this.addMarker();
  }

  // Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

initMap() : void
{
  console.log("Initiate map");
  
}
addMarker() : void {
  const temp =  {
    lat: -25.7479,
    lng: 28.2293,
  };
  const titles= ["Pothole","Broken Light", "Broken Robot", "Sinkhole", "Electricity Outage", "Water Outage"];
  for (let k = 0; k < 20; k++)
  {
    this.markers.push({
      position: {
        lat: temp.lat + (((Math.random() - 0.5) * 6) / 10),
        lng: temp.lng + ((Math.random() - 0.5) * 6) / 10,
      },
      label: {
        color: 'red'
      },
      title: titles[k % titles.length],
      // options: { animation: google.maps.Animation.BOUNCE },
      options: {},
    });
  }
}

}