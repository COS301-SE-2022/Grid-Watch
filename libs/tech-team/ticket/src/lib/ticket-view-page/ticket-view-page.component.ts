import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-ticket-view-page',
  templateUrl: './ticket-view-page.component.html',
  styleUrls: ['./ticket-view-page.component.scss'],
})
export class TicketViewPageComponent implements OnInit {
  getAllURL = 'http://localhost:3333/api/ticket/all/tickets/dispatched';
  tickets: Array<TicketDto> = [];

  constructor(private router: Router, 
              private http: HttpClient,
              private ticketService : TicketService,
              private googleMapsService : GoogleMapsService,) {}

  ngOnInit(): void {
    // this.http.get<TicketDto[]>(this.getAllURL).subscribe((data) => {
    //   // console.log(data);
    //   this.initialiseTicket(data);
    // });
    this.ticketService.getTickets().subscribe(
      (response) =>{
        this.initialiseTicket(response);
      })
  }

  viewTicket(id: number): void {
    // console.log("GO to ticket view admin");
    const url = '/ticketDetails';
    // console.log(url);
    this.router.navigate([url, { id: id }]);
  }

  initialiseTicket(data: TicketDto[]): void {
    for (let index = 0; index < data.length; index++) {
      this.tickets.push(data[index]);
      this.tickets[index].ticketCreateDate = new Date(
        this.tickets[index].ticketCreateDate
      );
    }
    console.log(this.tickets);
  }
}
