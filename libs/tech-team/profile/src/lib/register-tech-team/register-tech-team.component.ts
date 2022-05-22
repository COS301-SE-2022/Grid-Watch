import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'grid-watch-register-tech-team',
  templateUrl: './register-tech-team.component.html',
  styleUrls: ['./register-tech-team.component.scss'],
})
export class RegisterTechTeamComponent {

  @Input() company_name! : string;
  @Input() issue_types! : string[];
  @Input() email! : string;
  @Input() contact_number! : string;
  @Input() password! : string;
  @Input() confirm_password! : string;
  issue_options = ["Pothole", "Sinkhole", "Water Outage", "Electricity Outage", "Other"];
  constructor(
    private router : Router
  ) {}


  register() : void {
    console.log("register");
    
  }

  back() : void {
    this.router.navigate(["/login",{app:"tech-team"}]);
  }
}
