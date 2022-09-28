import { formatDate, Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Loader } from '@googlemaps/js-api-loader';
import { env } from 'process';
import { GoogleMapsService, TicketService,ToastService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-view-ticket-details',
  templateUrl: './view-ticket-details.component.html',
  styleUrls: ['./view-ticket-details.component.scss'],
})
export class ViewTicketDetailsComponent implements OnInit {

  
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  issueId! : string | undefined;
  ticket: TicketDto = new TicketDto();
  placeID! : string;
  dateCreated! : string;
  zoom!: number;
  center!: { lat: number; lng: number; };
  map!: google.maps.Map;

  constructor(private http : HttpClient, 
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private ticketService : TicketService,
              private toastService : ToastService,
              private location: Location,
              private googleMapsService : GoogleMapsService) {}

  ngOnInit(): void {
    this.ticket.ticketImg = "";
    const temp = this.route.snapshot.paramMap.get('id');
    this.issueId = temp?.toString();
    this.zoom = 5.5;
    this.center =  {
      lat: -30.5595,
      lng: 22.9375,
    };
      
    const loader = new Loader({
      apiKey: 'AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE',
      version: 'weekly',
      libraries: ['places','visualization'],
    });
    
    loader.load().then(
      () => {
        if (this.issueId)
          this.initialiseTicket(this.issueId);
          
        
      },
      (error) => {
        console.log(error);
      }
    );
    
  }


  async initMap() {
    this.googleMapsService.getCoordinates(this.placeID).then(
      (response) =>
      {
        if (response)
        {
          this.center.lat = response.lat();
          this.center.lng = response.lng();
        }
        this.map = this.googleMapsService.createMapObject("map", this.center, 16);
        this.googleMapsService.createMarkerObject(this.center, this.map, this.ticket.ticketType)
      }
    )
    
    

  }

  async initialiseTicket(id : string ) {
    
    this.ticketService.getTicket(id).subscribe(
      async (response) => {
        const data = response[0];
        this.ticket = response[0];
        this.placeID = this.ticket.ticketLocation;
        this.initMap();
        let temp = formatDate(data.ticketCreateDate, 'yyyy-MM-dd', 'en-US');;
        this.dateCreated = temp;
        if (data.ticketCloseDate != null)
          temp = formatDate(data.ticketCloseDate, 'yyyy-MM-dd', 'en-US');
        else
          temp = "";
        this.getPicture(this.ticket.ticketId)
        this.ticket.ticketLocation = await this.googleMapsService.getLocation(this.ticket.ticketLocation);
      }
      );
    
  }

  getPicture(id : number) : void {
    this.ticketService.getImages(id).subscribe(
      (response) =>
      {
        console.log(response );
        if (response.length !== 0)
          this.ticket.ticketImg = response[response.length -1].pictureLink;
          else 
          this.ticket.ticketImg = "image-solid.svg"; 
      }
    )
    // console.log(this.ticket);
    
  }

  GoBack() : void
  {
    this.location.back();
  }

  back() : void
  {
    this.toastService.show('Ticket Discarded',{
      classname: 'bg-info text-light',
      delay: 5000,
      autohide: true
    })
    this.router.navigateByUrl("/adminViewTicket")
  }

  dispatch() : void 
  {
    if (this.issueId)
      this.ticketService.updateTicketStatus(this.issueId, "Dispatched").subscribe(
        (response) =>
        {
          // console.log(response);
          this.showSuccessMessage();
          this.router.navigateByUrl("/adminViewTicket");
        }, 
        (error) =>
        {
          this.toastService.show('Error Dispatching Ticket',{
            classname:'bg-danger text-light',
            delay : 5000,
            autohide: true
          })
          //this.showErrorMessage();
        }

      )

  }
  showErrorMessage() : void {
    alert("Error Dispathing Ticket");
  }
  
  showSuccessMessage() : void 
  {
    this.toastService.show('Successfully Dispatched Ticket',{
      classname: 'bg-success text-light',
      delay: 5000,
      autohide: true
    })
    //alert("Successfully Dispatched Ticket");
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
