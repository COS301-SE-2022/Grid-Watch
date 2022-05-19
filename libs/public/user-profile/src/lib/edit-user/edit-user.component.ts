import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  provinces = ["Limpopo", "Gauteng", "Mpumalanga","North West", "Western Cape",
                      "Eastern Cape", "Northern Cape", "KwaZulu-Natal"]

  constructor() {}

  ngOnInit(): void {}
}
