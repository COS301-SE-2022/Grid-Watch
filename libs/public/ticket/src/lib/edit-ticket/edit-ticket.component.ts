import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/ticketDto';

@Component({
  selector: 'grid-watch-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
})
export class EditTicketComponent implements OnInit {

  display_name! : string | null;
  default_upload! : string | null;
  @Input() issue_type! : string;
  @Input() other_details! : string;


  @Input() ticket! : TicketDto;
  updateURL = "http://localhost:3333/api/ticket/update/";
  getTicketURL = "http://localhost:3333/api/ticket/";

  constructor(
      private route: ActivatedRoute, 
      private http : HttpClient,
      private router : Router) {
  }


  ngOnInit(): void {
    this.ticket = new TicketDto();
    this.default_upload = "assets/upload-solid.svg"
    this.display_name = "John Doe";
    const temp = this.route.snapshot.paramMap.get('id');
    this.getTicketURL = this.getTicketURL + temp
    this.updateURL = this.updateURL + temp

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    this.http.get<TicketDto[]>(this.getTicketURL, httpOptions).subscribe(
      (data) =>
      {
        console.log(data[0]);
        this.initialiseFields(data[0]);
        this.ticket = data[0];
      }
    )
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

  editTicket() : void
  {
    if (this.issue_type === "Other")
      this.ticket.ticket_type = this.other_details;
    else
      this.ticket.ticket_type = this.issue_type;
    this.ticket.ticket_status = "Created";
    this.ticket.ticket_create_date = new Date();
    this.ticket.ticket_upvotes = 0;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    this.http.put<TicketDto>(this.updateURL, this.ticket, httpOptions).subscribe(
      (data) => {
        console.log("success!");
        
        console.log(data);
        this.router.navigateByUrl("/tickets")
      }
    )
  }

  initialiseFields(data : TicketDto)
  {
    
    if ((data.ticket_type === "Pothole") || (data.ticket_type === "Water Outage") ||
        (data.ticket_type === "Sinkhole")  || (data.ticket_type === "Electricity Outage") ) 
          this.issue_type = data.ticket_type;
    else
    {
      this.issue_type = "Other"
      this.other_details = data.ticket_type;
    }
  }
}
