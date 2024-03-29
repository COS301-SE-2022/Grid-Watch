import { HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { MatGridList } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'grid-watch-ticket-body',
  templateUrl: './ticket-body.component.html',
  styleUrls: ['./ticket-body.component.scss'],
})
export class TicketBodyComponent implements OnInit {

  viewValue! : "map" | "list"
  // constructor() {}

  ngOnInit(): void {
    this.viewValue = "list";
  }

}
