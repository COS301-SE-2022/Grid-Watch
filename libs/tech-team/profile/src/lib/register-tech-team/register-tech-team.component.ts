import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
// import { ApiProfilesTechTeamApiDto } from '/libs/api/profiles/tech-team/api/shared/techteamdto/src/lib/api-profiles-tech-team-api-shared-techteamdto';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

@Component({
  selector: 'grid-watch-register-tech-team',
  templateUrl: './register-tech-team.component.html',
  styleUrls: ['./register-tech-team.component.scss'],
})
export class RegisterTechTeamComponent {

  @Input() name! : string;
  @Input() specialisation! : string[];
  @Input() email! : string;
  @Input() contact_number! : string;
  @Input() password! : string;
  @Input() confirm_password! : string;

  // tech_profile : ApiProfilesTechTeamApiDto = new ApiProfilesTechTeamApiDto();

  issue_options = ["Pothole", "Sinkhole", "Water Outage", "Electricity Outage", "Other"];
  
  constructor(
    private router : Router
  ) {}


  register() : void {
    console.log("register");
    // console.log(this.tech_profile);
    
    
  }

  back() : void {
    this.router.navigate(["/login",{app:"tech-team"}]);
  }
}
