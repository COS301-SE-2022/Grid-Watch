import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketDto } from 'libs/api/ticket/api/src/lib/dto/ticket.dto';

@Component({
  selector: 'grid-watch-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
})
export class EditTicketComponent implements OnInit {
  display_name! : string | null;
  default_upload! : string | null;
  issue_type! : string | null;
  description! : string | null;
  location! : string | null;
  updateURL = "http://localhost:3333/api/ticket/update";
  getTicketURL = "http://localhost:3333/api/ticket/";

  constructor(private route: ActivatedRoute, private http : HttpClient) {
  }


  ngOnInit(): void {
    this.default_upload = "assets/upload-solid.svg"
    this.display_name = "John Doe";
    const temp = this.route.snapshot.paramMap.get('id');
    this.getTicketURL = this.getTicketURL + temp
    console.log(this.getTicketURL);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    this.http.get<TicketDto[]>(this.getTicketURL, httpOptions).subscribe(
      (data) =>
      {
        console.log(data[0]);
        this.initialiseFields(data[0]);
      }
    )
  }

  fileUploaded(e: any)
  {

    const file = e.target.files[0];


    const reader = new FileReader();
    reader.onload = () => {
      this.default_upload = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  editTicket() : void
  {
    // this.http.put<TicketDto>(updateURL,)
  }

  initialiseFields(data : TicketDto)
  {
    // console.log(data);
    
    this.issue_type = data.ticket_type;
    this.description = data.ticket_description;
    this.location = data.ticket_location;
  }
}
