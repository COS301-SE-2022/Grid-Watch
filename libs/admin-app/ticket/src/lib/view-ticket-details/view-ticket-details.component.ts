import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';

@Component({
  selector: 'grid-watch-view-ticket-details',
  templateUrl: './view-ticket-details.component.html',
  styleUrls: ['./view-ticket-details.component.scss'],
})
export class ViewTicketDetailsComponent implements OnInit {

  issue_id! : string | undefined;
  default_upload! : string;
  ticket: TicketDto = new TicketDto();
  date_created! : string;
  getTicketURL = "http://localhost:3333/api/ticket/";
  UpdateStatusURL = "http://localhost:3333/api/ticket/update/status/";
  getPictureURL = "http://localhost:3333/api/ticket/picture/";

  constructor(private http : HttpClient, 
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {

    
    this.ticket.ticket_img = "image-solid.svg";
    const temp = this.route.snapshot.paramMap.get('id');
    this.issue_id = temp?.toString();
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    this.getTicketURL = this.getTicketURL + temp;
    // console.log(this.getTicketURL);
    this.http.get<TicketDto[]>(this.getTicketURL, httpOptions).subscribe(
      (data) => {
        this.ticket = data[0];
        // console.log(data[0]);
        this.initialiseTicket(data[0]);
    }
    );
    
  }

  initialiseTicket(data: TicketDto) {
    
    let temp = formatDate(data.ticket_create_date, 'yyyy-MM-dd', 'en-US');;
    
    this.date_created = temp;
    if (data.ticket_close_date != null)
      temp = formatDate(data.ticket_close_date, 'yyyy-MM-dd', 'en-US');
    else
      temp = "";

      this.getPictureURL += data.ticket_id;
      this.http.get<TicketPictureDto[]>(this.getPictureURL).subscribe(
        (data) => {
          console.log(data[0])
          this.ticket.ticket_img = data[0].picture_link
      }
      );
        
  }

  back() : void
  {
    this.router.navigateByUrl("/tickets")
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
  }
  showErrorMessage() : void {
    alert("Error Dispathing Ticket");
  }
  
  showSuccessMessage() : void 
  {
    alert("Successfully Dispatched Ticket");
  }
}
