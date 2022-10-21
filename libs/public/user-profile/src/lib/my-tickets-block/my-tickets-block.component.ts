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
  skip = 0;
  take = 10;

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
      const userId = this.sessionService.getID() || "";
      this.ticketService.getUserTicket(userId, this.skip, this.take).subscribe(
        async (response) =>{
          this.skip += this.take
          this.tickets = response;
          this.getImage(response);

        }
      )
      }, (error) =>{console.log(error);
      });
      
  }

  getImage(data : TicketDto[])
  {
    data.forEach((ticket) =>{
      this.ticketService.getImages(ticket.ticketId).subscribe(
        (response) =>
        {
          if (response.length > 0)
            ticket.ticketImg = response[response.length -1].pictureLink;
          else
          {
            switch (ticket.ticketType) {
              case "Electricity Outage":
                ticket.ticketImg ="assets/issue-brokenpower.svg";
                break;
              case "Water Outage":
                ticket.ticketImg ="assets/issue-water.svg";
                break;
              case "Pothole":
                ticket.ticketImg ="assets/issue-pothole.svg";
                break;
              case "Sinkhole":
                ticket.ticketImg ="assets/issue-sinkhole.svg";
                break;
              case "Broken Traffic Light":
                ticket.ticketImg ="assets/issue-brokenrobot.svg";
                break;
              case "Broken Street Light":
                ticket.ticketImg ="assets/issue-brokenlight.svg";
                break;
              default:
                ticket.ticketImg ="assets/issue-maintenance.svg";
                break;
                  }
          }
        }
      );
    
    }
    )
    
  }
    
  goToTicket(id : string)
  {
    this.router.navigate(['/viewTicket', {id:id}]) ;
  }

  delete(id: string){
    console.log("deleting ticket " + id);
    this.ticketService.deleteTicket(id).subscribe((res)=>{
      console.log(res);
      
    })
    
  }

  onScroll(){
    console.log("arrived");
    const userId = this.sessionService.getID() || "";
    this.ticketService.getUserTicket(userId, this.skip, this.take).subscribe(
      async (response) =>{
        this.skip += this.take
        this.getImage(response);
        this.tickets = [...this.tickets, ...response];
      }
    )
    
  }
}
