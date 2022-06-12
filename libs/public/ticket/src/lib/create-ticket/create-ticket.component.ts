import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { TicketController } from 'libs/api/ticket/api/src/lib/controllers/api-ticket-api-controller.controller';
import { Router } from '@angular/router';
import { Express } from 'express';
import { Multer } from 'multer';
import { GoogleMapsModule } from '@angular/google-maps';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';


@Component({
  selector: 'grid-watch-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent{
  @Input() ticket : TicketDto = new TicketDto();

  file! : File;

  autocomplete!: google.maps.places.Autocomplete;
  markerPosition!: google.maps.LatLng | google.maps.LatLngLiteral

  zoom! : number;
  center! : google.maps.LatLngLiteral | google.maps.LatLng;
  options!: google.maps.MapOptions;
  place_id!: string;

  defaultUpload! : string;
  other!: boolean;
  other_details!: string;
  

  constructor(private http : HttpClient, 
              private router: Router,
              private ticketService : TicketService,
              private googleMapsService: GoogleMapsService) {
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
    this.defaultUpload = "";
    this.other = false;
    this.other_details = "";
    this.ticket.ticket_location = "";
    this.place_id = "";
    
    this.initMap()
  }

  async fileUploaded(e: any) : Promise<void>
  {

    this.file = e.target.files[0];
    
    
    const reader = new FileReader();
    reader.onload = () => {
      this.defaultUpload = reader.result as string;
    }
    await this.delay(2000)    
    reader.readAsDataURL(this.file)
    
    
  }

  showErrorMessage(e :string) : void{
    alert(e);
    
  }


  createTicket() : void
  {
    if (( this.ticket.ticket_location == ""))
    {
      this.showErrorMessage("Location not found")
      return;
    }
    
    if ((this.autocomplete.getPlace() === undefined) && (( this.place_id === "")))
    {
      this.showErrorMessage("Location not found")
      return;
    }
    
    if (this.place_id == "")
    {
      this.place_id = this.autocomplete.getPlace().place_id as string;
      this.ticket.ticket_city = this.googleMapsService.getAutocompleteCity(this.autocomplete.getPlace().address_components);
    }
    this.ticket.ticket_location = this.place_id;
    this.ticket.ticket_status = "Created";
    this.ticket.ticket_create_date = new Date();
    this.ticket.ticket_upvotes = 0;


    if (this.file)
    {
      const formData = new FormData();
      formData.append("photo", this.file, this.file.name);
  
      this.ticketService.postImage(formData).subscribe(
        (response) =>
        {
          this.ticket.ticket_img = response.filename
          this.uploadTicket()
        }
      );
    }
    else
    {
      this.uploadTicket();
    }
     
  }

  initMap() : void
  {
    this.autocomplete = this.googleMapsService.createAutoCompleteObject("pac-input");
    google.maps.event.addListener(this.autocomplete, "place_changed" , 
      () =>{
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
      async (response) =>
      {
        console.log(response);
        const pos = {
          lat: response.latitude,
          lng: response.longitude
        }
        this.createMapMarker(pos);
        this.place_id  = await this.googleMapsService.getLocationCoord(pos);
        this.ticket.ticket_location = await this.googleMapsService.getLocation(this.place_id);
        this.ticket.ticket_city = await this.googleMapsService.getCity(this.place_id);
        // this.placeID  
      }
    );
  }

  uploadTicket() {
    this.ticketService.createNewTicket(this.ticket).subscribe(
      (response) =>
      {
        console.log(response);
        this.ticket.ticket_id = response[0].ticket_id;
        if (this.file !== undefined)
            this.uploadPhoto();
      }
    )
  }

  showSuccessMessage() : void
  {
    alert("Created Ticket successfully");
    this.router.navigateByUrl("/tickets");
  }

  uploadPhoto() : void
  {
    this.ticketService.uploadImage(this.ticket.ticket_img, this.ticket.ticket_id).subscribe(
      () =>
      {
        this.showSuccessMessage();
        this.router.navigateByUrl("/tickets")
      },
      () => {
        this.showErrorMessage("Failed to create ticket");
      }
    );
  }

  createMapMarker(place: {lat:number, lng:number}) : void
  {
   
    this.markerPosition = place;
    this.zoom = 12;
    this.center = place;
    // console.log("HERE");
    // console.log(place);
    document.getElementById("pac-input")?.focus();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  initiateFileUpload() : void {
    document.getElementById("issue_uploaded_img")?.click();
  }
}

