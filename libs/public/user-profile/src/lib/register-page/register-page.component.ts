import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { PublicProfileService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  
  hideRequiredControl = new UntypedFormControl(false);
  floatLabelControl = new UntypedFormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  
  @Input() user! : UserDto;
  @Input() confirmPassword! : string;
  hide = true;
  hideConfirm = true;

  constructor(
    private router : Router,
    private formBuilder : UntypedFormBuilder, 
    private profileService : PublicProfileService
  ) {}

  ngOnInit(): void {
    this.user = new UserDto();
  }

  async register() : Promise<void>
  {
    // this.user.name = "Tshego";
    // this.user.email = "Tshego14@gmail.com";
    // this.user.password = "Gbfj&hfbsh";
    // this.confirmPassword = "Gbfj&hfbsh";
    if (this.user.password === this.confirmPassword)
    {
     
      // console.log(await this.checkEmailExist());
      
      if (await this.checkEmailExist())
      {
        alert("Email already exists!")
      }
      else
      {
        this.profileService.createUser(this.user).subscribe(
          () => {
            alert("Created user successfully")
            this.router.navigateByUrl("/login") ;
          },
          () => {
            alert("Error while creating user")
          }
        );
      }
      
    }
  }

  async checkEmailExist() : Promise<boolean>
  {
    return await this.profileService.checkEmailExists(this.user.email);
    
  }

  back() : void {
    this.router.navigate(["/login",{app:"tech-team"}]);
  }


  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
