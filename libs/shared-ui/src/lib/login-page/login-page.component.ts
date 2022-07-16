import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute} from '@angular/router';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { PublicProfileService } from '../services/public-profile/public-profile.service';

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

  login() : void
  {
    this.user.email = "Tshego14@gmail.com"
    this.user.password = "Gbfj&hfbsh"
    this.profileService.login(this.user);
  }

  
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
