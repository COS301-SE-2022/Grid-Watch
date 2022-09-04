import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-ticket-view-body',
  templateUrl: './ticket-view-body.component.html',
  styleUrls: ['./ticket-view-body.component.scss'],
})
export class TicketViewBodyComponent implements OnInit {

  viewValue! : string;

  constructor() {}

  ngOnInit(): void {
    this.viewValue = "list"
  }
}
