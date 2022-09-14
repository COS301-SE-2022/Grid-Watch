import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TechTeamProfileService, TicketService } from '@grid-watch/shared-ui';

interface Teams {
  "techTeam" : TechTeamDto,
  "tickets" : TicketDto[]
}

@Component({
  selector: 'grid-watch-tech-team-page',
  templateUrl: './tech-team-page.component.html',
  styleUrls: ['./tech-team-page.component.scss'],
})
export class TechTeamPageComponent implements OnInit {

  techTeams! : Teams [];
  ticketStatus! : string[];
  ticketImages! : string[];
  ticketDates! : string[];
  tickets! : TicketDto[];
  constructor(
    private techTeamService: TechTeamProfileService,
    private cdRef : ChangeDetectorRef,
    private ticketService : TicketService
  ) {}

  async ngOnInit(): Promise<void> {
    this.techTeams = [];
    this.ticketStatus = [];
    this.ticketImages = [];
    this.ticketDates = [];
    
    this.ticketService.getTickets().subscribe(
      (response) => 
      {
        this.tickets = response
        this.techTeamService.getAllTechTeams().subscribe(
          (response) =>{
            // this.techTeams = response;
            // console.log(this.techTeams[0]);
            response.forEach((techTeam) =>{
              const tempTeam = {
                "techTeam" : techTeam,
                "tickets" : [...this.tickets.filter((ticket) =>{
                  return (ticket.assignedTechTeam === techTeam.id)
                })]
              };
              console.log(tempTeam);
              
              this.techTeams.push(tempTeam);
            })
            this.initaliseTechTeams()
          }
        );
      }
    )


  }

  initaliseTechTeams() {
    this.cdRef.detectChanges();
    const ratingsElements = document.getElementsByClassName("techInfo stars");
    this.techTeams.forEach(
      (techTeam , index) =>{
        
        const stars = techTeam.techTeam.ratingOfJobs / 2; 
        let numberStars =  Math.round(stars*2)/2;;
        console.log(numberStars);
        
        for (let k = 1; k <= numberStars; k++) {
          // console.log(k);
          const span = document.createElement("span");
          span.classList.add("material-icons");
          span.innerHTML = "star_rate";
          ratingsElements[index].appendChild(span);
        }

        if (numberStars % 1 == 0.5)
        {
          const span = document.createElement("span");
          span.classList.add("material-icons");
          span.innerHTML = "star_half";
          ratingsElements[index].appendChild(span);
          numberStars++;
          
        }

        for (let k = 0; k < 5 - numberStars; k++) {
          // console.log(k);
          const span = document.createElement("span");
          span.classList.add("material-icons");
          span.innerHTML = "star_outline";
          ratingsElements[index].appendChild(span);
        }
    }) 
    console.log(ratingsElements);
    
  }

  goToTicket(id : string)
  {
    console.log("go to tickets");
    
  }

  IncreaseUpvote(id : number, i : number)
  {
    console.log("increase upvotes");
    
  }

  // async InitialiseTicket(data : TicketDto []) : Promise<void> 
  // {
  //   this.ticketImages = [];
  //   this.ticketStatus = [];
  //   for (let index = 0; index < data.length; index++) 
  //   {      
  //     // this.tickets.push(data[index]);
  //     const date = new Date(this.tickets[index]["ticketCreateDate"]);      
  //     const m = date.getUTCMonth() + 1;
  //     const y = date.getUTCFullYear();
  //     const d = date.getUTCDate();
  //     this.ticketDates.push(y + "/" + m + "/" + d);
  //     switch(this.tickets[index]["ticketType"])
  //     {
  //       case "Electricity Outage":
  //         this.ticketImages.push("assets/issue-brokenpower.svg");
  //         break;
  //       case "Water Outage":
  //         this.ticketImages.push("assets/issue-water.svg");
  //         break;
  //       case "Pothole":
  //         this.ticketImages.push("assets/issue-pothole.svg");
  //         break;
  //       case "Sinkhole":
  //         this.ticketImages.push("assets/issue-sinkhole.svg");
  //         break;
  //       case "Broken Traffic Light":
  //         this.ticketImages.push("assets/issue-brokenrobot.svg");
  //         break;
  //       case "Broken Street Light":
  //         this.ticketImages.push("assets/issue-brokenlight.svg");
  //         break;
  //       default:
  //         this.ticketImages.push("assets/issue-maintenance.svg");
  //         break;
  //     }

  //     switch(this.tickets[index]["ticketStatus"])
  //     {
  //       case "Created":
  //         this.ticketStatus.push("redText");
  //         break;
  //       case "Dispatched":
  //         this.ticketStatus.push("orangeText");
  //         break;
  //       case "In Progress":
  //         this.ticketStatus.push("yellowText");
  //         break;
  //       case "Closed":
  //         this.ticketStatus.push("greenText");
  //         break;
  //       default:
  //         this.ticketStatus.push("yellowText");
  //         break;
  //     }
  //     // this.ticketService.getImages(data[index].ticketId).subscribe
  //     // (
  //     //   (response) => 
  //     //   {
  //     //     if (response[response.length - 1])
  //     //       this.tickets[index].ticketImg = response[response.length - 1].pictureLink;
  //     //   }
  //     // );
  //     // const place_id = this.tickets[index].ticketLocation;
  //     // this.googleMapsService.getLocation(place_id).then(
  //     //   (response) => {
  //     //     this.tickets[index].ticketLocation = response;
  //     //   },
  //     //   (error) => {
  //     //     console.log(error);          
  //     //   }
  //     // );
  //   }
  //   // console.log(this.tickets);
  // }
}
