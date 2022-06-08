import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Express } from 'express';
import { Multer } from 'multer';
import { GoogleMap } from '@angular/google-maps';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';

@Component({
  selector: 'grid-watch-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
})
export class EditTicketComponent implements OnInit {

  autocomplete!: google.maps.places.Autocomplete;
  marker_position!: google.maps.LatLng | google.maps.LatLngLiteral

  zoom! : number;
  center! : google.maps.LatLngLiteral | google.maps.LatLng;
  options!: google.maps.MapOptions;

  display_name! : string | null;
  default_upload! : string | null;
  @Input() issue_type! : string;
  @Input() other_details! : string;
  file! : File;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  @Input() ticket! : TicketDto;
  updateURL = "http://localhost:3333/api/ticket/update/";
  getTicketURL = "http://localhost:3333/api/ticket/";
  uploadURL = "http://localhost:3333/api/ticket/upload";

  constructor(
      private route: ActivatedRoute, 
      private http : HttpClient,
      private router : Router) {
  }


  ngOnInit(): void {
    this.ticket = new TicketDto();

    
    this.zoom = 5.5;
    this.center =  {
      lat: -30.5595,
      lng: 22.9375,
    };
    this.options = {
      zoomControl: true,
      scrollwheel: false,
    }

    //User Data
    this.default_upload = "assets/upload-solid.svg"
    this.display_name = "John Doe";

    //Get parameters
    const temp = this.route.snapshot.paramMap.get('id');

    //Add parameter to URL
    this.getTicketURL = this.getTicketURL + temp
    this.updateURL = this.updateURL + temp
    
    this.http.get<TicketDto[]>(this.getTicketURL, this.httpOptions).subscribe(
      (data) =>
      {
        this.ticket = data[0];
        this.initialiseFields(data[0]);
        this.initMap();
      }
      )
  }

  fileUploaded(e: any)
  {

    this.file  = e.target.files[0];


    const reader = new FileReader();
    reader.onload = () => {
      this.default_upload = reader.result as string;
    }
    reader.readAsDataURL(this.file)
     
  }

  editTicket() : void
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

    if (this.issue_type === "Other")
      this.ticket.ticket_type = this.other_details;
    else
      this.ticket.ticket_type = this.issue_type;
    this.ticket.ticket_status = "Created";
    this.ticket.ticket_create_date = new Date();
    this.ticket.ticket_upvotes = 0;

    if (this.file !== undefined)
    {
      const formData = new FormData();
      formData.append("photo", this.file, this.file.name);
  
      this.http.post<Express.Multer.File>(this.uploadURL, formData)
      .subscribe({
        next: (data) => {
          console.log(data);
          
          this.updateTicket(data.filename);
          this.showSuccessMessage();
          this.router.navigateByUrl("/tickets")
        },
        error: error => {
          this.showErrorMessage("Error uploading image");
          this.updateTicket(this.ticket.ticket_img);
        }
      }) 
    }
    else
    {
      this.updateTicket(this.ticket.ticket_img);
    }
  }
  
  updateTicket(link : string) {
    this.ticket.ticket_img = link
    this.http.put<TicketDto>(this.updateURL, this.ticket, this.httpOptions).subscribe(
        () => {
          if (this.file != null)
            this.showSuccessMessage();
            // this.router.navigateByUrl("/tickets")
        },
        () => {
          this.showErrorMessage("Errror updating ticket");
        }
      ) 
  }


  showErrorMessage(s : string) {
    alert(s);
  }
  
  showSuccessMessage() {
    alert("Sucessfully editted the ticket");
  }

  initialiseFields(data : TicketDto)
  {
    
    if (this.ticket.ticket_img != "")
        this.default_upload = "assets/" + this.ticket.ticket_img;
    if ((data.ticket_type === "Pothole") || (data.ticket_type === "Water Outage") ||
        (data.ticket_type === "Sinkhole")  || (data.ticket_type === "Electricity Outage") ) 
          this.issue_type = data.ticket_type;
    else
    {
      this.issue_type = "Other"
      this.other_details = data.ticket_type;
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
          geocoder.geocode({location: pos},(response) =>
          {
            
            if (response != null) 
            {
              this.ticket.ticket_location = "";
              for (let k = 0 ; k < 4; k++)
                this.ticket.ticket_location += response[0].address_components[k].long_name + " ";
              this.ticket.ticket_city = response[0].address_components[3].long_name;
                console.log(this.ticket.ticket_location);
              console.log(this.ticket.ticket_city);
            }

          });
        }
      )
    }
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
