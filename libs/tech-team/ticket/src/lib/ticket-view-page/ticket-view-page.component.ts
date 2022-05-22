import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/ticketDto';

@Component({
  selector: 'grid-watch-ticket-view-page',
  templateUrl: './ticket-view-page.component.html',
  styleUrls: ['./ticket-view-page.component.scss'],
})
export class TicketViewPageComponent implements OnInit {
  
  getAllURL = "http://localhost:3333/api/ticket/all/tickets/dispatched"
  tickets : Array<TicketDto> = [];

  constructor(private router : Router, private http: HttpClient) {}

  ngOnInit(): void {
    
      this.http.get<TicketDto[]>(this.getAllURL).subscribe(
        (data) => {
          // console.log(data);
          this.initialiseTicket(data);
      }
      );
  }

  viewTicket(id : number) : void {
    console.log("GO to ticket view admin");
    // const url = "/adminViewTicketDetails";
    // console.log(url);
    // this.router.navigate([url, {"id":id}]);
  }

  
  initialiseTicket(data : TicketDto []) : void 
  {
    for (let index = 0; index < data.length; index++) 
    {
      this.tickets.push(data[index]);
    }
    console.log(this.tickets);
  }
}
