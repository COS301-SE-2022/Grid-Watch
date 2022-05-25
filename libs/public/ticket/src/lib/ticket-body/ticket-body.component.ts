import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TicketDto } from '@grid-watch/api/ticket/ticketDto';


@Component({
  selector: 'grid-watch-ticket-body',
  templateUrl: './ticket-body.component.html',
  styleUrls: ['./ticket-body.component.scss'],
})
export class TicketBodyComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  getAllURL = "http://localhost:3333/api/ticket/all/tickets"
  upvoteURL = "http://localhost:3333/api/ticket/update/upvotes/"

  public name : string;
  public surname : string;
  public avatar : string;
  public issue_img : string;
  tickets : Array<TicketDto> = [];
  imgs : Array<string> = [];

  constructor( private http: HttpClient) {
    this.name = "";
    this.surname = "";
    this.avatar = "";
    this.issue_img = "";
  }
  
  ngOnInit(): void {
    this.name = "John"
    this.surname = "Doe"
    this.avatar = "assets/user-solid.svg";
    this.issue_img = "assets/pothole_example.jpg";

    this.http.get<TicketDto[]>(this.getAllURL).subscribe(
      (data) => {
        // console.log(data);
        this.InitialiseTicket(data);
    }
    );
  }

  IncreaseUpvote(id : number, index: number): void
  {
    this.tickets[index].ticket_upvotes++;
    const tempURL = this.upvoteURL;
    this.upvoteURL += id;
    const temp = '{"upvotes": ' + this.tickets[index].ticket_upvotes + '}';
    this.http.put<JSON>(this.upvoteURL, JSON.parse(temp) ,this.httpOptions).subscribe(
      (data) => {
        console.log(data);
      }
      );
    this.upvoteURL = tempURL;
  }
  

  InitialiseTicket(data : TicketDto []) : void 
  {
    for (let index = 0; index < data.length; index++) 
    {
      if (data[index].ticket_img)  
      this.tickets.push(data[index]);
    }
    console.log(this.tickets);
  }
  

}
