import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.scss'],
})
export class MenuOptionsComponent implements OnInit {

  applicationType! : string | undefined;
  constructor() {}

  ngOnInit(): void {
    const temp = document.getElementById("application_type");
    this.applicationType = temp?.innerHTML;
  }
}
