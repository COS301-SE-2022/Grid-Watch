import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { TicketBodyComponent } from '../ticket-body/ticket-body.component';

@Component({
  selector: 'grid-watch-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent{
  // constructor(public dialog : MatDialog) {}

  // ngOnInit(): void {

  // }

  // openDialog()
  // {
  //   const dialogRef = this.dialog.open(DiscardTicketComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog rsult: ${result}`)
  //   });
  // }
}
