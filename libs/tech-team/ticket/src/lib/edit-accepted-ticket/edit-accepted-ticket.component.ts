import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';

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
    this.getAllURL += this.issue_id;
    this.UpdateStatusURL += this.issue_id;
    this.UpdateRepairURL += this.issue_id;
    this.UpdateCostURL += this.issue_id;
    this.http.get<TicketDto[]>(this.getAllURL).subscribe(
      (data) => {
        this.ticket = data[0];
        this.status = this.ticket.ticket_status
        this.repair_time = this.ticket.ticket_repair_time
        this.cost = this.ticket.ticket_cost
      }
    );
  }

  back() : void
  {
    this.router.navigateByUrl("/acceptedTickets");
  }
  
  update() : void
  {
    let output_message= "";
    let error = "";
    if (this.ticket.ticket_cost != this.cost)
    {
      if (this.updateCost())
      {
        output_message += "Cost ";
      }
      else
      {
        error += "Cost ";
      }
    }
    if (this.ticket.ticket_repair_time != this.repair_time)
    {
      if (this.updateRepairTime())
      {
        output_message += "Repair time ";
      }
      else
      {
        error += "Repair Time ";
      }
    }
    if (this.ticket.ticket_status != this.status)
    {
      if (this.updateStatus())
      {
        output_message += "Status";
      }
      else
      {
        error += "Status";
      }
     
    }
    
    if (error != "")
      this.showErrorMessage(error)
      if (output_message != "")
      this.showSuccessMessage(output_message);
      
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
    alert("Updated " + edits);
  }
  
  showSuccessMessage(errors :string) : void {
    
    alert("The Following updates encountered problems" + errors);
  }

}
