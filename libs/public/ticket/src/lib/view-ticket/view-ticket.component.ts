import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { PublicProfileService, TicketService } from '@grid-watch/shared-ui';
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
  user!: UserDto;
  userId!: string | null;
  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private profileService: PublicProfileService
  ) { }

  ngOnInit(): void
  {
    this.ticket = new TicketDto();
    this.user = new UserDto();
    this.user.id = -1;
    this.userId = localStorage.getItem("userId");
    const ticketID = this.route.snapshot.paramMap.get('id');
    if (ticketID)
    {
      this.ticketService.getTicket(ticketID).subscribe(
        async (response) =>
        {
          this.ticket = response[0];
          console.log(response);
          this.initialiseUser();
          this.initialiseImage();
          this.getSubtasks();
          if (this.user.email.includes("@gridwatch.com"))
          {
            this.user.name = "Guest";
          }
        }
      )
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
        console.log(this.user);
        console.log(this.userId);
      }
    )
  }

  private initialiseImage()
  {
    this.ticketService.getImages(this.ticket.ticketId).subscribe(
      (response) =>
      {
        if (response[0].pictureLink)
          this.ticket.ticketImg = response[0].pictureLink;
      }
    )
  }
}

