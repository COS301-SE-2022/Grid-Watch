import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import {
  GoogleMapsService,
  SessionManagerService,
  TechTeamProfileService,
  TicketService,
} from '@grid-watch/shared-ui';

interface filterInterface {
  city: string[];
  type: string[];
  month: string[];
}

@Component({
  selector: 'grid-watch-ticket-view-page',
  templateUrl: './ticket-view-page.component.html',
  styleUrls: ['./ticket-view-page.component.scss'],
})
export class TicketViewPageComponent implements OnInit {
  tickets: Array<TicketDto> = [];
  ticketsPerm: Array<TicketDto> = [];
  ticketDates!: string[];
  ticketImages!: string[];
  ticketStatus!: string[];

  type!: string;
  filterLabels: filterInterface[] = [];
  sortLabels: string[] = [];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  filterList: string[] = [];
  sortDirection!: 'asc' | 'desc';
  specialisation!: string[];

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private googleMapsService: GoogleMapsService,
    private userService: TechTeamProfileService,
    private sessionService: SessionManagerService
  ) {}

  async ngOnInit(): Promise<void> {
    this.sortDirection = 'asc';
    this.ticketDates = [];
    this.ticketImages = [];
    this.ticketStatus = [];

    this.ticketService.getTicketsType('Dispatched').subscribe(
      (response) => {
        
        this.tickets = response;
        console.log(this.tickets);
      this.initialiseTicket(response);
      this.ticketsPerm = response;
      this.filterTicketsToTeam();
    });
  }

  filterTicketsToTeam() {
    this.tickets = [];
    this.userService
    .getTechTeamID(this.sessionService.getID() || '')
    .subscribe((response) => {
      this.specialisation = response[0].specialisation;
      console.log(this.specialisation);
      this.specialisation.forEach((specialty) => {
         console.log(specialty);
         this.tickets.push(...this.ticketsPerm.filter((ticket) => {
           return ticket.ticketType.includes(specialty) || 
                  ticket.ticketType === "Other" ;
         }))
        
      });
      this.loadSortLabels();
      this.loadFilterLabels();
      this.initialiseTicket(this.tickets);
      this.ticketsPerm = this.tickets;
    });
  }

  viewTicket(id: number): void {
    // console.log("GO to ticket view admin");
    const url = '/ticketDetails';
    // console.log(url);
    this.router.navigate([url, { id: id }]);
  }

  async initialiseTicket(data: TicketDto[]): Promise<void> {
    this.ticketImages = [];
    this.ticketStatus = [];
    for (let index = 0; index < data.length; index++) {
      // this.tickets.push(data[index]);
      const date = new Date(data[index]['ticketCreateDate']);
      const m = date.getUTCMonth() + 1;
      const y = date.getUTCFullYear();
      const d = date.getUTCDate();
      this.ticketDates.push(y + '/' + m + '/' + d);
      switch (data[index]['ticketType']) {
        case 'Electricity Outage':
          this.ticketImages.push('assets/issue-brokenpower.svg');
          break;
        case 'Water Outage':
          this.ticketImages.push('assets/issue-water.svg');
          break;
        case 'Pothole':
          this.ticketImages.push('assets/issue-pothole.svg');
          break;
        case 'Sinkhole':
          this.ticketImages.push('assets/issue-sinkhole.svg');
          break;
        case 'Broken Traffic Light':
          this.ticketImages.push('assets/issue-brokenrobot.svg');
          break;
        case 'Broken Street Light':
          this.ticketImages.push('assets/issue-brokenlight.svg');
          break;
        default:
          this.ticketImages.push('assets/issue-maintenance.svg');
          break;
      }

      switch (data[index]['ticketStatus']) {
        case 'Created':
          this.ticketStatus.push('redText');
          break;
        case 'Dispatched':
          this.ticketStatus.push('orangeText');
          break;
        case 'In Progress':
          this.ticketStatus.push('yellowText');
          break;
        case 'Closed':
          this.ticketStatus.push('greenText');
          break;
        default:
          this.ticketStatus.push('yellowText');
          break;
      }
      // this.ticketService
      //   .getImages(data[index].ticketId)
      //   .subscribe((response) => {
      //     if (response[response.length - 1])
      //       this.tickets[index].ticketImg =
      //         response[response.length - 1].pictureLink;
      //   });
    }
    console.log(this.tickets);
  }

  goToTicket(id: string) {
    this.router.navigate(['/editTicketDetails', { id: id }]);
  }

  loadSortLabels() {
    this.sortLabels.push('Issue');
    this.sortLabels.push('City');
    this.sortLabels.push('Upvotes');
    this.sortLabels.push('Date');
  }

  loadFilterLabels() {
    const cities: string[] = [];
    const types: string[] = [];
    const months: string[] = [];
    this.tickets.forEach((ticket) => {
      if (!cities.includes(ticket.ticketCity)) {
        cities.push(ticket.ticketCity);
      }
      if (!types.includes(ticket.ticketType)) {
        types.push(ticket.ticketType);
      }
      const date = new Date(ticket.ticketCreateDate);
      const dateString = this.months[date.getMonth()];
      if (!months.includes(dateString)) {
        months.push(dateString);
      }
      // console.log(date.toDateString());
    });
    const tempFilter = {
      city: cities,
      type: types,
      month: months,
    };
    this.filterLabels.push(tempFilter);
  }

  filter(search: string): void {
    this.tickets = this.ticketsPerm;
    if (!this.filterList.includes(search)) {
      this.filterList.push(search);
    } else {
      this.filterList.splice(this.filterList.indexOf(search), 1);
    }

    if (this.filterList.length == 0) {
      this.tickets = this.ticketsPerm;
    }

    this.filterList.forEach((filter) => {
      this.tickets = this.tickets.filter((ticket) => {
        return (
          ticket.ticketCity == filter ||
          this.months[new Date(ticket.ticketCreateDate).getMonth()] == filter ||
          ticket.ticketType == filter
        );
      });
      // this.tickets = [...this.tickets ,...tempTickets]
    });
    this.initialiseTicket(this.tickets);
  }

  sort(sortType: string): void {
    // this.sortLabels.push("Issue Type")
    // this.sortLabels.push("City")
    // this.sortLabels.push("Upvotes")
    // this.sortLabels.push("Date")
    this.tickets = this.ticketService.sort(
      sortType,
      this.sortDirection,
      this.tickets
    );
    this.initialiseTicket(this.tickets);
  }
}
