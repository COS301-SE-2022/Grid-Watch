import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AdminDto } from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto';
import { AdminProfileService, SessionManagerService,ToastService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  hide = true;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  admin! : AdminDto;
  confirmPassword! : string;
  constructor(
    private formBuilder : FormBuilder,
    private profileService : AdminProfileService,
    private router : Router,
    private sessionService : SessionManagerService,
    private toastService : ToastService
  ) {}

  ngOnInit(): void {
    this.admin = new AdminDto();
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  login() : void {
    // console.log(this.admin);
    
    this.profileService.login(this.admin).subscribe(
      (response) => {
        if (response)
        {
          // console.log(response);
          this.toastService.show('Successfully logged in',{
            classname:'bg-success text-light',
            delay: 5000,
            autohide: true
          })
          this.sessionService.setToken(response.access_token)
          this.successfulLogin();
        }
        else
        {
          this.toastService.show('Wrong username or password',{
            classname:'bg-danger text-light',
            delay: 5000,
            autohide: true
          })
          
        }
        
      }
    )
    
  }

  showMessage( s : string ){
    alert(s);
  }

  successfulLogin() {
    this.profileService.getAdminEmail(this.admin.email).subscribe(
      (response) =>{
        this.sessionService.login(response[0].id.toString())
        this.router.navigateByUrl("/profile");        
      }
    )
  }
}
