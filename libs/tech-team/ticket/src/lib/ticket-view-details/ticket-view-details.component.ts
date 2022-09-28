import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';


@Component({
  selector: 'grid-watch-ticket-view-details',
  templateUrl: './ticket-view-details.component.html',
  styleUrls: ['./ticket-view-details.component.scss'],
})
export class TicketViewDetailsComponent implements OnInit {



  ticket! : TicketDto;
  issue_id! : string | null;
  @Input() picture! : TicketPictureDto;

  zoom! : number;
  center! : Record<string, unknown>;
  options!: Record<string, unknown>;
  marker_position!: Record<string, unknown>;

  constructor(
    private router : Router,
    private http : HttpClient,
    private route : ActivatedRoute,
    private dialog: MatDialog,
    private ticketService : TicketService,
    private googleMapsService : GoogleMapsService
  ) {}

  ngOnInit(): void {
    this.ticket = new TicketDto();
    this.picture = new TicketPictureDto();
    this.picture.pictureLink = "";
    
    this.issue_id = this.route.snapshot.paramMap.get('id');
    if (this.issue_id)
      this.ticketService.getTicket(this.issue_id).subscribe(
        async (data) => {
          // console.log(data);
          this.ticket = data[0];
          this.ticket.ticketImg = "";
          this.ticket.ticketCreateDate = new Date(this.ticket.ticketCreateDate);
          this.loadImage();
        }
        );

    this.zoom = 5.5;
    this.center =  {
      lat: -30.5595,
      lng: 22.9375,
    };
    this.options = {
      zoomControl: true,
      scrollwheel: false,
    }
      
    
  }

  async loadImage() : Promise<void> 
  {
    // await this.delay(3000)
    // this.getPictureURL += ;
    this.ticketService.getImages(this.ticket.ticketId).subscribe(
      (data) => {
      console.log(data);
      
        if (data.length > 0)
      {
        this.picture = data[data.length - 1];
      }
      else
      {
        this.picture.pictureLink = "image-solid.svg";
      }
    }
    );
  }

  reject() : void
  {
    // console.log("Here")
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(async result => {
      if (result)
      {
        if (this.issue_id)
        this.ticketService.updateTicketStatus(this.issue_id, "Rejected").subscribe(
          (response) =>{
            this.router.navigateByUrl("/tickets");
            
          }
        );
      }
    });
  }

  accept() : void
  {
    this.router.navigate(["/editTicketDetails", {"id":this.issue_id}])
  }

  
  showErrorMessage() : void {
    alert("Something went wrong accepting this ticket")
  }
  
  showSuccessMessage() : void {
    
    alert("Successfully accepted the ticket")
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}


