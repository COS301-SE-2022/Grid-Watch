import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, PublicProfileService, SessionManagerService, TicketService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-my-tickets-list',
  templateUrl: './my-tickets-list.component.html',
  styleUrls: ['./my-tickets-list.component.scss'],
})
export class MyTicketsListComponent implements OnInit
{

  tickets!: TicketDto[];
  ticketImages: string[] = [];
  ticketDates: string[] = [];
  ticketStatus: string[] = [];
  
  avatar!: string;
  user!: UserDto;
  constructor(
    private ticketService: TicketService,
    private googleMapsService: GoogleMapsService,
    private router : Router,
    private sessionService : SessionManagerService,
    private profileService : PublicProfileService
  ) { }

  ngOnInit(): void
  {
    this.tickets = [];
    this.avatar = "assets/user-solid.svg"

    const loader = new Loader({
      apiKey: "AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE",
      version: "weekly",
      libraries: ["places","visualization"]
    });

    loader.load().then(() =>
    {
      this.ticketService.getTickets().subscribe(
        async (response) => {
          response = await response.filter((ticket) => {
            const userId = this.sessionService.getID();
            if (userId)
              return ticket.userId === parseInt(userId);
            else
              return false;
          });
          this.InitialiseTicket(response);
          this.initaliseLikes();
        }
      )
    }, (error) =>
    {
      console.log(error);
    });

  }

  initaliseLikes(){
    const userId = this.sessionService.getID() || "";
    this.profileService.getUser(userId).subscribe(
      (response) =>{
        this.user = response[0];
        console.log(response);
        this.user.ticketsUpvoted.forEach(
          (id)=>{
            const cardElement = document.getElementById(id.toString());
            console.log(cardElement);
            cardElement?.classList.add('liked');
          }
        )
      }
    )
  }


  async InitialiseTicket(data : TicketDto []) : Promise<void> 
  {
    for (let index = 0; index < data.length; index++) 
    {      
      this.tickets.push(data[index]);
      let temp = this.tickets[index].ticketStreetAddress.split(",")[0];
      if (this.tickets[index].ticketStreetAddress.split(",")[1] !== undefined)
        temp +="," +  this.tickets[index].ticketStreetAddress.split(",")[1];
      this.tickets[index].ticketStreetAddress = temp;
      const date = new Date(this.tickets[index]["ticketCreateDate"]);      
      const m = date.getUTCMonth() + 1;
      const y = date.getUTCFullYear();
      const d = date.getUTCDate();
      this.ticketDates.push(y + "/" + m + "/" + d);
      switch(this.tickets[index]["ticketType"])
      {
        case "Electricity Outage":
          this.ticketImages.push("assets/issue-brokenpower.svg");
          break;
        case "Water Outage":
          this.ticketImages.push("assets/issue-water.svg");
          break;
        case "Pothole":
          this.ticketImages.push("assets/issue-pothole.svg");
          break;
        case "Sinkhole":
          this.ticketImages.push("assets/issue-sinkhole.svg");
          break;
        case "Broken Traffic Light":
          this.ticketImages.push("assets/issue-brokenrobot.svg");
          break;
        case "Broken Street Light":
          this.ticketImages.push("assets/issue-brokenlight.svg");
          break;
        default:
          this.ticketImages.push("assets/issue-maintenance.svg");
          break;
      }

      switch(this.tickets[index]["ticketStatus"])
      {
        case "Created":
          this.ticketStatus.push("redText");
          break;
        case "Dispatched":
          this.ticketStatus.push("orangeText");
          break;
        case "In Progress":
          this.ticketStatus.push("yellowText");
          break;
        case "Closed":
          this.ticketStatus.push("greenText");
          break;
        default:
          this.ticketStatus.push("yellowText");
          break;
      }
      this.ticketService.getImages(data[index].ticketId).subscribe
      (
        (response) => 
        {
          if (response[response.length - 1])
            this.tickets[index].ticketImg = response[response.length - 1].pictureLink;
        }
      );
      const place_id = this.tickets[index].ticketLocation;
      this.googleMapsService.getLocation(place_id).then(
        (response) => {
          this.tickets[index].ticketLocation = response;
        },
        (error) => {
          console.log(error);          
        }
      );
    }
    // console.log(this.tickets);
  }
  
  
  goToTicket(id : string)
  {
    this.router.navigate(['/viewTicket', {id:id}]) ;
  }
}
