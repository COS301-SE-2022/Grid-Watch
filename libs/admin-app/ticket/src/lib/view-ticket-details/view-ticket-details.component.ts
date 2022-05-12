import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-view-ticket-details',
  templateUrl: './view-ticket-details.component.html',
  styleUrls: ['./view-ticket-details.component.scss'],
})
export class ViewTicketDetailsComponent implements OnInit {

  issue_id! : string;
  default_upload! : string;

  constructor() {
    this.default_upload = "assets/pothole_example.jpg"
  }

  ngOnInit(): void {
    console.log("working");
    
  }
}
