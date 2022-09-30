import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { TechTeamProfileService, ToastService } from '@grid-watch/shared-ui';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

@Component({
  selector: 'grid-watch-register-tech-team',
  templateUrl: './register-tech-team.component.html',
  styleUrls: ['./register-tech-team.component.scss'],
})
export class RegisterTechTeamComponent implements OnInit{

  techProfile! : TechTeamDto;
  
  issue_options = ["Pothole", "Sinkhole", "Water Outage", "Broken Street Light", "Electricity Outage", "Other"];
  @Input() confirmPassword! : string;
  specialisationSelected! : boolean[]

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  hide = true;

  constructor(
    private router : Router,
    private http : HttpClient,
    private formBuilder : FormBuilder,
    private profileService : TechTeamProfileService,
    private toastService : ToastService
  ) {}

  ngOnInit(): void {
   this.techProfile = new TechTeamDto();
  //  this.techProfile.name = "TestCompany3"
  //  this.techProfile.email = "TestCompany34@gmail.com"
  //  this.techProfile.contactNumber = "0844521535";
  //  this.techProfile.password = "GFBSHAF";
  //  this.confirmPassword = "GFBSHAF";
   this.techProfile.specialisation = [];
   this.specialisationSelected = []
      for (let k = 0; k < this.issue_options.length; k++) {
        this.specialisationSelected.push(false);
      }
  }


  async register() : Promise<void> {
    if (this.techProfile.password === this.confirmPassword)
    {
      // console.log(await this.checkEmailExists(this.techProfile.email));
      
      if (await this.checkEmailExists(this.techProfile.email) !== true)
      {
        let counter = 0;
        for (let k = 0; k < this.issue_options.length; k++) {
          if (this.specialisationSelected[k] === true)
          {        
            this.techProfile.specialisation[counter++] = this.issue_options[k];
          }
        }
        this.profileService.createTechTeam(this.techProfile).subscribe(
          (response) =>
          {
            this.toastService.show('Technician Team Registered Successfully',{
              classname: 'bg-success text-light',
              delay: 5000,
              autohide: true
            });
            this.router.navigateByUrl("/login");
            //this.showSuccessMessage();
          }
        )
      }
      else
        this.toastService.show('Email already exists',{
          classname: 'bg-danger text-light',
          delay: 5000,
          autohide: true
        });
    }
    else
    {
      this.toastService.show('Passwords do not match',{
        classname: 'bg-danger text-light',
        delay: 5000,
        autohide: true
      });
      //this.showErrorMessage("Passwords dont match")
    }
    
  }
  showSuccessMessage() {
    alert("Tech Team registered");
    this.router.navigateByUrl("/login")
  }
  showErrorMessage(s : string) {
    alert(s);
  }

  back() : void {
    this.router.navigate(["/login",{app:"tech-team"}]);
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  private async checkEmailExists(email : string){
    return await this.profileService.checkEmailExist(email);
  }
}
