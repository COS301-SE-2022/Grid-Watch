import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'grid-watch-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent implements OnInit {
  dataType!: string;
  dataInfo!: string;
  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    // this.dataValue = data.pageData;
  }

  ngOnInit(): void {
    this.dataType = this.data.pageData;
    this.dataInfo = this.data.pageInfo;
  }

  close()
  {
    this.dialogRef.close();
  }

  login(){
    this.router.navigateByUrl("/login");
    this.dialogRef.close();
    
  }

  guest(){
    this.dialogRef.close("Guest");
  }
}
