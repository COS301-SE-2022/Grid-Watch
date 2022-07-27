import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { TicketController } from 'libs/api/ticket/api/src/lib/controllers/api-ticket-api-controller.controller';
import { Router } from '@angular/router';
import { Express } from 'express';
import { Multer } from 'multer';
import { GoogleMapsModule } from '@angular/google-maps';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, SessionManagerService, MessageDialogComponent, PublicProfileService, TicketService } from '@grid-watch/shared-ui';
import { Loader } from '@googlemaps/js-api-loader';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import {generate} from 'generate-password';
import { invalid } from '@angular/compiler/src/render3/view/util';


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
  
  user! : UserDto

  issueOptions = ["Pothole", "Sinkhole", "Broken Street Light", "Broken Traffic Light", "Water Outage", "Electricity Outage", "Other"]
  dialogRef! : MatDialogRef<MessageDialogComponent>;

  issue = new FormControl('', [Validators.required]);
  location = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  

  constructor(
              private router: Router,
              private ticketService : TicketService,
              private googleMapsService: GoogleMapsService,
              private formBuilder: FormBuilder,
              private profileService : PublicProfileService,
              public dialog: MatDialog,
              private sesssionManager: SessionManagerService) {
              }
              
  async ngOnInit(): Promise<void> {    
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
    this.ticket.ticketLocation = "";
    this.ticket.ticketType = "";
    this.ticket.ticketDescription = "";
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

  showErrorMessage(title :string, info : string ) : void{
    const temp = window.innerWidth;
      const pageData = title;
      const pageInfo = info;
      this.dialogRef = this.dialog.open(MessageDialogComponent,{
        panelClass: ['full-screen'],
        data: {pageData: pageData, pageInfo : pageInfo, return: ""},
        width: temp.toString(), 
        height: "150",
        scrollStrategy: new NoopScrollStrategy()
      },);
    
  }


  async createTicket() : Promise<void>
  {
    console.log(this.ticket);
    
    if (this.ticket.ticketType === "" && this.ticket.ticketDescription === "") //&& this.location.hasError !== null )
    {
      this.showErrorMessage("Fields", "Complete all mandatory fields")
      return;
    }
    
    if (( this.ticket.ticketLocation == ""))
    {
      
      this.showErrorMessage("Location","Location not found")
      return;
    }
    
    if ((this.autocomplete.getPlace() === undefined) && (( this.placeID === "")))
    {

      this.showErrorMessage("Location","Location not found")
      return;
    }
    const userId = localStorage.getItem("userId");
    const loggedIn = localStorage.getItem("LoggedIn");
    if (userId == null && loggedIn === "false")
    {
      this.showErrorMessage("Login","Not logged in, would you like to post as a guest?")
      
      this.dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.createGuest();
      });
      return;
    }
    
    if (this.placeID == "")
    {
      this.placeID = this.autocomplete.getPlace().place_id as string;
      this.ticket.ticketCity = this.googleMapsService.getAutocompleteCity(this.autocomplete.getPlace().address_components);
      this.ticket.ticketLat = this.autocomplete.getPlace().geometry?.location?.lat() || 0;
      this.ticket.ticketLong = this.autocomplete.getPlace().geometry?.location?.lng() || 0;
      console.log(this.autocomplete.getPlace());
      this.ticket.ticketStreetAddress = this.autocomplete.getPlace().formatted_address || "";
    }
    this.ticket.ticketLocation = this.placeID;
    this.ticket.ticketStatus = "Created";
    this.ticket.ticketCreateDate = new Date();
    this.ticket.ticketUpvotes = 0;
    if (userId != null)
      this.ticket.userId = parseInt(userId);
    



    if (this.file)
    {
      const formData = new FormData();
      formData.append("photo", this.file, this.file.name);
  
      this.ticketService.postImage(formData).subscribe(
        (response) =>
        {
          this.ticket.ticketImg = response.filename
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

  createGuest()
  {
    const guestUser = new UserDto();
    guestUser.dateCreated = new Date();
    guestUser.email = "guest" + Date.now() + "@gridwatch.com"
    guestUser.name = "guest" + Date.now();
    const string_length = 12;
    let randomstring = '';
    for (let i=0; i<string_length; i++) {
        randomstring = Math.random().toString(36).slice(-8);
    }
    guestUser.password = randomstring;
    console.log(guestUser);

    this.profileService.createUser(guestUser).subscribe(
      (response) => {
        console.log(response);
        this.sesssionManager.login(response.id.toString());
        this.createTicket();
      }
    )

    
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
        this.ticket.ticketStreetAddress = await this.googleMapsService.getLocation(this.placeID);
        this.ticket.ticketLat = response.latitude;
        this.ticket.ticketLong = response.longitude;
        this.ticket.ticketCity = await this.googleMapsService.getCity(this.placeID);
        // this.placeID  
      }
    );
  }

  uploadTicket() {
    this.ticketService.createNewTicket(this.ticket).subscribe(
      (response) =>
      {
        console.log(response);
        this.ticket.ticketId = response.ticketId;
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
    this.ticketService.uploadImage(this.ticket.ticketImg, this.ticket.ticketId).subscribe(
      () =>
      {
        this.showSuccessMessage();
        this.router.navigateByUrl("/tickets")
      },
      () => {
        this.showErrorMessage("Ticket","Failed to create ticket");
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

  getErrorMessage() {
    // if (this.issue.hasError('required')) {
      return 'You must enter a value';
    // }
  }
}

