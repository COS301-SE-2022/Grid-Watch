import { Component, OnInit } from '@angular/core';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketService } from '@grid-watch/shared-ui';
import { Router } from "@angular/router";

@Component({
  selector: 'grid-watch-dashboard-timeline',
  templateUrl: './dashboard-timeline.component.html',
  styleUrls: ['./dashboard-timeline.component.scss'],
})
export class DashboardTimelineComponent implements OnInit {

  tickets! : TicketDto [];
  constructor(
    private ticketService : TicketService,
    private router : Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.ticketService.getTickets().subscribe(
      (response) =>
      {
        // console.log(response);
        this.tickets = response;
      } 
    );
  }

  viewTicketDetails(id : number) : void
  {
    const url = '/adminViewTicketDetails';
    // console.log(id);
    this.router.navigate([url, { id: id }]);
  }
}
