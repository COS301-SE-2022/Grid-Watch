import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-my-tickets-list',
  templateUrl: './my-tickets-list.component.html',
  styleUrls: ['./my-tickets-list.component.scss'],
})
export class MyTicketsListComponent implements OnInit {

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
          this.initialiseTickets()
        }
      )
      
      }, (error) =>{console.log(error);
      });
    
  }

  async initialiseTickets() : Promise<void> {
    for (let k = 0; k < this.tickets.length; k++) {
      this.tickets[k].ticketLocation = await this.googleMapsService.getLocation(this.tickets[k].ticketLocation);
      this.ticketService.getImages(this.tickets[k].ticketId).subscribe(
        (response) => {
          this.tickets[k].ticketImg = response[0].pictureLink
        }
        );
    }
  }
}
