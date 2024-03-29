import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

export interface FilterChecked {
  name : string,
  category: string
}

@Component({
  selector: 'grid-watch-admin-view-body',
  templateUrl: './admin-view-body.component.html',
  styleUrls: ['./admin-view-body.component.scss'],
})
export class AdminViewBodyComponent implements OnInit {
  counter = 0;
  tickets: Array<TicketDto> = [];
  ticketDates: string[] = [];
  ticketsPERM: Array<TicketDto> = [];
  statuses: Filters[] = [];
  issues: Filters[] = [];
  cities: Filters[] = [];
  dates: Date[] = [];
  filterChecked: FilterChecked [] = [];
  sortoptions: string[] = [
    'Original',
    'Date',
    'Issue',
    'Location',
    'City',
    'Status',
    'Upvotes',
  ];
  selectedoption!: string;

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private http: HttpClient,
    private ticketService: TicketService,
    private googleMapsService: GoogleMapsService,
    private cdref : ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE',
      version: 'weekly',
      libraries: ['places','visualization'],
    });

    loader.load().then(
      () => {
        // this.getDatabaseData(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }

 ngAfterContentInit(): void {
    this.getDatabaseData(true);
  }

  announceSortChange(sortState: Sort) {
    // console.log(sortState);

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
    this.dataSource = new MatTableDataSource(this.tickets);
    this.table.renderRows();
  }

  getDatabaseData(filters: boolean) {
    this.ticketService.getTickets().subscribe(
      async (response) => {
        // console.log(response);
        await this.initialiseTicket(response);
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
      let filter: Filters = {name : this.tickets[index].ticketStatus, checked : false};
      if (this.statuses.indexOf(filter) === -1)
        this.statuses.push(filter);
      filter = {name : this.tickets[index].ticketCity, checked : false};
      this.cities.push(filter);
      filter = {name : this.tickets[index].ticketType, checked : false};
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
    // console.log(id);
    this.router.navigate([url, { id: id }]);
  }

  adjustDates(): void {
    this.dates = [];
    for (let index = 0; index < this.tickets.length; index++) {
      this.dates.push(new Date(this.tickets[index].ticketCreateDate));
    }
  }

  async initialiseTicket(data: TicketDto[]): Promise<void> {
    for (let index = 0; index < data.length; index++) 
    {
      this.tickets.push(data[index]);
      this.ticketsPERM.push(data[index]);
      this.ticketsPERM[index].ticketLocation = this.tickets[index].ticketLocation;
      const date = new Date(this.tickets[index]["ticketCreateDate"]);      
      const m = date.getUTCMonth() + 1;
      const y = date.getUTCFullYear();
      const d = date.getUTCDate();
      this.ticketDates.push(y + "/" + m + "/" + d);
    }
    this.dataSource = new MatTableDataSource(this.tickets);
    this.dataSource.paginator = this.paginator;
    // this.table.renderRows();
  }

  copy(temp: TicketDto): TicketDto {
    const newTicket = new TicketDto();
    newTicket.ticketCity = temp.ticketCity;
    newTicket.ticketCloseDate = temp.ticketCloseDate;
    newTicket.ticketCost = temp.ticketCost;
    newTicket.ticketCreateDate = temp.ticketCreateDate;
    newTicket.ticketDescription = temp.ticketDescription;
    newTicket.ticketId = temp.ticketId;
    newTicket.ticketImg = temp.ticketImg;
    newTicket.ticketLocation = temp.ticketLocation;
    newTicket.ticketStreetAddress = temp.ticketStreetAddress;
    newTicket.ticketRepairTime = temp.ticketRepairTime;
    newTicket.ticketStatus = temp.ticketStatus;
    newTicket.ticketType = temp.ticketType;
    newTicket.ticketUpvotes = temp.ticketUpvotes;
    return newTicket;
  }

  filter(event: string, category : string) {
    const temp = {"name":event, "category" : category}
    const isThere = this.filterChecked.filter((filter) =>{
      return filter.category === temp.category
    })
    // console.log(isThere);
    
    if (isThere.length === 0) {
      this.filterChecked.push(temp);
    } else {
      this.filterChecked = this.filterChecked.filter((val) => {
        return val.category !== temp.category
      });
      this.filterChecked.push(temp);
    }

    console.log(this.filterChecked);

    

    if (this.filterChecked.length > 0)
    {
      // const filterdTickets = this.tickets.filter((ticket) =>{
      //   return ticket.
      // })
      this.tickets = this.ticketsPERM;
      let filterdTickets = this.tickets;
      this.filterChecked.forEach((filter) =>{
        
      filterdTickets = [...filterdTickets.filter((ticket) =>{
        return (
          ticket.ticketStatus === filter.name ||
          ticket.ticketCity === filter.name ||
          ticket.ticketType === filter.name
          );
      })]; 
        

      })

      this.tickets = filterdTickets;
      this.dataSource = new MatTableDataSource<TicketDto>(this.tickets);
      this.dataSource = new MatTableDataSource(this.tickets);
      this.table.renderRows();
    }
    else
    {
      this.tickets = [...this.ticketsPERM];
      this.dataSource = new MatTableDataSource<TicketDto>(this.tickets);
      this.dataSource = new MatTableDataSource(this.tickets);
      this.table.renderRows();
    }


  }

  resetFilters() : void
  {
    console.log(this.statuses);
    
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
    this.cdref.detectChanges()

    this.tickets = [];
    this.filterChecked = [];
    for (let index = 0; index < this.ticketsPERM.length; index++) {
      this.tickets[index] = this.copy(this.ticketsPERM[index]);
    }
    this.dataSource = new MatTableDataSource(this.ticketsPERM);
    this.dataSource = new MatTableDataSource(this.tickets);
    this.table.renderRows();
  }

  
}
