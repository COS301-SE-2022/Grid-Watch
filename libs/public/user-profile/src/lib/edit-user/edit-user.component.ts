import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  provinces = ["Limpopo", "Gauteng", "Mpumalanga","North West", "Western Cape",
                      "Eastern Cape", "Northern Cape", "KwaZulu-Natal"]

  @Input() first_name! :string;
  @Input() last_name! :string;
  @Input() mobile_number! :string;
  @Input() email! :string;
  @Input() address! :string;
  @Input() city_town! :string;
  @Input() postcode! :string;
  @Input() province! :string;
  @Input() country! :string;

  // constructor() {}

  ngOnInit(): void {
    console.log("User_edit");
    
  }
}
