import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent implements OnInit {

  option! : string;
  // constructor() {}

  ngOnInit(): void {
    this.option = "accountInformation";
  }
}
