import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '@prisma/client';
import { TicketDto } from 'libs/api/ticket/api/src/lib/dto/ticket.dto';

@Component({
  selector: 'grid-watch-admin-view-body',
  templateUrl: './admin-view-body.component.html',
  styleUrls: ['./admin-view-body.component.scss'],
})
export class AdminViewBodyComponent implements OnInit {

  getAllURL = "http://localhost:3333/api/ticket/tickets/all"
  tickets : Array<TicketDto> = [];

  constructor(private router : Router, private http: HttpClient) {}

  ngOnInit(): void {
    console.log(
      this.http.get<TicketDto[]>(this.getAllURL).subscribe(
        (data) => {
          // console.log(data);
          this.InitialiseTicket(data);
      }
      ));
  }

  viewTicket() : void {
    console.log("GO to ticket view admin");
    this.router.navigateByUrl("/adminViewTicketDetails");
  }

  
  InitialiseTicket(data : TicketDto []) : void 
  {
    for (let index = 0; index < data.length; index++) 
    {
      this.tickets.push(data[index]);
    }
    console.log(this.tickets);
  }
}
