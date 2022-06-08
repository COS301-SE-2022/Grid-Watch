import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { techTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

@Component({
  selector: 'grid-watch-register-tech-team',
  templateUrl: './register-tech-team.component.html',
  styleUrls: ['./register-tech-team.component.scss'],
})
export class RegisterTechTeamComponent {

  @Input() confirm_password! : string;

  tech_profile : techTeamDto = new techTeamDto();
  
  createTechTeamURL = "http://localhost:3333/api/techteam/create";
  issue_options = ["Pothole", "Sinkhole", "Water Outage", "Electricity Outage", "Other"];
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private router : Router,
    private http : HttpClient
  ) {}


  register() : void {
    this.http.post<techTeamDto[]>(this.createTechTeamURL, this.tech_profile, this.httpOptions)
      .subscribe({
        next: (data) => {
            this.showSuccessMessage();
          },
          error: () => {
            this.showErrorMessage();
        }
    })
    
    
  }
  showSuccessMessage() {
    alert("Tech Team registered");
  }
  showErrorMessage() {
    alert("Tech Team registering gone wrong");
  }

  back() : void {
    this.router.navigate(["/login",{app:"tech-team"}]);
  }
}
