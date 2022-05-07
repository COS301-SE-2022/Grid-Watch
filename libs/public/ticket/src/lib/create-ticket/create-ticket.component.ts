import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'grid-watch-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent{
  constructor() {}

  ngOnInit(): void {

  }

  // openDialog()
  // {
  //   const dialogRef = this.dialog.open(DiscardTicketComponent);

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(`Dialog rsult: ${result}`)
  //   });
  // }
}
