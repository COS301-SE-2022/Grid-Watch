import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { PublicProfileService, SessionManagerService } from '@grid-watch/shared-ui';



@Component({
  selector: 'grid-watch-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {  

  hideRequiredControl = new UntypedFormControl(false);
  floatLabelControl = new UntypedFormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  application_type! : string | undefined | null;
  @Input() user! : UserDto;
  hide = true;
  
  constructor(private route : ActivatedRoute,
    private router : Router,
    private formBuilder : UntypedFormBuilder,
    private profileService : PublicProfileService,
    private sessionService : SessionManagerService) {}

  ngOnInit(): void {
    const application_type = this.route.snapshot.paramMap.get('app');
    this.application_type = application_type;
    this.user = new UserDto();
    this.user.email = "";
    this.user.password = "";
    this.user.passwordSalt = "";

    if (this.sessionService.getID() != null && this.sessionService.getLoggedIn() !== "false")
    {
      this.router.navigateByUrl("/profile")
    }
  }

  async login() : Promise<void>
  {
    // this.user.email = "tshego@yahoo.com"
    // this.user.password = "123456"
    // console.log(await this.profileService.login(this.user));
    // console.log(this.user);
    
    if (this.user.email !== "" && this.user.password !== "")
    {
      this.profileService.login(this.user).then(
        async (response)=>{
          // console.log(response);
          
          if (response)
          {
            // console.log(response.access_token);
            this.sessionService.setToken(response.access_token)
            this.successfulLogin()
          }
          else
          {
            this.errorLogin()
  
          }
          
        }
      )
    }
  }


  successfulLogin() {
    alert("Logged in");
    this.profileService.getUserEmail(this.user.email).subscribe(
      (response) =>{
        // console.log(response);
        this.sessionService.login(response[0].id.toString());
        
        this.router.navigateByUrl("/profile");
        
      }
    )
  }
  errorLogin() {
    alert("Wrong email, password combination");
  }

  
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
