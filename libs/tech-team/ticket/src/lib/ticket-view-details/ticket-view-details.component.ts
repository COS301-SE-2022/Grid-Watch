import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'grid-watch-ticket-view-details',
  templateUrl: './ticket-view-details.component.html',
  styleUrls: ['./ticket-view-details.component.scss'],
})
export class TicketViewDetailsComponent implements OnInit {

  getAllURL = "http://localhost:3333/api/ticket/"
  UpdateStatusURL = "http://localhost:3333/api/ticket/update/status/";
  getPictureURL = "http://localhost:3333/api/ticket/picture/";


  ticket! : TicketDto;
  issue_id! : string | null;

  zoom! : number;
  center! : Record<string, unknown>;
  options!: Record<string, unknown>;
  marker_position!: Record<string, unknown>;

  constructor(
    private router : Router,
    private http : HttpClient,
    private route : ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.ticket = new TicketDto();
    
    this.issue_id = this.route.snapshot.paramMap.get('id');
    this.getAllURL += this.issue_id;
    this.http.get<TicketDto[]>(this.getAllURL).subscribe(
      (data) => {
        console.log(data);
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
    await this.delay(3000)
    this.getPictureURL += this.ticket.ticketId;
    this.http.get<TicketPictureDto[]>(this.getPictureURL).subscribe(
      (data) => {
        console.log(data[0])
        this.ticket.ticketImg = data[0].pictureLink
    }
    );
  }

  reject() : void
  {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
    // this.router.navigateByUrl("/tickets");
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


