import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Loader } from '@googlemaps/js-api-loader';
import { env } from 'process';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';

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

  issue_id! : string | undefined;
  defaultUpload! : string;
  ticket: TicketDto = new TicketDto();
  dateCreated! : string;
  getTicketURL = "http://localhost:3333/api/ticket/";
  UpdateStatusURL = "http://localhost:3333/api/ticket/update/status/";
  getPictureURL = "http://localhost:3333/api/ticket/picture/";
  zoom!: number;
  center!: { lat: number; lng: number; };

  constructor(private http : HttpClient, 
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private ticketService : TicketService,
              private googleMapsService : GoogleMapsService) {}

  ngOnInit(): void {
    this.ticket.ticket_img = "";
    const temp = this.route.snapshot.paramMap.get('id');
    this.issue_id = temp?.toString();
    this.zoom = 5.5;
    this.center =  {
      lat: -30.5595,
      lng: 22.9375,
    };
      
    const loader = new Loader({
      apiKey: 'AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE',
      version: 'weekly',
      libraries: ['places'],
    });
    
    loader.load().then(
      () => {
        console.log("Loaded");
        if (this.issue_id)
          this.initialiseTicket(this.issue_id);
          this.initMap();
        
      },
      (error) => {
        console.log(error);
      }
    );
    
  }


  initMap() {
    this.googleMapsService.createMapObject("map", this.center, this.zoom)
  }

  async initialiseTicket(id : string ) {
    
    this.ticketService.getTicket(id).subscribe(
      async (response) => {
        const data = response[0];
        this.ticket = response[0];
        let temp = formatDate(data.ticket_create_date, 'yyyy-MM-dd', 'en-US');;
        this.dateCreated = temp;
        if (data.ticket_close_date != null)
          temp = formatDate(data.ticket_close_date, 'yyyy-MM-dd', 'en-US');
        else
          temp = "";
        this.getPicture(this.ticket.ticket_id)
        this.ticket.ticket_location = await this.googleMapsService.getLocation(this.ticket.ticket_location);
      }
      );
      
    
  }

  getPicture(id : number) : void {
    this.ticketService.getImages(id).subscribe(
      (response) =>
      {
        console.log(response);
        this.ticket.ticket_img = response[response.length -1].picture_link
        
      }
    )
    console.log(this.ticket);
    
  }

  back() : void
  {
    this.router.navigateByUrl("/adminViewTicket")
  }

  dispatch() : void 
  {
    this.UpdateStatusURL += this.issue_id;
    // console.log(this.UpdateStatusURL);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const temp = {status: "Dispatched"}
    this.http.put<string>(this.UpdateStatusURL, temp ,httpOptions).subscribe(
      () => {
        this.showSuccessMessage();
        this.router.navigateByUrl("/adminViewTicket")
      },
      () =>
      {
        this.showErrorMessage();
    }
    );

    // this.ticketService.
  }
  showErrorMessage() : void {
    alert("Error Dispathing Ticket");
  }
  
  showSuccessMessage() : void 
  {
    alert("Successfully Dispatched Ticket");
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
