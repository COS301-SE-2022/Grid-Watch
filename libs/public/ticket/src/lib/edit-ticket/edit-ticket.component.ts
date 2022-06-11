import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Express } from 'express';
import { Multer } from 'multer';
import { GoogleMap } from '@angular/google-maps';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
})
export class EditTicketComponent implements OnInit {

  autocomplete!: google.maps.places.Autocomplete;
  markerPosition!: google.maps.LatLng | google.maps.LatLngLiteral

  zoom! : number;
  center! : google.maps.LatLngLiteral | google.maps.LatLng;
  options!: google.maps.MapOptions;

  displayName! : string | null;
  defaultUpload! : string | null;
  @Input() issue_type! : string;
  @Input() other_details! : string;
  file! : File;
  waiting! : boolean;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  placeID! : string;
  @Input() ticket! : TicketDto;


  constructor(
      private route: ActivatedRoute, 
      private http : HttpClient,
      private router : Router,
      private ticketService :TicketService, 
      private googleMapsService: GoogleMapsService) {
  }


  async ngOnInit(): Promise<void> {
    this.ticket = new TicketDto();
    this.defaultUpload = "";    
    this.waiting = true;

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
    this.displayName = "John Doe";

    //Get parameters
    const tempID = this.route.snapshot.paramMap.get('id');
    if (tempID)
      this.ticketService.getTicket(tempID).subscribe(
        (response) => {
          // console.log("HERE:");
          console.log(response);
          this.initialiseFields(response[0]);
          this.initMap();
        }
      )
  }

  async fileUploaded(e: any)
  {

    this.file  = e.target.files[0];
    this.waiting = true;
    await this.delay(2000)
    const reader = new FileReader();
    reader.onload = () => {
      this.defaultUpload = reader.result as string;
      this.waiting = false;
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

    if (this.issue_type === "Other")
      this.ticket.ticket_type = this.other_details;
    else
      this.ticket.ticket_type = this.issue_type;
    

      
      const place = this.autocomplete.getPlace()
      if (place !== undefined)
      if (place.place_id !== undefined)
      {
        this.ticket.ticket_location = place.place_id;
        this.ticket.ticket_city = this.googleMapsService.getAutocompleteCity(place.address_components)
      }
      
    console.log(this.ticket);
    

    if (this.file !== undefined)
    {
      const formData = new FormData();
      formData.append("photo", this.file, this.file.name);
      this.ticketService.postImage(formData).subscribe(
        (response) =>
        {

          console.log(response.filename);
          this.updateTicket(response.filename)
        }
      );
    }
    else
    {
      this.updateTicket(this.ticket.ticket_img);
    }
  }
  
  updateTicket(link : string) {
    this.ticket.ticket_img = link;
    if (this.ticketService.updateTicket(this.ticket))
    {
      this.uploadPhoto();
    }
    else
      this.showErrorMessage("Something went wrong")
  }


  showErrorMessage(s : string) {
    alert(s);
  }
  
  showSuccessMessage() {
    alert("Sucessfully editted the ticket");
  }

  initialiseFields(data : TicketDto)
  {
    // console.log(data.ticket_id);
    
    // this.getPictureURL += data.ticket_id;
    this.ticket = data;
    this.ticketService.getImages(data.ticket_id).subscribe(
      (response) => {
        console.log(response);
        if (response[response.length - 1])
        {
          this.ticket.ticket_img = response[response.length - 1].picture_link;
          this.defaultUpload = "assets/" + this.ticket.ticket_img;
        }
      }
    );
        
    //SET TICKET TYPE
    if (data.ticket_type !== "Other")
      this.issue_type = data.ticket_type;
    else
    {
      this.issue_type = "Other"
      this.other_details = data.ticket_type;
    }

    //CHange location from PLACE ID to formatted address
    this.placeID = this.ticket.ticket_location;
    this.googleMapsService.getLocation(this.ticket.ticket_location).then(
      (response) =>
      {
        this.ticket.ticket_location = response;
      },
      (error) =>
      {
        console.log(error);
      }
    )
    this.waiting = false;
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
      if (place.geometry?.location !== undefined)
      {
        const pos = {
          lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng()
        }
        this.createMapMarker(pos)
      }
    })
  }

  getCurrentLocation() : void
  {
    this.googleMapsService.getCurrentLocation().then(
      (response) =>
      {
        console.log(response);
        const pos = {
          lat: response.latitude,
          lng: response.longitude
        }
        this.createMapMarker(pos);
      }
    );
  }

  createMapMarker(place: {lat:number, lng:number}) : void
  {
    // this.marker_position =
   
    this.markerPosition = place;
    this.zoom = 12;
    this.center = place;
    console.log(place);
    document.getElementById("pac-input")?.focus();
  }

  uploadPhoto() : void
  {
    this.ticketService.uploadImage(this.ticket.ticket_img, this.ticket.ticket_id);
  }

  initiateFileUpload() : void {
    document.getElementById("issue_uploaded_img")?.click();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
