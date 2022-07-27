import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-my-tickets-block',
  templateUrl: './my-tickets-block.component.html',
  styleUrls: ['./my-tickets-block.component.scss'],
})
export class MyTicketsBlockComponent implements OnInit {

  tickets!: TicketDto[];
  avatar! : string;
  constructor(
    private ticketService: TicketService,
    private googleMapsService: GoogleMapsService
  ) {}

  ngOnInit(): void {
    this.tickets = [];
    this.avatar = "assets/user-solid.svg"

    const loader = new Loader({
      apiKey: "AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE",
      version: "weekly",
      libraries: ["places"]
    });
    
    loader.load().then(() => {
      this.ticketService.getTickets().subscribe(
        (response) => {
          this.tickets = response;
          this.tickets = this.tickets.filter((ticket) => {
            const userId = localStorage.getItem("userId");
            if (userId)
              return ticket.userId === parseInt(userId);
            else
              return false;
          });
        }
      )
      
      }, (error) =>{console.log(error);
      });
    
  }
}
