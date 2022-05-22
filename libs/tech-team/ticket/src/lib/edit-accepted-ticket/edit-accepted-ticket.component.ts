import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/ticketDto';

@Component({
  selector: 'grid-watch-edit-accepted-ticket',
  templateUrl: './edit-accepted-ticket.component.html',
  styleUrls: ['./edit-accepted-ticket.component.scss'],
})
export class EditAcceptedTicketComponent implements OnInit {
 

  getAllURL = "http://localhost:3333/api/ticket/"
  UpdateStatusURL = "http://localhost:3333/api/ticket/update/status/";
  issue_type! : string;
  img_link! : string;
  description! : string;
  create_date! : Date;
  address! : string;
  city! : string;
  issue_id! : string | null;

  @Input() cost! : number;
  @Input() repair_time! : number;
  @Input() status! : string;

  constructor(
    private router : Router,
    private http : HttpClient,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.issue_id = this.route.snapshot.paramMap.get('id');
    this.getAllURL += this.issue_id;
    this.http.get<TicketDto[]>(this.getAllURL).subscribe(
      (data) => {
        this.initialiseTicket(data[0]);
      }
    );
  }

  back() : void
  {
    this.router.navigateByUrl("/tickets");
  }

  update() : void
  {
    this.UpdateStatusURL += this.issue_id;
    // console.log(this.UpdateStatusURL);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    const temp = {status: "Accepted"}
    this.http.put<string>(this.UpdateStatusURL, temp ,httpOptions).subscribe(
      (data) => {
        console.log(data);
        this.showSuccessMessage();
    },
    () =>
    {
      this.showErrorMessage()
    }
    );
  }
  
  initialiseTicket( data : TicketDto) {
    this.issue_type = data.ticket_type;
    this.description = data.ticket_description;
    this.create_date = data.ticket_create_date;
    this.address = data.ticket_location;
    this.city = data.ticket_city;
    this.repair_time = data.ticket_repair_time;
    this.status = data.ticket_status;
    this.cost = data.ticket_cost;
    // this.img_link = 
  }
  
  showErrorMessage() : void {
    alert("Something went wrong accepting this ticket")
  }
  
  showSuccessMessage() : void {
    
    alert("Successfully accepted the ticket")
  }

  showCloseButton() : void {
    if (this.status === "Finished")
    {
      // const button = document.getElementById("update_button");
      // button?.set
      // console.log(button);
      
    }
  }
}
