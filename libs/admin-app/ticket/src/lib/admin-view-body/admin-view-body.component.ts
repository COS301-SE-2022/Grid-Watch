import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { GoogleMapsService, TicketService } from '@grid-watch/shared-ui';
import { Ticket } from '@prisma/client';
import { table } from 'console';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'grid-watch-admin-view-body',
  templateUrl: './admin-view-body.component.html',
  styleUrls: ['./admin-view-body.component.scss'],
})
export class AdminViewBodyComponent implements OnInit {
  getAllURL = 'http://localhost:3333/api/ticket/all/tickets';
  getSortUrl = 'http://localhost:3333/api/ticket/status/';
  getCityURL = 'http://localhost:3333/api/ticket/city/';
  getTypeURL = 'http://localhost:3333/api/ticket/issue/';
  getFilterURL = 'http://localhost:3333/api/ticket/all/tickets/';
  tickets: Array<TicketDto> = [];
  ticketsPERM: Array<TicketDto> = [];
  statuses: string[] = [];
  issues: string[] = [];
  cities: string[] = [];
  dates: Date[] = [];
  sort_options: string[] = [
    'Original',
    'Date',
    'Issue',
    'Location',
    'City',
    'Status',
    'Upvotes',
  ];
  selected_option!: string;

  displayedColumns: string[] = ['Date', 'Location', 'City', 'Status', 'Upvotes'];

