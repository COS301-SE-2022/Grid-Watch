import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TechTeamProfileService, TicketService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-tech-team-profile',
  templateUrl: './tech-team-profile.component.html',
  styleUrls: ['./tech-team-profile.component.scss'],
})
export class TechTeamProfileComponent implements OnInit {
  techTeam! : TechTeamDto
  tickets! : TicketDto[];
  ticketDates: any;
  ticketImages!: string [];
  ticketStatus: any;
  googleMapsService: any;
  logged!: string | null;
  id!: string | null;
  constructor(
    private profileService : TechTeamProfileService,
    private ticketService : TicketService,
    private router : Router) {}

  ngOnInit(): void {
    this.ticketImages = [];
    this.ticketStatus = [];
    this.ticketDates = [];
    this.techTeam = new TechTeamDto();
    this.tickets = [];
    this.logged = localStorage.getItem("loggedIn")
    if (this.logged === null)
      this.router.navigateByUrl("/login");
    this.id = localStorage.getItem("techTeamID")
    if (this.id)
    this.profileService.getTechTeamID(this.id).subscribe(
      async (response) =>
      {
        console.log(response);
        this.techTeam = response[0];
        this.ticketService.getTickets().subscribe(
        (response) => {
          console.log(response);
          
          this.initialiseTicket(response);
        }
        )
      }
    )
  }

  async initialiseTicket(data : TicketDto []) : Promise<void> 
  {

    data = data.filter((ticket: TicketDto) =>
    {
      if (this.id && ticket.assignedTechTeam)
        return (ticket.assignedTechTeam.toString() === this.id)
      else
        return false;
    })

    for (let index = 0; index < data.length; index++) 
    {      
      this.tickets.push(data[index]);
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
      
    }
  }

  logout()
  {
    console.log("logout");
    
  }

  goToTicket(id : string)
  {
    this.router.navigate(['/editTicketDetails', {id:id}]) ;
  }

  IncreaseUpvote(id : number, index: number): void
  {
    this.ticketService.increaseUpvotes(id, ++this.tickets[index].ticketUpvotes)
  }
}
