import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'grid-watch-admin-view-body',
  templateUrl: './admin-view-body.component.html',
  styleUrls: ['./admin-view-body.component.scss'],
})
export class AdminViewBodyComponent implements OnInit {
  constructor(private router : Router) {}

  ngOnInit(): void {}

  viewTicket() : void {
    console.log("GO to ticket view admin");
    this.router.navigateByUrl("/adminViewTicketDetails");
  }
}
