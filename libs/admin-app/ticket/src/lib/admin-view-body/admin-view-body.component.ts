import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/ticketDto';
import { Ticket } from '@prisma/client';
import { LOADIPHLPAPI } from 'dns';

@Component({
  selector: 'grid-watch-admin-view-body',
  templateUrl: './admin-view-body.component.html',
  styleUrls: ['./admin-view-body.component.scss'],
})
export class AdminViewBodyComponent implements OnInit {

  getAllURL = "http://localhost:3333/api/ticket/all/tickets"
  getSortUrl = "http://localhost:3333/api/ticket/status/"
  tickets : Array<TicketDto> = [];
  statuses : string [] = [];
  cities : string [] = [];

  constructor(private router : Router, private http: HttpClient) {}

  ngOnInit(): void { 
    this.getDatabaseData(true)
      
  }

  getDatabaseData(filters :boolean)
  {
    this.http.get<TicketDto[]>(this.getAllURL).subscribe(
      (data) => {
        // console.log(data);
        this.initialiseTicket(data);
        if (filters)
          this.initialiseFilters();
    }
    );
  }

  initialiseFilters() {
    for (let index = 0; index < this.tickets.length; index++) 
    { 
      this.statuses.push(this.tickets[index].ticket_status);
      this.cities.push(this.tickets[index].ticket_city);
    }
    this.statuses = [...new Set(this.statuses)];
    this.cities = [...new Set(this.cities)];
    console.log(this.statuses);
    console.log(this.cities);
  }

  viewTicket(id : number) : void {
    console.log("GO to ticket view admin");
    const url = "/adminViewTicketDetails";
    console.log(url);
    this.router.navigate([url, {"id":id}]);
  }

  
  initialiseTicket(data : TicketDto []) : void 
  {
    for (let index = 0; index < data.length; index++) 
    {
      this.tickets.push(data[index]);
    }
    console.log(this.tickets);
  }

  filterByStatus(status : string) : void{
    // this.getSortUrl += status;
    // console.log(this.getSortUrl);
    // this.http.get<TicketDto[]>(this.getSortUrl).subscribe(
    //   (data) => {
    //     // console.log(data);
    //     this.initialiseTicket(data);
    // }
    // );
    
    const temp = document.getElementById(status) as HTMLInputElement;
    console.log(temp);

    if (!temp.checked){
      this.tickets = [];
      this.getDatabaseData(false);
    }
    else
    {
      // this.getDatabaseData(false);
      status = temp.value;
      let result1 : TicketDto[] = []
      let result2 : TicketDto[] = []
      let result3 : TicketDto[] = []
      if (status === "Created")
      {
        result1 = this.tickets.filter(this.checkStatusCreated)
        
      }
      if (status === "Dispatched")
      {
        result2 = this.tickets.filter(this.checkStatusDispacthed)
        
      }
      if (status === "Accepted")
      {
        result3 = this.tickets.filter(this.checkStatusAccepted)
      }
      this.tickets = [];
      console.log(result1);
      console.log(result2);
      console.log(result3);
      
      this.tickets.push(...result1);
      this.tickets.push(...result2);
      this.tickets.push(...result3);
      console.log(this.tickets);
      
    }
    

    
  }

  checkStatusCreated(ticket : TicketDto ) : boolean {

    return (ticket.ticket_status === "Created")
    
  }

  checkStatusDispacthed(ticket : TicketDto ) : boolean {

    return (ticket.ticket_status === "Dispatched")
    
  }

  checkStatusAccepted(ticket : TicketDto ) : boolean {

    return (ticket.ticket_status === "Accepted")
    
  }
}
