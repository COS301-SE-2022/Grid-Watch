import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { TicketController } from 'libs/api/ticket/api/src/lib/controllers/api-ticket-api-controller.controller';
import { Router } from '@angular/router';
import { Express } from 'express';
import { Multer } from 'multer';
import { GoogleMapsModule } from '@angular/google-maps';
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
  place_id!: string;

  default_upload! : string;
  createPictureURL = "http://localhost:3333/api/ticket/picture/create/";
  createTicketURL = "http://localhost:3333/api/ticket/create";
  uploadURL = "http://localhost:3333/api/ticket/upload";
  getTicketURL = "http://localhost:3333/api/ticket/1";
  

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
    this.default_upload = "";
    this.other = false;
    this.other_details = "";
    this.ticket.ticket_location = "";
    this.place_id = "";

    this.http.get<TicketDto[]>(this.getTicketURL, this.httpOptions).subscribe(
      () =>
      {
        this.initMap();
      }
    )
    // this.initMap();
  }

  async fileUploaded(e: any) : Promise<void>
  {

    this.file = e.target.files[0];
    
    
    const reader = new FileReader();
    reader.onload = () => {
      this.default_upload = reader.result as string;
    }
    await this.delay(2000)    
    reader.readAsDataURL(this.file)
    
    
  }

  showErrorMessage(e :string) : void{
    alert(e);
    
  }

  getAutocompleteCity(place: any) : string
  {
    // console.log(place);
    if (place !== undefined)
    {
      // const place = this.autocomplete.getPlace().address_components;
     
      const count = place.length as number
      // console.log(place);
      
      for (let k = 0; k < count ; k++)
      {
        let count2 = 0;
        if (place)
        {
          count2 = place[k].types.length as number;
        }
        for (let i = 0; i < count2 ; i++)
        {
          if (place)
            if (place[k].types[i] === "locality")
            {
              return place[k].long_name
            }
            
        }
        // if (this.autocomplete.getPlace().address_components[k].types === "")
        // this.ticket.ticket_city = 
      }
     
      for (let k = 0; k < count ; k++)
      {
        let count2 = 0;
        if (place)
        {
          count2 = place[k].types.length as number;
        }
        for (let i = 0; i < count2 ; i++)
        {
          if (place)
            if (place[k].types[i] === "sublocality")
            {
              return place[k].long_name
            }
            
        }
        // if (this.autocomplete.getPlace().address_components[k].types === "")
        // this.ticket.ticket_city = 
        }
      
    }
    return "";
  }

  createTicket() : void
  {
    if (( this.ticket.ticket_location == ""))
    {
      this.showErrorMessage("Location not found")
      return;
    }
    // console.log(this.autocomplete.getPlace());
    // console.log(this.place_id);
    
    
    if ((this.autocomplete.getPlace() === undefined) && (( this.place_id === "")))
    {
      this.showErrorMessage("Location not found")
      return;
    }
    
    if (this.place_id == "")
    {
      this.place_id = this.autocomplete.getPlace().place_id as string;
      this.ticket.ticket_city = this.getAutocompleteCity(this.autocomplete.getPlace().address_components);
    }
    this.ticket.ticket_location = this.place_id;
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
      fields: ["address_components", "geometry", "place_id"],
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
          geocoder.geocode({location: pos},(response) =>
          {
            
            if (response != null) 
            {
              // this.ticket.ticket_location = "";
              // for (let k = 0 ; k < 4; k++)
              //   this.ticket.ticket_location += response[0].address_components[k].long_name + " ";
              this.ticket.ticket_location = response[0].formatted_address;
              this.place_id = response[0].place_id;
              this.ticket.ticket_city = this.getAutocompleteCity(response[0].address_components)  
              
            }

          });
        }
      )
    }
  }

  uploadTicket() {

    // console.log(this.ticket);
    
      this.http.post<TicketDto[]>(this.createTicketURL, this.ticket, this.httpOptions)
    .subscribe({
      next: data => {
        // console.log("HERE");
        
          this.ticket.ticket_id = data[0].ticket_id
          this.createPictureURL += this.ticket.ticket_id;
          if (this.file !== undefined)
            this.uploadPhoto();
          this.showSuccessMessage();
        },
        error: error => {
          console.error('There was an error!', error);
      }

    })
    
  }

  showSuccessMessage() : void
  {
    alert("Created Ticket successfully");
    this.router.navigateByUrl("/tickets");
  }

  uploadPhoto() : void
  {
    const temp = JSON.parse('{ "imgLink" : "' + this.ticket.ticket_img + '"}');
    this.http.post<string>(this.createPictureURL, temp, this.httpOptions).subscribe(
      (data) =>
      {

        // console.log(data);
      },
      (error) =>
      {
        // console.log(error);
        
      }
    );
  }

  createMapMarker(place: google.maps.places.PlaceResult) : void
  {
    if (place.geometry?.location !== undefined)
    {
      this.marker_position = place.geometry?.location;
      this.zoom = 12;
      this.center = place.geometry?.location;
    }
    document.getElementById("pac-input")?.focus();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  initiateFileUpload() : void {
    document.getElementById("issue_uploaded_img")?.click();
  }
}

