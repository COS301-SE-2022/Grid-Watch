import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { TicketController } from 'libs/api/ticket/api/src/lib/controllers/api-ticket-api-controller.controller';
import { Router } from '@angular/router';
import { TicketDto } from '@grid-watch/api/ticket/ticketDto';
import { Express } from 'express';
import { Multer } from 'multer';



@Component({
  selector: 'grid-watch-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent{
  @Input() ticket : TicketDto = new TicketDto();

  file! : File;

  default_upload! : string;
  createTicketURL = "http://localhost:3333/api/ticket/create";
  uploadURL = "http://localhost:3333/api/ticket/upload";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  other!: boolean;
  other_details!: string;
  

  constructor(private http : HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.default_upload = "assets/upload-solid.svg";
    this.other = false;
    this.other_details = "";
  }

  fileUploaded(e: any) : void
  {

    this.file = e.target.files[0];


    const reader = new FileReader();
    reader.onload = () => {
      this.default_upload = reader.result as string;
    }
    reader.readAsDataURL(this.file)
    
    
  }

  createTicket() : void
  {
    this.ticket.ticket_status = "Created";
    this.ticket.ticket_create_date = new Date();
    this.ticket.ticket_upvotes = 0;
    console.log(this.ticket);
    
      const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
    
        this.http.post<Express.Multer.File>(this.uploadURL, formData)
        .subscribe({
          next: data => {
              console.log(data.filename);
              // this.router.navigateByUrl("/tickets");
              this.ticket.ticket_img = data.filename
              this.uploadTicket();
          },
          error: error => {
              console.error('There was an error!', error);
          }
      })
    

  //   this.http.post<TicketDto>(this.createTicketURL, this.ticket, this.httpOptions)
  //   .subscribe({
  //     next: data => {
  //         console.log(data);
  //         this.router.navigateByUrl("/tickets");
  //     },
  //     error: error => {
  //         console.error('There was an error!', error);
  //     }
  // })
    
    
  }

  uploadTicket() {

      this.http.post<TicketDto>(this.createTicketURL, this.ticket, this.httpOptions)
    .subscribe({
      next: data => {
          console.log(data);
          this.router.navigateByUrl("/tickets");
      },
      error: error => {
          console.error('There was an error!', error);
      }
  })
  }
  // openDialog()
  // {
  //   const dialogRef = this.dialog.open(DiscardTicketComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog rsult: ${result}`)
  //   });
  // }
}

