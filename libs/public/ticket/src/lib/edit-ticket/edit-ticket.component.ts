import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Express } from 'express';
import { Multer } from 'multer';
import { GoogleMap } from '@angular/google-maps';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';
import { Loader } from '@googlemaps/js-api-loader';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';

@Component({
  selector: 'grid-watch-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
})
export class EditTicketComponent implements OnInit {

  
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  autocomplete!: google.maps.places.Autocomplete;

  displayName! : string | null;
  issueOptions = ["Pothole", "Sinkhole", "Broken Light", "Broken Robot", "Water Outage", "Electricity Outage", "Other"]
  defaultUpload! : string | null;
  @Input() issue_type! : string;
  @Input() other_details! : string;
  file! : File;
  waiting! : boolean;

  placeID! : string;
  @Input() ticket! : TicketDto;
  map!: google.maps.Map;
  marker!: google.maps.Marker



  constructor(
      private route: ActivatedRoute, 
      private http : HttpClient,
      private router : Router,
      private ticketService :TicketService, 
      private googleMapsService: GoogleMapsService, 
      private formBuilder : FormBuilder) {
  }


  async ngOnInit(): Promise<void> {
    const loader = new Loader({
      apiKey: "AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE",
      version: "weekly",
      libraries: ["places"]
    });
    
    loader.load().then(() => {

      this.initMap();

      //Get parameters
    const tempID = this.route.snapshot.paramMap.get('id');
    if (tempID)
      this.ticketService.getTicket(tempID).subscribe(
        (response) => {
          console.log(response);
          this.ticket = response[0];
          this.initialiseFields(response[0]);
        }
      )
      
      }, (error) =>{console.log(error);
      });

    this.ticket = new TicketDto();
    this.defaultUpload = "";    
    this.waiting = true;

    //User Data
    this.displayName = "John Doe";

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
    if ( this.ticket.ticketLocation == "")
    {
      this.showErrorMessage("Location not found")
      return;
    }

    if (this.issue_type === "Other")
      this.ticket.ticketType = this.other_details;
    else
      this.ticket.ticketType = this.issue_type;
    

      
      const place = this.autocomplete.getPlace()
      if (place !== undefined)
      if (place.place_id !== undefined)
      {
        this.ticket.ticketLocation = place.place_id;
        this.ticket.ticketCity = this.googleMapsService.getAutocompleteCity(place.address_components)
      }

      if (this.placeID != "")
      {
        this.ticket.ticketLocation = this.placeID;
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
      this.updateTicket(this.ticket.ticketImg);
    }
  }
  
  updateTicket(link : string) {
    this.ticket.ticketImg = link;
    if (this.ticketService.updateTicket(this.ticket))
    {
      this.uploadPhoto();
      this.router.navigateByUrl("/tickets")
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
   
    this.ticketService.getImages(data.ticketId).subscribe(
      (response) => {
        console.log(response);
        if (response[response.length - 1])
        {
          this.ticket.ticketImg = response[response.length - 1].pictureLink;
          this.defaultUpload = "assets/" + this.ticket.ticketImg;
        }
      }
    );
        
    //SET TICKET TYPE
    if (data.ticketType !== "Other")
      this.issue_type = data.ticketType;
    else
    {
      this.issue_type = "Other"
      this.other_details = data.ticketType;
    }

    //CHange location from PLACE ID to formatted address
    this.placeID = this.ticket.ticketLocation;
    this.googleMapsService.getLocation(this.ticket.ticketLocation).then(
      (response) =>
      {
        this.ticket.ticketLocation = response;
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
    
    const zoom = 5.5;
    const center =  {
      lat: -30.5595,
      lng: 22.9375,
    };
    this.map = this.googleMapsService.createMapObject("map",center,zoom)
    this.autocomplete = this.googleMapsService.createAutoCompleteObject("pac-input");
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
      async (response) =>
      {
        console.log(response);
        const pos = {
          lat: response.latitude,
          lng: response.longitude
        }
        this.createMapMarker(pos);
        this.placeID  = await this.googleMapsService.getLocationCoord(pos);
        this.ticket.ticketLocation = await this.googleMapsService.getLocation(this.placeID);
        this.ticket.ticketCity = await this.googleMapsService.getCity(this.placeID);
        // this.placeID  
      }
    );
  }

  createMapMarker(place: {lat:number, lng:number}) : void
  {
    if (this.marker !== undefined)
    this.marker.setMap(null);
    this.map.setCenter(place);
    this.map.setZoom(16)
    const tempLabel = "";
    this.marker = this.googleMapsService.createMarkerObject(place, this.map, tempLabel);
  }

  uploadPhoto() : void
  {
    this.ticketService.uploadImage(this.ticket.ticketImg, this.ticket.ticketId);
  }

  initiateFileUpload() : void {
    document.getElementById("issue_uploaded_img")?.click();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
