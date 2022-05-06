import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-ticket-body',
  templateUrl: './ticket-body.component.html',
  styleUrls: ['./ticket-body.component.scss'],
})
export class TicketBodyComponent implements OnInit {

  public name : string;
  public surname : string;
  public issue_type : string;
  public avatar : string;
  public issue_img : string;
  public upvotes : number;

  constructor() {
    this.name = "";
    this.surname = "";
    this.issue_type = "";
    this.avatar = "";
    this.issue_img = "";
    this.upvotes = 0;
  }
  
  ngOnInit(): void {
    this.name = "John"
    this.surname = "Doe"
    this.issue_type = "Pothole"
    this.avatar = "assets/user-solid.svg";
    this.issue_img = "assets/pothole_example.jpg";
    this.upvotes = 0;
  }

  IncreaseUpvote(): void
  {
    this.upvotes++;
  }
}
