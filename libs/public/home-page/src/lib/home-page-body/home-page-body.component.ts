import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-home-page-body',
  templateUrl: './home-page-body.component.html',
  styleUrls: ['./home-page-body.component.scss'],
})
export class HomePageBodyComponent implements OnInit{

  application_type! : string | undefined;

  ngOnInit() : void {
    const temp = document.getElementById("application_type");
    this.application_type = temp?.innerHTML;
  }
}
