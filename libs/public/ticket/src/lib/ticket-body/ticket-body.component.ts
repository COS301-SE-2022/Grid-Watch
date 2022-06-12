import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketPictureDto } from  "@grid-watch/api/ticket/api/shared/ticket-picture-dto";
import { TicketService } from '@grid-watch/shared-ui';
import { GoogleMapsService } from '@grid-watch/shared-ui';


@Component({
  selector: 'grid-watch-ticket-body',
  templateUrl: './ticket-body.component.html',
  styleUrls: ['./ticket-body.component.scss'],
})
export class TicketBodyComponent implements OnInit {

  public name! : string;
  public surname! : string;
  public avatar! : string;
  tickets : Array<TicketDto> = [];

  constructor( private http: HttpClient,
              private ticketService: TicketService,
              private googleMapsService: GoogleMapsService) {

  }
  
  ngOnInit(): void {
    this.name = "John"
    this.surname = "Doe"
    this.avatar = "assets/user-solid.svg";

    this.ticketService.getTickets().subscribe(
      (response) => {
        this.InitialiseTicket(response)
      }
    )
  }

  IncreaseUpvote(id : number, index: number): void
  {
    this.ticketService.increaseUpvotes(id, ++this.tickets[index].ticket_upvotes)
  }
    
  async InitialiseTicket(data : TicketDto []) : Promise<void> 
  {
    for (let index = 0; index < data.length; index++) 
    {
      this.tickets.push(data[index]);
      this.ticketService.getImages(data[index].ticket_id).subscribe(
        (response) => {
          console.log(response);
          if (response[response.length - 1])
            this.tickets[index].ticket_img = response[response.length - 1].picture_link;
        }
      );
      const place_id = this.tickets[index].ticket_location;
      this.googleMapsService.getLocation(place_id).then(
        (response) => {
          this.tickets[index].ticket_location = response;
        },
        (error) => {
          console.log(error);
          
        }
      );
    }
    console.log(this.tickets);
  }

  

}
