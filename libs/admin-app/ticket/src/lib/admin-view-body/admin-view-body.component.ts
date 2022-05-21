import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '@prisma/client';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TicketDto } from 'libs/api/ticket/api/src/lib/dto/ticket.dto';

@Component({
  selector: 'grid-watch-admin-view-body',
  templateUrl: './admin-view-body.component.html',
  styleUrls: ['./admin-view-body.component.scss'],
})
export class AdminViewBodyComponent implements OnInit {

  getAllURL = "http://localhost:3333/api/ticket/all/tickets"
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
    const url = "/adminViewTicketDetails";
    console.log(url);
    this.router.navigate([url, {"id":id}]);
  }

  
  initialiseTicket(data : TicketDto []) : void 
  {
    for (let index = 0; index < 5; index++) 
    {
      this.tickets.push(data[index]);
    }
    console.log(this.tickets);
  }
}
