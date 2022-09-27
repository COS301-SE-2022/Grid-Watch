import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import {
  TicketService,
  GoogleMapsService,
  SessionManagerService,
  PublicProfileService,
} from '@grid-watch/shared-ui';

interface Filter {
  name: string;
  checked: boolean;
}

interface filtersInterface {
  city: Filter[];
  type: Filter[];
  month: Filter[];
}

export interface FilterChecked {
  name : string,
  category: string
}

@Component({
  selector: 'grid-watch-ticket-body-list',
  templateUrl: './ticket-body-list.component.html',
  styleUrls: ['./ticket-body-list.component.scss'],
})
export class TicketBodyListComponent implements OnInit {
  ticketDates: string[] = [];
  ticketImages: string[] = [];
  ticketStatus: string[] = [];
  tickets: Array<TicketDto> = [];
  ticketsPerm: Array<TicketDto> = [];
  type!: string;
  filterLabels: filtersInterface[] = [];
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
  id!: string;
  user!: UserDto;
  filterChecked: FilterChecked[] = [];

  constructor(
    private http: HttpClient,
    private ticketService: TicketService,
    private googleMapsService: GoogleMapsService,
    private router: Router,
    private sessionService: SessionManagerService,
    private userService: PublicProfileService
  ) {}

  ngOnInit(): void {
    this.sortDirection = 'asc';

    const loader = new Loader({
      apiKey: 'AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE',
      version: 'weekly',
      libraries: ['places', 'visualization'],
    });

    loader.load().then(
      () => {
        this.ticketService.getTickets().subscribe(async (response) => {
          this.tickets = response;
          this.InitialiseTicket(response);
          this.ticketsPerm = response;
          this.loadFilterLabels();
          this.loadSortLabels();
          this.id = this.sessionService.getID() || '';
          this.userService.getUser(this.id).subscribe((response) => {
            this.user = response[0];
            this.initialiseUpvotes();
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initialiseUpvotes() {
    if (this.user) {
      // console.log(this.user);
      this.user.ticketsUpvoted.forEach((id) => {
        const cardElement = document.getElementById(id.toString());
        cardElement?.classList.add('liked');
      });
    }
  }

  loadSortLabels() {
    this.sortLabels.push('Issue');
    this.sortLabels.push('City');
    this.sortLabels.push('Upvotes');
    this.sortLabels.push('Date');
  }

  loadFilterLabels() {
    let cities: Filter[] = [];
    let types: Filter[] = [];
    let months: Filter[] = [];
    this.tickets.forEach((ticket) => {
      cities.push({ name: ticket.ticketCity, checked: false });

      types.push({ name: ticket.ticketType, checked: false });

      const date = new Date(ticket.ticketCreateDate);
      const dateString = this.months[date.getMonth()];

      months.push({ name: dateString, checked: false });

      // console.log(date.toDateString());
    });

    cities = cities.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );
    months = months.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );
    types = types.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );

    const tempFilter = {
      city: cities,
      type: types,
      month: months,
    };
    this.filterLabels.push(tempFilter);
  }

  IncreaseUpvote(id: number, index: number): void {
    if (this.user) {
      if (!this.user.ticketsUpvoted.includes(id)) {
        this.user.ticketsUpvoted.push(this.tickets[index].ticketId);
        this.ticketService.increaseUpvotes(
          id,
          ++this.tickets[index].ticketUpvotes,
          this.id
        );
        const card = document.getElementById(id.toString());
        // console.log(card);
        card?.classList.add('liked');
      }
    }
  }

  async InitialiseTicket(data: TicketDto[]): Promise<void> {
    this.ticketImages = [];
    this.ticketStatus = [];
    for (let index = 0; index < data.length; index++) {
      // this.tickets.push(data[index]);
      const date = new Date(this.tickets[index]['ticketCreateDate']);
      const m = date.getUTCMonth() + 1;
      const y = date.getUTCFullYear();
      const d = date.getUTCDate();
      this.ticketDates.push(y + '/' + m + '/' + d);
      switch (this.tickets[index]['ticketType']) {
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

      switch (this.tickets[index]['ticketStatus']) {
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
      // this.ticketService.getImages(data[index].ticketId).subscribe
      // (
      //   (response) =>
      //   {
      //     if (response[response.length - 1])
      //       this.tickets[index].ticketImg = response[response.length - 1].pictureLink;
      //   }
      // );
      // const place_id = this.tickets[index].ticketLocation;
      // this.googleMapsService.getLocation(place_id).then(
      //   (response) => {
      //     this.tickets[index].ticketLocation = response;
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );
    }
    // console.log(this.tickets);
  }

  goToTicket(id: string) {
    this.router.navigate(['/viewTicket', { id: id }]);
  }

  // filter(search: string, category : string): void {
  //   this.tickets = this.ticketsPerm;
  //   if (!this.filterList.includes(search)) {
  //     this.filterList.push(search);
  //   } else {
  //     this.filterList.splice(this.filterList.indexOf(search), 1);
  //   }

  //   if (this.filterList.length == 0) {
  //     this.tickets = this.ticketsPerm;
  //   }

  //   this.filterList.forEach((filter) => {
  //     this.tickets = this.tickets.filter((ticket) => {
  //       return (
  //         ticket.ticketCity == filter ||
  //         this.months[new Date(ticket.ticketCreateDate).getMonth()] == filter ||
  //         ticket.ticketType == filter
  //       );
  //     });
  //     // this.tickets = [...this.tickets ,...tempTickets]
  //   });

  //   this.InitialiseTicket(this.tickets);
  // }

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
      this.tickets = this.ticketsPerm;
      let filterdTickets = this.tickets;
      this.filterChecked.forEach((filter) =>{
        
        
        console.log();
      filterdTickets = [...filterdTickets.filter((ticket) =>{
        const temp = ticket.ticketCreateDate.toString().split('T')[0].split("-")[1];
        const num = parseInt(temp)
        console.log(num);
        console.log("this.months[" + num + "] " + this.months[num]);
        
        return (
          this.months[num-1] === filter.name ||
          ticket.ticketCity === filter.name ||
          ticket.ticketType === filter.name
          );
      })]; 
        

      })

      this.tickets = filterdTickets;
      this.InitialiseTicket(this.tickets)
    }
    else
    {
      this.tickets = [...this.ticketsPerm];
    }


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
    this.InitialiseTicket(this.tickets)
  }

  reset(){
    this.filterLabels.forEach((filter) =>{
      filter.city.forEach((value) =>{value.checked = false;})
      filter.month.forEach((value) =>{value.checked = false;})
      filter.type.forEach((value) =>{value.checked = false;})
    })
    this.tickets = this.ticketsPerm;
    this.InitialiseTicket(this.tickets)
  }
}
