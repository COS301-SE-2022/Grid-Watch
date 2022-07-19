import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketService } from '@grid-watch/shared-ui';
import { GoogleMapsService } from '@grid-watch/shared-ui';
import { MatGridList } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';



@Component({
  selector: 'grid-watch-ticket-body',
  templateUrl: './ticket-body.component.html',
  styleUrls: ['./ticket-body.component.scss'],
})
export class TicketBodyComponent implements OnInit {

  public name! : string;
  public surname! : string;
  public avatar! : string;
  ticketImages : string[] = [];
  tickets : Array<TicketDto> = [];
  

  constructor( private http: HttpClient,
              private ticketService: TicketService,
              private googleMapsService: GoogleMapsService) {

  }
  
  ngOnInit(): void {
    this.name = "John"
    this.surname = "Doe"
    this.avatar = "assets/user-solid.svg";

    const loader = new Loader({
      apiKey: "AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE",
      version: "weekly",
      libraries: ["places"]
    });
    
    loader.load().then(() => {
        this.ticketService.getTickets().subscribe(
          (response) => {
            this.InitialiseTicket(response)
          }
        )      
      }, (error) =>{console.log(error);
      });

  }

  IncreaseUpvote(id : number, index: number): void
  {
    this.ticketService.increaseUpvotes(id, ++this.tickets[index].ticketUpvotes)
  }
    
  async InitialiseTicket(data : TicketDto []) : Promise<void> 
  {
    for (let index = 0; index < data.length; index++) 
    {      
      this.tickets.push(data[index]);
      
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
    console.log(this.tickets);
  }

  

}
