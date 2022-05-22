import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-register-tech-team',
  templateUrl: './register-tech-team.component.html',
  styleUrls: ['./register-tech-team.component.scss'],
})
export class RegisterTechTeamComponent implements OnInit {

  @Input() company_name! : string;
  @Input() issue_types! : string[];
  @Input() email! : string;
  @Input() contact_number! : string;
  @Input() password! : string;
  @Input() confirm_password! : string;
  issue_options = ["Pothole", "Sinkhole", "Water Outage", "Electricity Outage", "Other"];
  constructor() {}

  ngOnInit(): void {}

  register() : void {

  }

  back() : void {

  }
}
