import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';

@Component({
  selector: 'grid-watch-edit-accepted-ticket',
  templateUrl: './edit-accepted-ticket.component.html',
  styleUrls: ['./edit-accepted-ticket.component.scss'],
})
export class EditAcceptedTicketComponent implements OnInit {
 

  getAllURL = "http://localhost:3333/api/ticket/"
  UpdateStatusURL = "http://localhost:3333/api/ticket/update/status/";
  UpdateRepairURL = "http://localhost:3333/api/ticket/update/repair/";
  UpdateCostURL = "http://localhost:3333/api/ticket/update/cost/";
  getPictureURL = "http://localhost:3333/api/ticket/picture/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  issue_id! : string | null;
  ticket : TicketDto = new TicketDto();

  @Input() cost! : number;
  @Input() repair_time! : number;
  @Input() status! : string;

  constructor(
    private router : Router,
    private http : HttpClient,
    private route : ActivatedRoute
    ) {}
    
    ngOnInit(): void {
    // this.ticket = new TicketDto;
    this.issue_id = this.route.snapshot.paramMap.get('id');
    this.ticket.ticketImg = "";
    this.getAllURL += this.issue_id;
    this.UpdateStatusURL += this.issue_id;
    this.UpdateRepairURL += this.issue_id;
    this.UpdateCostURL += this.issue_id;
    this.http.get<TicketDto[]>(this.getAllURL).subscribe(
      (data) => {
        this.ticket = data[0];
        this.ticket.ticketImg = "";
        this.status = this.ticket.ticketStatus
        this.repair_time = this.ticket.ticketRepairTime
        this.cost = this.ticket.ticketCost
        this.loadImage();
      }
    );
  }

  back() : void
  {
    this.router.navigateByUrl("/acceptedTickets");
  }
  
  update() : void
  {
    if (this.ticket.ticketCost != this.cost)
    {
      this.updateCost();
    }
    if (this.ticket.ticketRepairTime != this.repair_time)
    {
      this.updateRepairTime();
    }
    if (this.ticket.ticketStatus != this.status)
    {
      this.updateStatus();
     
    }
    
    // if (error !== "")
    //   this.showErrorMessage("There has been an error")
    // if (output_message !== "")
      this.showSuccessMessage("Successfully updated ticket");
      
    this.router.navigateByUrl("/acceptedTickets");
    }
    
    updateRepairTime() : boolean
    {
      const temp = '{"repairTime": ' + this.repair_time + '}';
      this.http.put<JSON>(this.UpdateRepairURL, JSON.parse(temp) ,this.httpOptions).subscribe(
        () => {return true},
        () => {return false}
      );
      return false;
    }
    
  updateStatus() : boolean
  {
    const temp = '{"status": "' + this.status + '"}';
    this.http.put<JSON>(this.UpdateStatusURL, JSON.parse(temp) ,this.httpOptions).subscribe(
      () => {return true},
      () => {return false}
      );
      return false;
    }
    
  updateCost() : boolean
  {
    const temp = '{"cost": ' + this.cost + '}';
    this.http.put<JSON>(this.UpdateCostURL, JSON.parse(temp) ,this.httpOptions).subscribe(
      () => {return true},
      () => {return false}
    );
      return false;
  }
  
  showErrorMessage(edits :string) : void {
    alert(edits);
  }
  
  showSuccessMessage(errors :string) : void {
    
    alert(errors);
  }

  async loadImage() : Promise<void> 
  {
    await this.delay(3000)
    this.getPictureURL += this.ticket.ticketId;
    this.http.get<TicketPictureDto[]>(this.getPictureURL).subscribe(
      (data) => {
        console.log(data[0])
        this.ticket.ticketImg = data[0].pictureLink
    }
    );
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
