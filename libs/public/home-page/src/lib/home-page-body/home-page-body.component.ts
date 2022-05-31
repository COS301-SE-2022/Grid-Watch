import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-home-page-body',
  templateUrl: './home-page-body.component.html',
  styleUrls: ['./home-page-body.component.scss'],
})
export class HomePageBodyComponent implements OnInit{

  application_type! : string | undefined;
  
  map!: google.maps.Map
  infoWindow!: google.maps.InfoWindow;
  
  ngOnInit() : void {
    const temp = document.getElementById("application_type");
    this.application_type = temp?.innerHTML;
    this.initMap();
  }

  // Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

initMap(): void {
  this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: -25.7487, lng: 28.2380 },
    zoom: 10,
  });
  this.infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");

  this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(locationButton);

  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // this.infoWindow.setPosition(pos);
            // this.infoWindow.setContent("Location found.");
            // this.infoWindow.open(this.map);
            // this.map.setCenter(pos);

            new google.maps.Marker({
              position : pos,
              map: this.map,
              title: "test"
            });
          },
          () => {
            // this.handleLocationError(true, this.infoWindow, this.map.getCenter()!);
          }
        );
      } else {
        // Browser doesn't support Geolocation
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.handleLocationError(false, this.infoWindow, this.map.getCenter()!);
      }
    });

    
  }

  handleLocationError(
  browserHasGeolocation: boolean,
  infoWindow: google.maps.InfoWindow,
  pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }

}
