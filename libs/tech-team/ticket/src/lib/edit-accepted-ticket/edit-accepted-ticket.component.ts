import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { TicketService, GoogleMapsService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-edit-accepted-ticket',
  templateUrl: './edit-accepted-ticket.component.html',
  styleUrls: ['./edit-accepted-ticket.component.scss'],
})
export class EditAcceptedTicketComponent implements OnInit {
  getAllURL = 'http://localhost:3333/api/ticket/';
  UpdateStatusURL = 'http://localhost:3333/api/ticket/update/status/';
  UpdateRepairURL = 'http://localhost:3333/api/ticket/update/repair/';
  UpdateCostURL = 'http://localhost:3333/api/ticket/update/cost/';
  getPictureURL = 'http://localhost:3333/api/ticket/picture/';


  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  issue_id!: string | null;
  ticket: TicketDto = new TicketDto();

  @Input() cost!: number;
  @Input() repair_time!: number;
  @Input() status!: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private googleMapsService: GoogleMapsService
  ) {}

  ngOnInit(): void {
    // this.ticket = new TicketDto;
    this.issue_id = this.route.snapshot.paramMap.get('id');
    this.ticket.ticketImg = '';
    this.getAllURL += this.issue_id;
    this.UpdateStatusURL += this.issue_id;
    this.UpdateRepairURL += this.issue_id;
    this.UpdateCostURL += this.issue_id;
    if (this.issue_id)
      this.ticketService.getTicket(this.issue_id).subscribe((data) => {
        this.ticket = data[0];
        this.ticket.ticketImg = '';
        this.status = this.ticket.ticketStatus;
        this.repair_time = this.ticket.ticketRepairTime;
        this.cost = this.ticket.ticketCost;
        this.loadImage();
      });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  back(): void {
    this.router.navigateByUrl('/acceptedTickets');
  }

  update(): void {
    if (this.ticket.ticketCost != this.cost) {
      this.updateCost();
    }
    if (this.ticket.ticketRepairTime != this.repair_time) {
      this.updateRepairTime();
    }
    if (this.ticket.ticketStatus != this.status) {
      this.updateStatus();
    }

    this.showSuccessMessage('Successfully updated ticket');

    this.router.navigateByUrl('/acceptedTickets');
  }

  updateRepairTime(): void {
    // const temp = '{"repairTime": ' + this.repair_time + '}';
    // this.http
    //   .put<JSON>(this.UpdateRepairURL, JSON.parse(temp), this.httpOptions)
    //   .subscribe(
    //     () => {
    //       return true;
    //     },
    //     () => {
    //       return false;
    //     }
    //   );
    // return false;
    if (this.issue_id)
    this.ticketService.updateTicketRepairTime(this.issue_id, this.repair_time).subscribe(
      () =>{return true},
      () =>{return false}
    );
  }

  updateStatus(): void {
    // const temp = '{"status": "' + this.status + '"}';
    // this.http
    //   .put<JSON>(this.UpdateStatusURL, JSON.parse(temp))
    //   .subscribe(
    //     () => {
    //       return true;
    //     },
    //     () => {
    //       return false;
    //     }
    //   );
    // return false;
    if (this.issue_id)
    this.ticketService.updateTicketStatus(this.issue_id, this.status).subscribe(
      (resp) =>{
        console.log(resp);
        
      }
    )
  }

  updateCost(): boolean {
    const temp = '{"cost": ' + this.cost + '}';
    this.http
      .put<JSON>(this.UpdateCostURL, JSON.parse(temp))
      .subscribe(
        () => {
          return true;
        },
        () => {
          return false;
        }
      );
    return false;
  }

  showErrorMessage(edits: string): void {
    alert(edits);
  }

  showSuccessMessage(errors: string): void {
    alert(errors);
  }

  async loadImage(): Promise<void> {
    await this.delay(3000);
    this.getPictureURL += this.ticket.ticketId;
    this.http.get<TicketPictureDto[]>(this.getPictureURL).subscribe((data) => {
      console.log(data);
      if (data.length > 0)
      {
        this.ticket.ticketImg = data[0].pictureLink;
      }
      else
      {
        this.ticket.ticketImg = "image-solid.svg";
      }
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
