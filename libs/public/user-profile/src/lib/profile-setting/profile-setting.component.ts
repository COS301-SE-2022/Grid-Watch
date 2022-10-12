import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { PublicProfileService, SessionManagerService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss'],
})
export class ProfileSettingComponent {//implements OnInit {

  user! : UserDto;
  password! : string;
  confirmPassword! : string;
  
  hideRequiredControl = new UntypedFormControl(false);
  floatLabelControl = new UntypedFormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  id!: string;
  updateEmail = true;
  updateUsername = true;
  updatePassword = false;
  
  constructor(
    private formBuilder : UntypedFormBuilder,
    private router : Router,
    private profileService : PublicProfileService,
    private sessionService : SessionManagerService
    ) {}


  async ngOnInit(): Promise<void> {
    this.user = new UserDto();
    this.id = this.sessionService.getID() || "";
    this.profileService.getUser(this.id).subscribe(
      (response) =>{
        this.user = response[0];
      }
    )
  }

  back() : void {
    this.router.navigate(["/login",{app:"tech-team"}]);
  }


  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  async update(){

    if (!this.updateUsername)
    {

      if (await this.checkUsernameExists() == false)
      {
        this.profileService.updateUsername(this.user.name, this.id).subscribe(
          (res)=>
          {
            console.log(res);
            
          }
        );
      }
      else
      {
        alert("Username already exists");
      }
    }
    if (!this.updateEmail)
    {
      
      if (await this.checkEmailExists()  == false)
      {
        this.profileService.updateEmail(this.user.email, this.id).subscribe(
          (res)=>
          {
            console.log(res);
            
          }
        );
      }
      else
      {
        alert("Email already exists");
      }
    }
    if (this.updatePassword)
    {
      if (this.password == this.confirmPassword)
      {
        this.profileService.updatePassword(this.password, this.id).subscribe(
          (res) =>{
            console.log(res);
            
          }
        )
      }
    }

  }
  
  async checkUsernameExists() {
    return await this.profileService.checkUsernameExists(this.user.name);
  }

  async checkEmailExists() {
    return await this.profileService.checkEmailExists(this.user.email);
  }

  toggleEmail()
  {
    if (this.updateEmail === false)
      this.updateEmail = true;
    else 
      this.updateEmail = false;
  }

  toggleUsername()
  {
    if (this.updateUsername === false)
      this.updateUsername = true;
    else 
      this.updateUsername = false;
  }

  togglePassword()
  {
    if (this.updatePassword === false)
      this.updatePassword = true;
    else 
      this.updatePassword = false;
  }
}
