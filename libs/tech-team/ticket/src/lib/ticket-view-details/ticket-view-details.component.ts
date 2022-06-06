import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';

@Component({
  selector: 'grid-watch-ticket-view-details',
  templateUrl: './ticket-view-details.component.html',
  styleUrls: ['./ticket-view-details.component.scss'],
})
export class TicketViewDetailsComponent implements OnInit {

  getAllURL = "http://localhost:3333/api/ticket/"
  UpdateStatusURL = "http://localhost:3333/api/ticket/update/status/";

  ticket! : TicketDto;
  issue_id! : string | null;

  constructor(
    private router : Router,
    private http : HttpClient,
    private route : ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ticket = new TicketDto();
    this.issue_id = this.route.snapshot.paramMap.get('id');
    this.getAllURL += this.issue_id;
    this.http.get<TicketDto[]>(this.getAllURL).subscribe(
      (data) => {
        this.ticket = data[0];
      }
    );
  }

  back() : void
  {
    this.router.navigateByUrl("/tickets");
  }

  accept() : void
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
        this.router.navigateByUrl("/tickets");
    },
    () =>
    {
      this.showErrorMessage()
    }
    );
  }

  
  showErrorMessage() : void {
    alert("Something went wrong accepting this ticket")
  }
  
  showSuccessMessage() : void {
    
    alert("Successfully accepted the ticket")
  }
}


