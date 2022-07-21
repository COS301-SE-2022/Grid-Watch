import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { AdminDto } from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto';
import { AdminProfileService } from '@grid-watch/shared-ui';

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
    private profileService : AdminProfileService
  ) {}

  ngOnInit(): void {
    this.admin = new AdminDto();
    this.admin.email = "test3@gmail.com"
    this.admin.password = "HDFVHJW"
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  login() : void {
    this.profileService.login(this.admin).subscribe(
      (response) => {
        if (response)
        {
          this.showMessage("Successfully logged in");
        }
        else
        {
          this.showMessage("Wrong email, password combination");
        }
        
      }
    )
    
  }

  showMessage( s : string ){
    alert(s);
  }
}
