import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { TicketController } from 'libs/api/ticket/api/src/lib/controllers/api-ticket-api-controller.controller';
import { TicketDto } from 'libs/api/ticket/api/src/lib/dto/ticket.dto';
import { Ticket } from '@prisma/client';
import { Router } from '@angular/router';


@Component({
  selector: 'grid-watch-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent{

  @Input() issue_type! : string;
  @Input() description! : string;
  @Input() address! : string;
  @Input() city! : string;

  default_upload! : string;
  createTicketURL = "http://localhost:3333/api/ticket/create";
  

  constructor(private http : HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.default_upload = "assets/upload-solid.svg";
  }

  fileUploaded(e: any)
  {

    const file = e.target.files[0];


    const reader = new FileReader();
    reader.onload = () => {
      this.default_upload = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  createTicket() : void
  {
    const ticket = new TicketDto();
    ticket.ticket_location = this.address;
    ticket.ticket_city = this.city;
    ticket.ticket_description = this.description;
    ticket.ticket_type = this.issue_type;
    ticket.ticket_status = "Created";
    ticket.ticket_create_date = new Date();
    ticket.ticket_upvotes = 0;
    console.log("location: " + ticket.ticket_location);
    console.log("city: " + ticket.ticket_city);
    console.log("description: " + ticket.ticket_description);
    console.log("issue type: " + ticket.ticket_type);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    this.http.post<TicketDto>(this.createTicketURL, ticket, httpOptions)
    .subscribe({
      next: data => {
          console.log(data);
          this.router.navigateByUrl("/tickets");
      },
      error: error => {
          console.error('There was an error!', error);
      }

  })
    
  }

  // openDialog()
  // {
  //   const dialogRef = this.dialog.open(DiscardTicketComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog rsult: ${result}`)
  //   });
  // }
}
