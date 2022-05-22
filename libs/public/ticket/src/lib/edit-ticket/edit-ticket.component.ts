import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TicketDto } from 'libs/api/ticket/api/src/lib/dto/ticket.dto';

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
  @Input() description! : string;
  @Input() location! : string;
  @Input() city! : string;
  updateURL = "http://localhost:3333/api/ticket/update/";
  getTicketURL = "http://localhost:3333/api/ticket/";

  constructor(
      private route: ActivatedRoute, 
      private http : HttpClient,
      private router : Router) {
  }


  ngOnInit(): void {
    this.default_upload = "assets/upload-solid.svg"
    this.display_name = "John Doe";
    const temp = this.route.snapshot.paramMap.get('id');
    this.getTicketURL = this.getTicketURL + temp
    this.updateURL = this.updateURL + temp
    console.log(this.getTicketURL);

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
    const ticket = new TicketDto();
    ticket.ticket_location = this.location;
    ticket.ticket_city = this.city;
    ticket.ticket_description = this.description;
    if (this.issue_type === "Other")
      ticket.ticket_type = this.other_details;
    else
      ticket.ticket_type = this.issue_type;
    ticket.ticket_status = "Created";
    ticket.ticket_create_date = new Date();
    ticket.ticket_upvotes = 0;

    console.log("issue_type: " + this.issue_type);
    console.log("description : " + this.description);
    console.log("location: " + this.location);
    console.log("city: " + this.city);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    this.http.put<TicketDto>(this.updateURL, ticket, httpOptions).subscribe(
      (data) => {
        console.log("success!");
        
        console.log(data);
        this.router.navigateByUrl("/tickets")
      }
    )
  }

  initialiseFields(data : TicketDto)
  {
    console.log(data);
    
    if ((data.ticket_type === "Pothole") || (data.ticket_type === "Water Outage") ||
        (data.ticket_type === "Sinkhole")  || (data.ticket_type === "Electricity Outage") ) 
          this.issue_type = data.ticket_type;
    else
    {
      this.issue_type = "Other"
      this.other_details = data.ticket_type;
    }

    this.description = data.ticket_description;
    this.location = data.ticket_location;
    this.city = data.ticket_city;

    if (data.ticket_type === "Pothole")
        this.default_upload = "assets/pothole_example.jpg"
      else if (data.ticket_type === "Water Outage")
        this.default_upload = "assets/Water_example.jpg";
      else if (data.ticket_type === "Sinkhole")
        this.default_upload = "assets/sinkhole_example.jpg";
      else if (data.ticket_type === "Electricity Outage")
        this.default_upload = "assets/electricity_example.jpg";
  }
}
