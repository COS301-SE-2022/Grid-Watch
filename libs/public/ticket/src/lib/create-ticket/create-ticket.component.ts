import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { TicketController } from 'libs/api/ticket/api/src/lib/controllers/api-ticket-api-controller.controller';
import { Router } from '@angular/router';
import { Express } from 'express';
import { Multer } from 'multer';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';


@Component({
  selector: 'grid-watch-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent{
  @Input() ticket : TicketDto = new TicketDto();

  file! : File;

  autocomplete!: google.maps.places.Autocomplete;
  marker_position!: google.maps.LatLng | google.maps.LatLngLiteral

  getAddressUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
  zoom! : number;
  center! : google.maps.LatLngLiteral | google.maps.LatLng;
  options!: google.maps.MapOptions;

  default_upload! : string;
  createTicketURL = "http://localhost:3333/api/ticket/create";
  uploadURL = "http://localhost:3333/api/ticket/upload";
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  other!: boolean;
  other_details!: string;
  

  constructor(private http : HttpClient, private router: Router) {

  }

  ngOnInit(): void {    
    this.zoom = 5.5;
    this.center =  {
      lat: -30.5595,
      lng: 22.9375,
    };
    this.options = {
      zoomControl: true,
      scrollwheel: false,
    }
    this.default_upload = "assets/upload-solid.svg";
    this.other = false;
    this.other_details = "";
    this.initMap();

  }

  fileUploaded(e: any) : void
  {

    this.file = e.target.files[0];


    const reader = new FileReader();
    reader.onload = () => {
      this.default_upload = reader.result as string;
    }
    reader.readAsDataURL(this.file)
    
    
  }

  showErrorMessage(e :string) : void{
    alert(e);
    
  }

  createTicket() : void
  {
    if ( this.ticket.ticket_location == "")
    {
      this.showErrorMessage("Location not found")
      return;
    }
    if (this.autocomplete.getPlace() !== undefined)
    {
      const place = this.autocomplete.getPlace().address_components;
      // console.log(place);
      // const temp = document.getElementById("pac-input") as HTMLInputElement;
      this.ticket.ticket_location = "";
      
      if (place)
      {
        for (let k = 0; k < 3; k++)
        {
          
          this.ticket.ticket_location += place[k].long_name + " ";
        }
      }
      
      if (place)
      this.ticket.ticket_city = place[3].long_name
    }
    
    this.ticket.ticket_status = "Created";
    this.ticket.ticket_create_date = new Date();
    this.ticket.ticket_upvotes = 0;
    // console.log(this.ticket);
    if (this.file)
    {
      const formData = new FormData();
      formData.append("photo", this.file, this.file.name);
  
      this.http.post<Express.Multer.File>(this.uploadURL, formData)
      .subscribe({
        next: data => {
            // console.log(data.filename);
            // this.router.navigateByUrl("/tickets");
            this.ticket.ticket_img = data.filename
            this.uploadTicket();
          },
          error: error => {
            console.error('There was an error!', error);
          }
      })  
    }
    else
    {
      this.uploadTicket();
    }
     
  }

  initMap() : void
  {
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const options = {
      componentRestrictions: { country: ["za"] },
      fields: ["address_components", "geometry"],
      types: ["address"],
    };
    this.autocomplete = new google.maps.places.Autocomplete(input, options);
    google.maps.event.addListener(this.autocomplete, "place_changed" , () =>{
      const place = this.autocomplete.getPlace()
      this.createMapMarker(place)
    })
  }

  getCurrentLocation() : void
  {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(
        (position : GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.marker_position = pos;
          this.center = pos;
          this.zoom = 12;
          const geocoder: google.maps.Geocoder = new google.maps.Geocoder;
          geocoder.geocode({location: pos}).then((response) =>
          {
            if (response.results[0]) 
            {
              this.ticket.ticket_location = "";
              for (let k = 0 ; k < 3; k++)
                this.ticket.ticket_location += response.results[0].address_components[k].long_name + " ";
              this.ticket.ticket_city = response.results[0].address_components[3].long_name;
                console.log(this.ticket.ticket_location);
              console.log(this.ticket.ticket_city);
            }

          });
        }
      )
    }
  }

  uploadTicket() {

    console.log(this.ticket);
    
      this.http.post<TicketDto>(this.createTicketURL, this.ticket, this.httpOptions)
    .subscribe({
      next: data => {
          console.log(data);
          this.router.navigateByUrl("/tickets");
      },
      error: error => {
          console.error('There was an error!', error);
      }
  })
  }

  createMapMarker(place: google.maps.places.PlaceResult) : void
  {
    // this.marker_position =
    if (place.geometry?.location !== undefined)
    {
      this.marker_position = place.geometry?.location;
      this.zoom = 12;
      this.center = place.geometry?.location;
    }
    console.log(place.geometry?.location);
    document.getElementById("pac-input")?.focus();
  }
}

