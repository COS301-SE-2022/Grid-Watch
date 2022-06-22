import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { TicketController } from 'libs/api/ticket/api/src/lib/controllers/api-ticket-api-controller.controller';
import { Router } from '@angular/router';
import { Express } from 'express';
import { Multer } from 'multer';
import { GoogleMapsModule } from '@angular/google-maps';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';
import { Loader } from '@googlemaps/js-api-loader';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';


@Component({
  selector: 'grid-watch-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent{

    hideRequiredControl = new FormControl(false);
    floatLabelControl = new FormControl('auto' as FloatLabelType);
    formOptions = this.formBuilder.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });

  @Input() ticket : TicketDto = new TicketDto();

  file! : File;

  autocomplete!: google.maps.places.Autocomplete;
  marker!: google.maps.Marker

  zoom! : number;
  center! : google.maps.LatLngLiteral
  options!: google.maps.MapOptions;
  placeID!: string;

  defaultUpload! : string;
  other!: boolean;
  otherDetails!: string;
  map!: google.maps.Map;

  issueOptions = ["Pothole", "Sinkhole", "Broken Light", "Broken Robot", "Water Outage", "Electricity Outage", "Other"]
  

  constructor(private http : HttpClient, 
              private router: Router,
              private ticketService : TicketService,
              private googleMapsService: GoogleMapsService,
              private formBuilder: FormBuilder) {
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
    this.otherDetails = "";
    this.ticket.ticket_location = "";
    this.placeID = "";

    const loader = new Loader({
      apiKey: "AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE",
      version: "weekly",
      libraries: ["places"]
    });
    
    loader.load().then(() => {

      this.initMap();
      
      }, (error) =>{console.log(error);
      });
    
    // this.initMap()
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
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
    
    if ((this.autocomplete.getPlace() === undefined) && (( this.placeID === "")))
    {
      this.showErrorMessage("Location not found")
      return;
    }
    
    if (this.placeID == "")
    {
      this.placeID = this.autocomplete.getPlace().place_id as string;
      this.ticket.ticket_city = this.googleMapsService.getAutocompleteCity(this.autocomplete.getPlace().address_components);
    }
    this.ticket.ticket_location = this.placeID;
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
    this.map = this.googleMapsService.createMapObject("map",this.center,this.zoom)
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
        this.placeID  = await this.googleMapsService.getLocationCoord(pos);
        this.ticket.ticket_location = await this.googleMapsService.getLocation(this.placeID);
        this.ticket.ticket_city = await this.googleMapsService.getCity(this.placeID);
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
    if (this.marker !== undefined)
    this.marker.setMap(null);
    this.map.unbind("marker");
    this.map.setCenter(place);
    this.map.setZoom(16)
    const tempLabel = "";
    this.marker = this.googleMapsService.createMarkerObject(place, this.map, tempLabel);

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  initiateFileUpload() : void {
    document.getElementById("issue_uploaded_img")?.click();
  }
}

