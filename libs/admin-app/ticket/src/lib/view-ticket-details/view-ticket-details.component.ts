import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { createDecipheriv } from 'crypto';
import { TicketDto } from 'libs/api/ticket/api/src/lib/dto/ticket.dto';

@Component({
  selector: 'grid-watch-view-ticket-details',
  templateUrl: './view-ticket-details.component.html',
  styleUrls: ['./view-ticket-details.component.scss'],
})
export class ViewTicketDetailsComponent implements OnInit {

  issue_id! : string | undefined;
  status! : string;
  date_created! : string;
  date_closed! : string;
  ticket_type! : string;
  ticket_city! : string;
  ticket_location! : string;
  ticket_description! : string;
  ticket_repair_time! : number;
  ticket_upvotes! : number;
  default_upload! : string;
  getTicketURL = "http://localhost:3333/api/ticket/";


  constructor(private http : HttpClient, private route: ActivatedRoute) {

    // this.default_upload = "assets/pothole_example.jpg"
  }

  ngOnInit(): void {

    

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
        // console.log(data[0]);
        this.InitialiseTicket(data[0]);
    }
    );
    
  }

  InitialiseTicket(data: TicketDto) {
    console.log(data);
    
    this.status = data.ticket_status;

    let temp = formatDate(data.ticket_create_date, 'yyyy-MM-dd', 'en-US');;
    
    this.date_created = temp;
    if (data.ticket_close_date != null)
      temp = formatDate(data.ticket_close_date, 'yyyy-MM-dd', 'en-US');
    else
      temp = "";
    
    this.date_closed = temp;
    this.ticket_type = data.ticket_type;
    this.ticket_city = data.ticket_city;
    this.ticket_location = data.ticket_location;
    this.ticket_description = data.ticket_description;
    this.ticket_repair_time = data.ticket_repair_time;
    this.ticket_repair_time = data.ticket_repair_time;
    this.ticket_upvotes = data.ticket_upvotes;

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