  dataSource! : MatTableDataSource<TicketDto>;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private router: Router, 
              private http: HttpClient,
              private ticketService: TicketService,
              private googleMapsService: GoogleMapsService) {}


  ngOnInit(): void {
    const loader = new Loader({
      apiKey: "AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE",
      version: "weekly",
      libraries: ["places"]
    });
    
    loader.load().then(() => {

      this.getDatabaseData(true);
      
      }, (error) =>{console.log(error);
      });
  }

  announceSortChange(sortState: Sort) {
    console.log(sortState);
    
      this.sort(sortState.active, sortState.direction);
  }

  getDatabaseData(filters: boolean) {

    this.ticketService.getTickets().subscribe(
      (response) => {
        console.log(response);
        this.initialiseTicket(response);
        this.adjustDates();
        if (filters) this.initialiseFilters();
      },
      (error) => {console.log(error);}
    )
  }

  initialiseFilters() {
    for (let index = 0; index < this.tickets.length; index++) {
      this.statuses.push(this.tickets[index].ticket_status);
      this.cities.push(this.tickets[index].ticket_city);
      this.issues.push(this.tickets[index].ticket_type);
    }
    this.statuses = [...new Set(this.statuses)];
    this.cities = [...new Set(this.cities)];
    this.issues = [...new Set(this.issues)];
    // console.log(this.dates);
    // console.log(this.cities);
  }

  viewTicket(id: number): void {
    // console.log('GO to ticket view admin');
    const url = '/adminViewTicketDetails';
    console.log(id);
    this.router.navigate([url, { id: id }]);
  }

  adjustDates(): void {
    this.dates = [];
    for (let index = 0; index < this.tickets.length; index++) {
      this.dates.push(new Date(this.tickets[index].ticket_create_date));
    }
  }

  async initialiseTicket(data: TicketDto[]): Promise<void> {
    for (let index = 0; index < data.length; index++) {
      this.tickets.push(data[index]);
      this.ticketsPERM.push(data[index]);
      console.log(this.tickets[index].ticket_location);
      this.tickets[index].ticket_location = await this.googleMapsService.getLocation(this.tickets[index].ticket_location);
      this.ticketsPERM[index].ticket_location = this.tickets[index].ticket_location;
    }
    this.dataSource = new MatTableDataSource(this.tickets);
  }

  filterByStatus(status: string): void {
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

    if (!temp.checked) {
      this.tickets = [];
      this.getDatabaseData(false);
    } else {
      // this.getDatabaseData(false);
      status = temp.value;
      let result1: TicketDto[] = [];
      let result2: TicketDto[] = [];
      let result3: TicketDto[] = [];
      if (status === 'Created') {
        result1 = this.tickets.filter(this.checkStatusCreated);
      }
      if (status === 'Dispatched') {
        result2 = this.tickets.filter(this.checkStatusDispacthed);
      }
      if (status === 'Accepted') {
        result3 = this.tickets.filter(this.checkStatusAccepted);
      }
      this.tickets = [];
      this.tickets.push(...result1);
      this.tickets.push(...result2);
      this.tickets.push(...result3);
      // console.log(this.tickets);
    }
  }

  checkStatusCreated(ticket: TicketDto): boolean {
    return ticket.ticket_status === 'Created';
  }

  checkStatusDispacthed(ticket: TicketDto): boolean {
    return ticket.ticket_status === 'Dispatched';
  }

  checkStatusAccepted(ticket: TicketDto): boolean {
    return ticket.ticket_status === 'Accepted';
  }

  filterByCity(id: string, value: string) {
    const temp = document.getElementById(id) as HTMLInputElement;
    if (!temp.checked) {
      this.tickets = [];
      this.getDatabaseData(false);
    } else {
      const tempURL = this.getCityURL;
      this.getCityURL += value;
      this.http.get<TicketDto[]>(this.getCityURL).subscribe((data) => {
        this.tickets = data;
      });
      this.getCityURL = tempURL;
    }
  }

  filterByType(id: string, value: string) {
    const temp = document.getElementById(id) as HTMLInputElement;
    if (!temp.checked) {
      this.tickets = [];
      this.getDatabaseData(false);
    } else {
      const tempURL = this.getTypeURL;
      this.getTypeURL += value;
      this.http.get<TicketDto[]>(this.getTypeURL).subscribe((data) => {
        this.tickets = data;
      });
      this.getTypeURL = tempURL;
    }
  }

  copy(temp : TicketDto) : TicketDto
  {
    const newTicket = new TicketDto();
    newTicket.ticket_city = temp.ticket_city;
    newTicket.ticket_close_date = temp.ticket_close_date;
    newTicket.ticket_cost = temp.ticket_cost;
    newTicket.ticket_create_date = temp.ticket_create_date;
    newTicket.ticket_description = temp.ticket_description;
    newTicket.ticket_id = temp.ticket_id;
    newTicket.ticket_img = temp.ticket_img;
    newTicket.ticket_location = temp.ticket_location;
    newTicket.ticket_repair_time = temp.ticket_repair_time;
    newTicket.ticket_status = temp.ticket_status;
    newTicket.ticket_type = temp.ticket_type;
    newTicket.ticket_upvotes = temp.ticket_upvotes;
    return newTicket;

  }

  sort(selectedOption: string, order : string): void {
    if(order === "") {
      this.tickets = [];
      for (let index = 0; index < this.ticketsPERM.length; index++) {
        this.tickets[index] = this.copy(this.ticketsPERM[index]);
      }
    }
    else if (selectedOption == "Date")
    {
      if (order === "asc")
        this.tickets.sort(this.sortByDate);
      else
        this.tickets.sort(this.sortByDateDesc);
    }
    else if (selectedOption == "Location")
    {
      if (order === "asc")
      this.tickets.sort(this.sortByLocation);
      else
      this.tickets.sort(this.sortByLocationDesc);
    }
    else if (selectedOption == "City")
    {
      if (order === "asc")
      this.tickets.sort(this.sortByCity);
      else
      this.tickets.sort(this.sortByCityDesc);
    }
    else if (selectedOption == "Status")
    {
      if (order === "asc")
      this.tickets.sort(this.sortByStatus);
      else
      this.tickets.sort(this.sortByStatusDesc);
    }
    else if (selectedOption == "Upvotes")
    {
      if (order === "asc")
      this.tickets.sort(this.sortByUpvotes);
      else
      this.tickets.sort(this.sortByUpvotesDesc);
    }
    
    this.dataSource = new MatTableDataSource(this.tickets);
    this.table.renderRows();
  }

  sortByUpvotes(a : TicketDto, b : TicketDto) : number
  {
    if (b.ticket_upvotes > a.ticket_upvotes)
    return 1;
    else
    return -1;
  }

  sortByStatus(a : TicketDto, b : TicketDto) : number
  {
    if (b.ticket_status > a.ticket_status)
    return 1;
    else
    return -1;
  }

  sortByCity(a : TicketDto, b : TicketDto) : number
  {
    if (b.ticket_city > a.ticket_city)
    return 1;
    else
    return -1;
  }

  sortByLocation(a : TicketDto, b : TicketDto) : number
  {
    if (b.ticket_location > a.ticket_location)
    return 1;
    else
    return -1;
  }

  sortByDate(a : TicketDto, b : TicketDto) : number
  {
    if (b.ticket_create_date > a.ticket_create_date)
    return 1;
    else
    return -1;
  }

  sortByUpvotesDesc(a : TicketDto, b : TicketDto) : number
  {
    if (b.ticket_upvotes < a.ticket_upvotes)
    return 1;
    else
    return -1;
  }

  sortByStatusDesc(a : TicketDto, b : TicketDto) : number
  {
    if (b.ticket_status < a.ticket_status)
    return 1;
    else
    return -1;
  }

  sortByCityDesc(a : TicketDto, b : TicketDto) : number
  {
    if (b.ticket_city < a.ticket_city)
    return 1;
    else
    return -1;
  }

  sortByLocationDesc(a : TicketDto, b : TicketDto) : number
  {
    if (b.ticket_location < a.ticket_location)
    return 1;
    else
    return -1;
  }

  sortByDateDesc(a : TicketDto, b : TicketDto) : number
  {
    if (b.ticket_create_date < a.ticket_create_date)
    return 1;
    else
    return -1;
  }

  
}
