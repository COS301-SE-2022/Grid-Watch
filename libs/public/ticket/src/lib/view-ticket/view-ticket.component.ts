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
export class ViewTicketComponent implements OnInit {

  ticket! : TicketDto;
  user! : UserDto;
  userId! : string | null;
  constructor(
    private ticketService : TicketService,
    private route : ActivatedRoute,
    private profileService : PublicProfileService
  ) {}

  ngOnInit(): void {
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
          // console.log(response);
          this.initialiseUser();
          this.initialiseImage();
        }
      )
    }
  }

  private initialiseUser() {
    this.profileService.getUser(this.ticket.userId.toString()).subscribe(
      (response) =>
      {
        this.user = response[0];
        console.log(this.user);
        console.log(this.userId);
        
      }
    )
  }

  private initialiseImage() {
    this.ticketService.getImages(this.ticket.userId).subscribe(
      (response) =>
      {
        console.log(response);
        if (response)
          this.ticket.ticketImg = response[0].pictureLink;
      }
    )
  }
}
