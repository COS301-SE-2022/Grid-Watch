import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-view-ticket-details',
  templateUrl: './view-ticket-details.component.html',
  styleUrls: ['./view-ticket-details.component.scss'],
})
export class ViewTicketDetailsComponent implements OnInit {

  display_name! : string;
  issue_type! : string;

  constructor() {}

  ngOnInit(): void {}
}
