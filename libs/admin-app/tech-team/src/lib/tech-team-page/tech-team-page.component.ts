import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { MessageDialogComponent, TechTeamProfileService, TicketService } from '@grid-watch/shared-ui';

interface Teams {
  techTeam: TechTeamDto;
  tickets: TicketDto[];
  ticketStatus: string[];
  ticketDate: string[];
  ticketImage: string[];
}

@Component({
  selector: 'grid-watch-tech-team-page',
  templateUrl: './tech-team-page.component.html',
  styleUrls: ['./tech-team-page.component.scss'],
})
export class TechTeamPageComponent implements OnInit {
  techTeams!: Teams[];
  tickets!: TicketDto[];
  dialogRef! : MatDialogRef<MessageDialogComponent>;
  constructor(
    private techTeamService: TechTeamProfileService,
    private cdRef: ChangeDetectorRef,
    private ticketService: TicketService,
    private router : Router,
    public dialog: MatDialog,
  ) {}

  async ngOnInit(): Promise<void> {
    this.techTeams = [];

    this.ticketService.getTickets().subscribe((response) => {
      this.tickets = response;
      this.techTeamService.getAllTechTeams().subscribe((response) => {
        // this.techTeams = response;
        response.forEach((techTeam) => {
          // console.log(techTeam);
          // const tempTeam = {
          //   "techTeam" : techTeam,
          //   "tickets" : [...this.tickets.filter((ticket) =>{
          //     return (ticket.assignedTechTeam === techTeam.id)
          //   })]
          //   "ticketStatus" : []
          // };
          // console.log(tempTeam);

          const tempTeam = {} as Teams; 
          tempTeam.techTeam = techTeam;
          this.InitialiseTicket(tempTeam);
          this.techTeams.push(tempTeam);
        });
        this.initaliseTechTeams();
      });
    });
  }

  initaliseTechTeams() {
    this.cdRef.detectChanges();
    const ratingsElements = document.getElementsByClassName('techInfo stars');
    this.techTeams.forEach((techTeam, index) => {
      const stars = techTeam.techTeam.ratingOfJobs / 2;
      let numberStars = Math.round(stars * 2) / 2;
      // console.log(numberStars);

      for (let k = 1; k <= numberStars; k++) {
        // console.log(k);
        const span = document.createElement('span');
        span.classList.add('material-icons');
        span.innerHTML = 'star_rate';
        ratingsElements[index].appendChild(span);
      }

      if (numberStars % 1 == 0.5) {
        const span = document.createElement('span');
        span.classList.add('material-icons');
        span.innerHTML = 'star_half';
        ratingsElements[index].appendChild(span);
        numberStars++;
      }

      for (let k = 0; k < 5 - numberStars; k++) {
        // console.log(k);
        const span = document.createElement('span');
        span.classList.add('material-icons');
        span.innerHTML = 'star_outline';
        ratingsElements[index].appendChild(span);
      }
    });
    // console.log(ratingsElements);
  }

  goToTicket(id: string) {
    const url = '/adminViewTicketDetails';
    this.router.navigate([url, { id: id }]);
  }

  IncreaseUpvote(id: number, i: number) {
    // console.log('increase upvotes');
  }

  async InitialiseTicket(techTeam: Teams): Promise<void> {
    techTeam.tickets = this.tickets.filter((ticket) => {
      return ticket.assignedTechTeam === techTeam.techTeam.id;
    });

    techTeam.ticketDate = [];
    techTeam.ticketStatus = [];
    techTeam.ticketImage = [];

    techTeam.tickets.forEach((ticket, index) => {
      const date = new Date(ticket['ticketCreateDate']);
      const m = date.getUTCMonth() + 1;
      const y = date.getUTCFullYear();
      const d = date.getUTCDate();
      techTeam.ticketDate.push(y + '/' + m + '/' + d);
      switch (this.tickets[index]['ticketType']) {
        case 'Electricity Outage':
          techTeam.ticketImage.push('assets/issue-brokenpower.svg');
          break;
        case 'Water Outage':
          techTeam.ticketImage.push('assets/issue-water.svg');
          break;
        case 'Pothole':
          techTeam.ticketImage.push('assets/issue-pothole.svg');
          break;
        case 'Sinkhole':
          techTeam.ticketImage.push('assets/issue-sinkhole.svg');
          break;
        case 'Broken Traffic Light':
          techTeam.ticketImage.push('assets/issue-brokenrobot.svg');
          break;
        case 'Broken Street Light':
          techTeam.ticketImage.push('assets/issue-brokenlight.svg');
          break;
        default:
          techTeam.ticketImage.push('assets/issue-maintenance.svg');
          break;
      }

      switch (this.tickets[index]['ticketStatus']) {
        case 'Created':
          techTeam.ticketStatus.push('redText');
          break;
        case 'Dispatched':
          techTeam.ticketStatus.push('orangeText');
          break;
        case 'In Progress':
          techTeam.ticketStatus.push('yellowText');
          break;
        case 'Closed':
          techTeam.ticketStatus.push('greenText');
          break;
        default:
          techTeam.ticketStatus.push('yellowText');
          break;
      }
    });
  }

  remove(email : string){
    this.showMessage("Remove Technicians", "Are you sure you want to permanently remove this Technican?");
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === "true")
      {
        const toDelete = this.techTeams.filter((team) =>{
          return (team.techTeam.email === email);
        })[0]
        this.techTeams = this.techTeams.filter((team) =>{
          return (team.techTeam.email !== email);
        })
        this.techTeamService.deleteTechTeam(toDelete.techTeam.id.toString()).subscribe(
          (res)=>{
            console.log(res);
          }
        );
      }
    });
  }

  showMessage(title :string, info : string ) : void{
    const temp = window.innerWidth;
      const pageData = title;
      const pageInfo = info;
      this.dialogRef = this.dialog.open(MessageDialogComponent,{
        panelClass: ['full-screen'],
        data: {pageData: pageData, pageInfo : pageInfo, return: ""},
        width: temp.toString(), 
        height: "150",
        scrollStrategy: new NoopScrollStrategy()
      },);
    
  }
}
