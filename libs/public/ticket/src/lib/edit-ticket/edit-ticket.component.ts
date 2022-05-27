import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/ticketDto';

@Component({
  selector: 'grid-watch-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
})
export class EditTicketComponent implements OnInit {

  display_name! : string | null;
  default_upload! : string | null;
  @Input() issue_type! : string;
  @Input() other_details! : string;
  file! : File;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };


  @Input() ticket! : TicketDto;
  updateURL = "http://localhost:3333/api/ticket/update/";
  getTicketURL = "http://localhost:3333/api/ticket/";
  uploadURL = "http://localhost:3333/api/ticket/upload";

  constructor(
      private route: ActivatedRoute, 
      private http : HttpClient,
      private router : Router) {
  }


  ngOnInit(): void {
    this.ticket = new TicketDto();

    //User Data
    this.default_upload = "assets/upload-solid.svg"
    this.display_name = "John Doe";

    //Get parameters
    const temp = this.route.snapshot.paramMap.get('id');

    //Add parameter to URL
    this.getTicketURL = this.getTicketURL + temp
    this.updateURL = this.updateURL + temp
    
    this.http.get<TicketDto[]>(this.getTicketURL, this.httpOptions).subscribe(
      (data) =>
      {
        this.ticket = data[0];
        this.initialiseFields(data[0]);
      }
    )
  }

  fileUploaded(e: any)
  {

    this.file  = e.target.files[0];


    const reader = new FileReader();
    reader.onload = () => {
      this.default_upload = reader.result as string;
    }
    reader.readAsDataURL(this.file)
     
  }

  editTicket() : void
  {
    if (this.issue_type === "Other")
      this.ticket.ticket_type = this.other_details;
    else
      this.ticket.ticket_type = this.issue_type;
    this.ticket.ticket_status = "Created";
    this.ticket.ticket_create_date = new Date();
    this.ticket.ticket_upvotes = 0;

    
    const formData = new FormData();
    formData.append("photo", this.file, this.file.name);

    this.http.post<Express.Multer.File>(this.uploadURL, formData)
    .subscribe({
      next: (data) => {
        console.log(data);
        
        this.updateTicket(data.filename);
        this.showSuccessMessage();
        this.router.navigateByUrl("/tickets")
      },
      error: error => {
        this.showErrorMessage();
        this.updateTicket(this.ticket.ticket_img);
      }
    }) 
  }
  
  updateTicket(link : string) {
    this.ticket.ticket_img = link
    this.http.put<TicketDto>(this.updateURL, this.ticket, this.httpOptions).subscribe(
        () => {
          if (this.file != null)
            console.log("Successs");
        },
        () => {
          this.showErrorMessage();
        }
      ) 
  }


  showErrorMessage() {
    alert("Error editing the ticket");
  }
  
  showSuccessMessage() {
    alert("Sucessfully editted the ticket");
  }

  initialiseFields(data : TicketDto)
  {
    
    if (this.ticket.ticket_img != "")
        this.default_upload = "assets/" + this.ticket.ticket_img;
    if ((data.ticket_type === "Pothole") || (data.ticket_type === "Water Outage") ||
        (data.ticket_type === "Sinkhole")  || (data.ticket_type === "Electricity Outage") ) 
          this.issue_type = data.ticket_type;
    else
    {
      this.issue_type = "Other"
      this.other_details = data.ticket_type;
    }
  }
}
