import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { PublicProfileService } from 'libs/shared-ui/src/lib/services/public-profile/public-profile.service';

@Component({
  selector: 'grid-watch-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  application_type! : string | undefined | null;
  @Input() user! : UserDto;
  hide = true;
  
  constructor(private route : ActivatedRoute,
    private formBuilder : FormBuilder,
    private profileService : PublicProfileService) {}

  ngOnInit(): void {
    const application_type = this.route.snapshot.paramMap.get('app');
    this.application_type = application_type;
    this.user = new UserDto();
  }

  async login() : Promise<void>
  {
    this.user.email = "Tshego14@gmail.com"
    this.user.password = "Gbfj&hfbshw"
    console.log(await this.profileService.login(this.user));
    
    this.profileService.login(this.user).subscribe(
      (response)=>{
        if (response)
        {
          this.successfulLogin()
        }
        else
        {
          this.errorLogin()

        }
        
      }
    )
  }
  successfulLogin() {
    alert("Logged in");
    localStorage.setItem("LoggedIn", "true");
  }
  errorLogin() {
    alert("Wrong email, password combination");
  }

  
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
