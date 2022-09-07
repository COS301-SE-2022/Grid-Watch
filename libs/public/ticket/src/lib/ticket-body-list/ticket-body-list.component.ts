import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketService, GoogleMapsService, SessionManagerService, PublicProfileService } from '@grid-watch/shared-ui';

interface filterInterface{
    city : string[], 
    type : string[], 
    month : string[]
}

@Component({
  selector: 'grid-watch-ticket-body-list',
  templateUrl: './ticket-body-list.component.html',
  styleUrls: ['./ticket-body-list.component.scss'],
})
export class TicketBodyListComponent implements OnInit {

  ticketDates : string[] = [];
  ticketImages : string[] = [];
  ticketStatus: string[] = [];
  tickets : Array<TicketDto> = [];
  ticketsPerm : Array<TicketDto> = [];
  type! : string
  filterLabels: filterInterface[] = [];
  sortLabels: string[] = [];
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  filterList: string[] = []
  sortDirection!: "asc" | "desc";
  id! : string;
  user! : UserDto;
  
  

  constructor( private http: HttpClient,
              private ticketService: TicketService,
              private googleMapsService: GoogleMapsService,
              private router : Router,
              private sessionService: SessionManagerService,
              private userService : PublicProfileService) {

  }
  
  ngOnInit(): void {
    this.sortDirection = "asc"

    const loader = new Loader({
      apiKey: "AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE",
      version: "weekly",
      libraries: ["places","visualization"]
    });
    
    loader.load().then(() => {
        this.ticketService.getTickets().subscribe(
          async (response) => {
            this.tickets = response;
            this.InitialiseTicket(response);
            this.ticketsPerm = response;
            this.loadFilterLabels();
            this.loadSortLabels();
            this.id = this.sessionService.getID() || "";
            this.userService.getUser(this.id).subscribe(
              (response) =>{
                this.user = response[0];
                this.initialiseUpvotes();
              }
            )
          }
          )      
        }, (error) =>{console.log(error);
        });

  }

  initialiseUpvotes() {
    console.log(this.user);
    this.user.ticketsUpvoted.forEach((id) =>{
      const cardElement = document.getElementById(id.toString());
      cardElement?.classList.add("liked");
      
    })
    
  }

  loadSortLabels() {
    this.sortLabels.push("Issue")
    this.sortLabels.push("City")
    this.sortLabels.push("Upvotes")
    this.sortLabels.push("Date")
  }

  loadFilterLabels() {
    const cities: string[] = [];
    const types: string[] = [];
    const months: string[] = []; 
    this.tickets.forEach(
      (ticket) =>{
        if (!cities.includes(ticket.ticketCity))
        {
          cities.push(ticket.ticketCity);
        }
        if (!types.includes(ticket.ticketType))
        {
          types.push(ticket.ticketType);
        }
        const date = new Date(ticket.ticketCreateDate);
        const dateString = this.months[date.getMonth()];
         if (!months.includes(dateString))
        {
          months.push(dateString);
        }
        // console.log(date.toDateString());
        
      })
      const tempFilter = {
        city : cities,
        type : types,
        month : months,
      }
      this.filterLabels.push(tempFilter);
  }

  IncreaseUpvote(id : number, index: number): void
  {
    if (!this.user.ticketsUpvoted.includes(id))
    {
      this.user.ticketsUpvoted.push(this.tickets[index].ticketId)
      this.ticketService.increaseUpvotes(id, ++this.tickets[index].ticketUpvotes, this.id)
      const card = document.getElementById(id.toString());
      console.log(card);
      card?.classList.add("liked")
      
    }
  }
    
  async InitialiseTicket(data : TicketDto []) : Promise<void> 
  {
    this.ticketImages = [];
    this.ticketStatus = [];
    for (let index = 0; index < data.length; index++) 
    {      
      // this.tickets.push(data[index]);
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
      // this.ticketService.getImages(data[index].ticketId).subscribe
      // (
      //   (response) => 
      //   {
      //     if (response[response.length - 1])
      //       this.tickets[index].ticketImg = response[response.length - 1].pictureLink;
      //   }
      // );
      // const place_id = this.tickets[index].ticketLocation;
      // this.googleMapsService.getLocation(place_id).then(
      //   (response) => {
      //     this.tickets[index].ticketLocation = response;
      //   },
      //   (error) => {
      //     console.log(error);          
      //   }
      // );
    }
    // console.log(this.tickets);
  }

  goToTicket(id : string)
  {
    this.router.navigate(['/viewTicket', {id:id}]) ;
  }

  filter(search : string) : void{
    this.tickets = this.ticketsPerm;
    if (!this.filterList.includes(search)){
      this.filterList.push(search);
    }
    else{
      this.filterList.splice(this.filterList.indexOf(search), 1)
    }

    if (this.filterList.length == 0)
    {
      this.tickets = this.ticketsPerm
    }

    this.filterList.forEach((filter) =>{
      this.tickets = (this.tickets.filter((ticket) =>{
        return (
          ticket.ticketCity == filter ||
          this.months[new Date(ticket.ticketCreateDate).getMonth()] == filter ||
          ticket.ticketType == filter
        )
      }))
      // this.tickets = [...this.tickets ,...tempTickets]
    })
    
    this.InitialiseTicket(this.tickets);
  }

  sort(sortType : string) : void {
    // this.sortLabels.push("Issue Type")
    // this.sortLabels.push("City")
    // this.sortLabels.push("Upvotes")
    // this.sortLabels.push("Date")
    this.tickets = this.ticketService.sort(sortType, this.sortDirection, this.tickets)
    
  }

}
