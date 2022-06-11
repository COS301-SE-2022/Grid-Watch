import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketPictureDto } from  "@grid-watch/api/ticket/api/shared/ticket-picture-dto";
import { TicketService } from '../../services/ticket.service';


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
  getPictureURL = "http://localhost:3333/api/ticket/picture/"
  upvoteURL = "http://localhost:3333/api/ticket/update/upvotes/"

  public name! : string;
  public surname! : string;
  public avatar! : string;
  tickets : Array<TicketDto> = [];

  constructor( private http: HttpClient,
              ticketService: TicketService) {

  }
  
  ngOnInit(): void {
    this.name = "John"
    this.surname = "Doe"
    this.avatar = "assets/user-solid.svg";

    this.http.get<TicketDto[]>(this.getAllURL).subscribe(
      (data) => {
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

    // console.log(data);
    // console.log(data.length);
  
    for (let index = 0; index < data.length; index++) 
    {
      // if (data[index].ticket_img)  
      this.tickets.push(data[index]);
      const temp =  this.getPictureURL;
      this.getPictureURL += this.tickets[index].ticket_id;
      this.http.get<TicketPictureDto[]>(this.getPictureURL).subscribe(
        (data) => {
          console.log(data)
          this.tickets[index].ticket_img = data[data.length - 1].picture_link;
      }
      );
      this.getPictureURL = temp;
    }
    // console.log(this.tickets);
  }

  

}
