import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PublicProfileService, SessionManagerService, TicketService } from '@grid-watch/shared-ui';
import { id } from '@swimlane/ngx-charts';

@Component({
  selector: 'grid-watch-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss'],
})
export class ViewTicketComponent implements OnInit
{

  subtaskDescriptions: string[] = [];
  subtaskSteps: string[] = [];
  subtaskStatus: string[] = [];
  ticket!: TicketDto;
  ticketID! : string;
  user!: UserDto;
  userId!: string | null;
  loggedUser!: UserDto;
  ticketStatus!: string;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private profileService: PublicProfileService,
    private sessionService: SessionManagerService
  ) { }

  ngOnInit(): void
  {
    this.ticket = new TicketDto();
    this.user = new UserDto();
    this.user.id = -1;
    this.userId = this.sessionService.getID();
    this.ticketID = this.route.snapshot.paramMap.get('id') || "";
    if (this.ticketID)
    {
      this.ticketService.getTicket(this.ticketID).subscribe(
        async (response) =>
        {
          this.ticket = response[0];
          // console.log(response);
          this.intialiseTicket();
          this.initialiseUser();
          this.initialiseImage();
          this.getSubtasks();
        }
      )
    }
  }

  private intialiseTicket(){
    switch (this.ticket.ticketStatus) {
      case 'Created':
        this.ticketStatus = 'redText';
        break;
      case 'Dispatched':
        this.ticketStatus = 'orangeText';
        break;
      case 'In Progress':
        this.ticketStatus = 'yellowText';
        break;
      case 'Closed':
        this.ticketStatus = 'greenText';
        break;
      default:
        this.ticketStatus = 'yellowText';
        break;
    }
  }

  private getSubtasks(): void
  {
    this.ticketService.getTicketSubtasks(this.ticket.ticketId).subscribe
      (
        (response) =>
        {
          for (let i = 0; i < response.length; i++)
          {
            this.subtaskDescriptions.push(response[i]["taskDescription"]);
            this.subtaskStatus.push(response[i]["taskStatus"]);
            this.subtaskSteps.push(response[i]["taskStep"]);
          }
          if (response.length === 0)
          {
            document.getElementById("issue-container")?.classList.add("hidden");
          }

        }
      );
  }

  private initialiseUser()
  {
    this.profileService.getUser(this.ticket.userId.toString()).subscribe(
      (response) =>
      {
        this.user = response[0];
        // console.log(this.ticketID);
        if (this.userId)
        {
          this.profileService.getUser(this.userId).subscribe(
            (response) =>
            {
              this.loggedUser = response[0];
              if (this.loggedUser.ticketsUpvoted.includes(parseInt(this.ticketID)))
              {
                const element = document.getElementById("upvotesContainer");
                // console.log(element);
                element?.classList.add("liked")
              }
            }
          )
        }
      }
    )
  }

  private initialiseImage()
  {
    this.ticketService.getImages(this.ticket.ticketId).subscribe(
      (response) =>
      {
        if (response[response.length - 1].pictureLink)
          this.ticket.ticketImg = response[response.length - 1].pictureLink;
      }
    )
  }

  increaseUpvotes(id : number) : void{
    if (!this.loggedUser.ticketsUpvoted.includes(id))
    {
      this.loggedUser.ticketsUpvoted.push(this.ticket.ticketId)
      this.ticketService.increaseUpvotes(id, ++this.ticket.ticketUpvotes, this.loggedUser.id.toString())
      const card = document.getElementById("upvotesContainer");
      // console.log(card);
      card?.classList.add("liked")
      
    }
    
  }
}

