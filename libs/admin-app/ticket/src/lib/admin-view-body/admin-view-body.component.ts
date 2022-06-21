import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
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

export interface Filters {
  name : string,
  checked: boolean
}

@Component({
  selector: 'grid-watch-admin-view-body',
  templateUrl: './admin-view-body.component.html',
  styleUrls: ['./admin-view-body.component.scss'],
})
export class AdminViewBodyComponent implements OnInit {
  counter = 0;
  tickets: Array<TicketDto> = [];
  ticketsPERM: Array<TicketDto> = [];
  statuses: Filters[] = [];
  issues: Filters[] = [];
  cities: Filters[] = [];
  dates: Date[] = [];
  filterChecked: string[] = [];
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

  displayedColumns: string[] = [
    'Date',
    'Issue',
    'Location',
    'City',
    'Status',
    'Upvotes',
  ];

  dataSource!: MatTableDataSource<TicketDto>;
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private ticketService: TicketService,
    private googleMapsService: GoogleMapsService
  ) {}

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(
      () => {
        this.getDatabaseData(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  announceSortChange(sortState: Sort) {
    console.log(sortState);

    if (sortState.direction === '') {
      this.tickets = [];
      for (let index = 0; index < this.ticketsPERM.length; index++) {
        this.tickets[index] = this.copy(this.ticketsPERM[index]);
      }
    }
    else
    {
      this.tickets = this.ticketService.sort(sortState.active, sortState.direction, this.tickets);
    }
    this.dataSource = new MatTableDataSource<TicketDto>(this.tickets);
    this.table.renderRows();
  }

  getDatabaseData(filters: boolean) {
    this.ticketService.getTickets().subscribe(
      (response) => {
        console.log(response);
        this.initialiseTicket(response);
        this.adjustDates();
        if (filters) this.initialiseFilters();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initialiseFilters() {
    for (let index = 0; index < this.tickets.length; index++) {
      let filter: Filters = {name : this.tickets[index].ticket_status, checked : false};
      if (this.statuses.indexOf(filter) === -1)
        this.statuses.push(filter);
      filter = {name : this.tickets[index].ticket_city, checked : false};
      this.cities.push(filter);
      filter = {name : this.tickets[index].ticket_type, checked : false};
      this.issues.push(filter);
    }
    this.statuses = this.statuses.filter((value, index, self) =>
    index === self.findIndex((t) => ( t.name === value.name)));
    this.cities = this.cities.filter((value, index, self) =>
    index === self.findIndex((t) => ( t.name === value.name)));
    this.issues = this.issues.filter((value, index, self) =>
    index === self.findIndex((t) => ( t.name === value.name)));
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
      // this.tickets[index].ticket_location = await this.googleMapsService.getLocation(this.tickets[index].ticket_location);
      this.ticketsPERM[index].ticket_location =
        this.tickets[index].ticket_location;
    }
    this.dataSource = new MatTableDataSource(this.tickets);
  }

  copy(temp: TicketDto): TicketDto {
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

  filter(event: any) {
    // console.log(event.source.name);
    if (!this.filterChecked.includes(event.source.name)) {
      this.filterChecked.push(event.source.name);
    } else {
      this.filterChecked = this.filterChecked.filter((val) => {
        return !val.match(event.source.name);
      });
    }

    if (this.filterChecked.length > 0)
    {
      let filterdTickets: TicketDto[] = [];
      for (let index = 0; index < this.filterChecked.length; index++) {
        const temp = this.ticketsPERM.filter((ticket) => {
          return ticket.ticket_city === this.filterChecked[index];
        });
        filterdTickets = filterdTickets.concat(temp);
      }
  
      for (let index = 0; index < this.filterChecked.length; index++) {
        const temp = this.ticketsPERM.filter((ticket) => {
          return ticket.ticket_status === this.filterChecked[index];
        });
        filterdTickets = filterdTickets.concat(temp);
      }
  
      for (let index = 0; index < this.filterChecked.length; index++) {
        const temp = this.ticketsPERM.filter((ticket) => {
          return ticket.ticket_type === this.filterChecked[index];
        });
        filterdTickets = filterdTickets.concat(temp);
      }
      this.tickets = filterdTickets;
      this.dataSource = new MatTableDataSource<TicketDto>(this.tickets);
      this.table.renderRows();
    }
    else
    {
      this.tickets = [];
      for (let index = 0; index < this.ticketsPERM.length; index++) {
        this.tickets[index] = this.copy(this.ticketsPERM[index]);
      }
      this.dataSource = new MatTableDataSource<TicketDto>(this.tickets);
      this.table.renderRows();
    }


  }

  resetFilters() : void
  {
    // console.log(this.checkedBool);
    
    // for (let index = 0; index < this.checkedBool.length; index++) {
    //   this.checkedBool[index] = false;
      
    // }
    this.statuses.forEach((item) =>
    {
      item.checked = false;
    })
    this.cities.forEach((item) =>
    {
      item.checked = false;
    })
    this.issues.forEach((item) =>
    {
      item.checked = false;
    })

    this.tickets = [];
    this.filterChecked = [];
    for (let index = 0; index < this.ticketsPERM.length; index++) {
      this.tickets[index] = this.copy(this.ticketsPERM[index]);
    }
    this.dataSource = new MatTableDataSource(this.ticketsPERM);
    this.table.renderRows();
  }
}
