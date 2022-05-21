import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TicketDto } from 'libs/api/ticket/api/src/lib/dto/ticket.dto';

@Component({
  selector: 'grid-watch-ticket-body',
  templateUrl: './ticket-body.component.html',
  styleUrls: ['./ticket-body.component.scss'],
})
export class TicketBodyComponent implements OnInit {

  public name : string;
  public surname : string;
  public issue_type : string;
  public avatar : string;
  public issue_img : string;
  public upvotes : number;
  getAllURL = "http://localhost:3333/api/ticket/all/tickets"
  tickets : Array<TicketDto> = [];
  imgs : Array<string> = [];

  constructor( private http: HttpClient) {
    this.name = "";
    this.surname = "";
    this.issue_type = "";
    this.avatar = "";
    this.issue_img = "";
    this.upvotes = 0;
  }
  
  ngOnInit(): void {
    this.name = "John"
    this.surname = "Doe"
    this.issue_type = "Pothole"
    this.avatar = "assets/user-solid.svg";
    this.issue_img = "assets/pothole_example.jpg";
    this.upvotes = 0;

    this.http.get<TicketDto[]>(this.getAllURL).subscribe(
      (data) => {
        // console.log(data);
        this.InitialiseTicket(data);
    }
    );
  }

  IncreaseUpvote(): void
  {
    this.upvotes++;
  }

  InitialiseTicket(data : TicketDto []) : void 
  {
    for (let index = 0; index < data.length; index++) 
    {
      if (data[index].ticket_type === "Pothole")
        this.imgs.push("assets/pothole_example.jpg");
      else if (data[index].ticket_type === "Water Outage")
        this.imgs.push("assets/Water_example.jpg");
      else if (data[index].ticket_type === "Sinkhole")
        this.imgs.push("assets/sinkhole_example.jpg");
      else if (data[index].ticket_type === "Electricity Outage")
        this.imgs.push("assets/electricity_example.jpg");
      else
        this.imgs.push("assets/solid_example.png");
      
      this.tickets.push(data[index]);
    }
    console.log(this.tickets);
  }
  

}
