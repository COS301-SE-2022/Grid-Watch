import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  applicationType: string | undefined;
  constructor() {}

  ngOnInit(): void {
    const temp = document.getElementById("application_type");
    this.applicationType = temp?.innerHTML;
  }
}
