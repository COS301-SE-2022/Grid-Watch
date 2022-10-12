import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, SessionManagerService, MessageDialogComponent, PublicProfileService, TicketService, ToastService } from '@grid-watch/shared-ui';
import { Loader } from '@googlemaps/js-api-loader';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
// import { JwtService } from '@nestjs/jwt';


@Component({
  selector: 'grid-watch-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent
{

  hideRequiredControl = new UntypedFormControl(false);
  floatLabelControl = new UntypedFormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  @Input() ticket: TicketDto = new TicketDto();

  file!: File;

  autocomplete!: google.maps.places.Autocomplete;
  marker!: google.maps.Marker

  zoom!: number;
  center!: google.maps.LatLngLiteral
  options!: google.maps.MapOptions;
  placeID!: string;

  defaultUpload!: string;
  other!: boolean;
  otherDetails!: string;
  map!: google.maps.Map;

  user!: UserDto

  issueOptions = ["Pothole", "Sinkhole", "Broken Street Light", "Broken Traffic Light", "Water Outage", "Electricity Outage", "Other"]
  dialogRef!: MatDialogRef<MessageDialogComponent>;

  issue = new UntypedFormControl('', [Validators.required]);
  location = new UntypedFormControl('', [Validators.required]);
  description = new UntypedFormControl('', [Validators.required]);



  constructor(
    private router: Router,
    private ticketService: TicketService,
    private googleMapsService: GoogleMapsService,
    private formBuilder: UntypedFormBuilder,
    private profileService: PublicProfileService,
    public dialog: MatDialog,
    private toast: ToastService,
    private sesssionService: SessionManagerService)
  {
  }

  async ngOnInit(): Promise<void>
  {
    this.zoom = 5.5;
    this.center = {
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
      libraries: ["places", "visualization"]
    });

    loader.load().then(() =>
    {

      this.initMap();

    }, (error) =>
    {
      console.log(error);
    });

    // this.initMap()
  }


  getFloatLabelValue(): FloatLabelType
  {
    return this.floatLabelControl.value || 'auto';
  }

  async fileUploaded(e: any): Promise<void>
  {

    this.file = e.target.files[0];


    const reader = new FileReader();
    reader.onload = () =>
    {
      this.defaultUpload = reader.result as string;
    }
    await this.delay(2000)
    reader.readAsDataURL(this.file)


  }

  showErrorMessage(title: string, info: string): void
  {
    const temp = window.innerWidth;
    const pageData = title;
    const pageInfo = info;
    this.dialogRef = this.dialog.open(MessageDialogComponent, {
      panelClass: ['full-screen'],
      data: { pageData: pageData, pageInfo: pageInfo, return: "" },
      width: temp.toString(),
      height: "150",
      scrollStrategy: new NoopScrollStrategy()
    });

  }


  async createTicket(): Promise<void>
  {
    // console.log(this.ticket);
    
    if (this.ticket.ticketType === "" || this.ticket.ticketDescription === "") //&& this.location.hasError !== null )
    {
      this.showErrorMessage("Fields", "Complete all mandatory fields")
      return;
    }

    if ((this.ticket.ticketLocation == ""))
    {

      this.showErrorMessage("Location", "Location not found")
      return;
    }

    if ((this.autocomplete.getPlace() === undefined) && ((this.placeID === "")))
    {

      this.showErrorMessage("Location", "Location not found")
      return;
    }
    const userId = this.sesssionService.getID();
    const loggedIn = this.sesssionService.getLoggedIn();
    if (userId == null && loggedIn === null)
    {            
      this.showErrorMessage("Login","Not logged in, would you like to post as a guest?")
      
      this.dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);
        this.createGuest();
      });
      return;
    }
    else if(loggedIn === "false")
    {
      this.showErrorMessage("Login","Not logged in, would you like to post as a guest?")
      
      this.dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);
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
      // console.log(this.autocomplete.getPlace());
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

      this.ticketService.postImage(this.file).then(
        (response) =>
        {
          console.log(response);
          
          this.ticket.ticketImg = response
          this.uploadTicket()
        }
      );
    }
    else
    {
      this.toast.show('Ticket Created Successfully', {
        classname: 'bg-success text-light',
        delay: 5000,
        autohide: true
      });
      this.uploadTicket();
    }

  }


  async initMap(): Promise<void>
  {
    this.map = this.googleMapsService.createMapObject("map", this.center, this.zoom)
    this.autocomplete = this.googleMapsService.createAutoCompleteObject("pac-input");
    google.maps.event.addListener(this.autocomplete, "place_changed",
      () =>
      {
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

    this.map.addListener("click", (e: { latLng: any; }) =>
    {
      this.placeMarkerAndPanTo(e.latLng, this.map);
    });

    this.ticketService.getTickets().subscribe(
      (response) =>
      {

        const tickets = response;

        const label = "";
        let temp: string;



        tickets.forEach((ticket) =>
        {
          switch (ticket["ticketType"])
          {
            case "Electricity Outage":
              temp = "assets/issue-brokenpower-pin1.png";
              break;
            case "Water Outage":
              temp = "assets/issue-water-pin1.png";
              break;
            case "Pothole":
              temp = "assets/issue-pothole-pin1.jpg";
              break;
            case "Sinkhole":
              temp = "assets/issue-sinkhole-pin1.png";
              break;
            case "Broken Traffic Light":
              temp = "assets/issue-brokenrobot-pin1.png";
              break;
            case "Broken Street Light":
              temp = "assets/issue-brokenlight-pin1.png";
              break;
            default:
              temp = "assets/issue-maintenance-pin1.png";
              break;
          }

          const marker = new google.maps.Marker({
            position: { lat: ticket.ticketLat, lng: ticket.ticketLong },
            map: this.map,
            icon: { 
              url: temp, 
              size: new google.maps.Size(43, 56),
              scaledSize: new google.maps.Size(43, 56),
              origin: new google.maps.Point(0,0)
            }
          });
          const infoWindow = new google.maps.InfoWindow({
            content: '',
            disableAutoPan: true,
          });



          marker.addListener('click', () =>
          {
            // const html = 
            // `<div> 
            //   ${this.tickets[i].ticketType}
            //   <button (click)="test()">View</button>
            // </div>`;
            const html = document.createElement("div");
            html.innerHTML = ticket.ticketType;
            html.onclick = () =>
            {
              this.router.navigate(['/viewTicket', { id: ticket.ticketId }]);
            };
            infoWindow.setContent(html);
            infoWindow.open(this.map, marker);
          });
        })
      }
    )



  }



  placeMarkerAndPanTo(latLng: google.maps.LatLng, map: google.maps.Map)
  {
    // new google.maps.Marker({
    //   position: latLng,
    //   map: map,
    // });
    this.createMapMarker({ lat: latLng.lat(), lng: latLng.lng() })
  }




  createGuest()
  {
    const guestUser = new UserDto();
    guestUser.dateCreated = new Date();
    guestUser.email = "guest" + Date.now() + "@gridwatch.com"
    guestUser.name = "guest" + Date.now();
    const string_length = 12;
    let randomstring = '';
    for (let i = 0; i < string_length; i++)
    {
      randomstring = Math.random().toString(36).slice(-8);
    }
    guestUser.password = randomstring;
    // console.log(guestUser);

    this.profileService.createUser(guestUser).subscribe(
      (response) => {
        // console.log(response);
        this.sesssionService.login(response.id.toString());
        this.profileService.login(guestUser).then(
          (response) =>
          {
            this.sesssionService.setToken(response.access_token)
          }
        )
        this.createTicket();
      }
    )


  }

  getCurrentLocation(): void
  {
    this.googleMapsService.getCurrentLocation().then(
      async (response) =>
      {
        // console.log(response);
        const pos = {
          lat: response.latitude,
          lng: response.longitude
        }
        this.createMapMarker(pos);
        this.placeID = await this.googleMapsService.getLocationCoord(pos);
        this.ticket.ticketLocation = await this.googleMapsService.getLocation(this.placeID);
        this.ticket.ticketStreetAddress = await this.googleMapsService.getLocation(this.placeID);
        this.ticket.ticketLat = response.latitude;
        this.ticket.ticketLong = response.longitude;
        this.ticket.ticketCity = await this.googleMapsService.getCity(this.placeID);
        // this.placeID  
        console.log(this.placeID);
        
      }
    );
  }

  uploadTicket()
  {
    this.ticketService.createNewTicket(this.ticket).subscribe(
      (response) =>
      {
        // console.log(response);
        this.ticket.ticketId = response.ticketId;
        if (this.file !== undefined)
          this.uploadPhoto();
      }
    )
  }

  showSuccessMessage(): void
  {
    alert("Created Ticket successfully");
    this.router.navigateByUrl("/tickets");
  }

  uploadPhoto(): void
  {
    this.ticketService.uploadImage(this.ticket.ticketImg, this.ticket.ticketId).subscribe(
      () =>
      {
        this.showSuccessMessage();
        this.router.navigateByUrl("/tickets")
      },
      () =>
      {
        this.showErrorMessage("Ticket", "Failed to create ticket");
      }
    );
  }

  createMapMarker(place: { lat: number, lng: number }): void
  {
    if (this.marker !== undefined)
      this.marker.setMap(null);
    this.map.unbind("marker");
    this.map.setCenter(place);
    // this.map.panTo(place);
    this.map.setZoom(16)
    const tempLabel = "";
    this.marker = this.googleMapsService.createMarkerObject(place, this.map, tempLabel);

  }

  delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  initiateFileUpload(): void
  {
    document.getElementById("issue_uploaded_img")?.click();
  }

  getErrorMessage()
  {
    // if (this.issue.hasError('required')) {
    return 'You must enter a value';
    // }
  }
}
