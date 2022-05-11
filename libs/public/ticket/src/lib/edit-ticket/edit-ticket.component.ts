import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'grid-watch-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.scss'],
})
export class EditTicketComponent implements OnInit {
  default_upload! : string;
  display_name! : string | null;
  issue_type! : string | null;

  constructor(private route: ActivatedRoute) {
    

  }


  ngOnInit(): void {
    this.default_upload = "assets/upload-solid.svg";
    let temp = this.route.snapshot.paramMap.get('name');
    console.log(temp);
    this.display_name = String(temp);
    temp = this.route.snapshot.paramMap.get('issue');
    this.issue_type = temp;
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

  createTicket() : void
  {
    console.log("Call create ticket service");
  }
}
