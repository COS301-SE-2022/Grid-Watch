import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, SessionManagerService, TicketService } from '@grid-watch/shared-ui';

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
    private googleMapsService: GoogleMapsService,
    private router : Router,
    private sessionService : SessionManagerService
  ) {}

  ngOnInit(): void {
    this.tickets = [];
    this.avatar = "assets/user-solid.svg"

    const loader = new Loader({
      apiKey: "AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE",
      version: "weekly",
      libraries: ["places","visualization"]
    });
    
    loader.load().then(() => {
      this.ticketService.getTickets().subscribe(
        (response) => {
          this.tickets = response;
          this.getImage();
          this.tickets = this.tickets.filter((ticket) => {
            const userId = this.sessionService.getID();
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

  getImage()
  {
    for(let i = 0; i < this.tickets.length; i++)
    {
      this.ticketService.getImages(this.tickets[i].ticketId).subscribe(
        (response) =>
        {
          this.tickets[i].ticketImg = response[0].pictureLink;
        }
      );
    }
    
  }
    
  goToTicket(id : string)
  {
    this.router.navigate(['/viewTicket', {id:id}]) ;
  }
}
