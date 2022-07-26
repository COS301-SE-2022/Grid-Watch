import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { TechTeamProfileService } from '@grid-watch/shared-ui';

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

  application_type!: string | undefined | null;
  techProfile!: TechTeamDto;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: TechTeamProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const logged = localStorage.getItem
    this.techProfile = new TechTeamDto();
    this.techProfile.name = 'TestCompany3';
    this.techProfile.email = 'TestCompany34@gmail.com';
    this.techProfile.contactNumber = '0844521545';
    this.techProfile.password = 'GFBSHAF';
    this.techProfile.passwordSalt = '';
    this.techProfile.dateCreated = new Date();
    this.techProfile.specialisation = [];
    console.log(this.techProfile);

    if (
      localStorage.getItem('techTeamID') !== null &&
      localStorage.getItem('loggedIn') !== null &&
      localStorage.getItem('loggedIn') === 'true'
    ) {
      this.router.navigateByUrl("/profile")
    }
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  async login(): Promise<void> {
    this.profileService.login(this.techProfile).subscribe((response) => {
      console.log(response);
      if (response) {
        localStorage.setItem('loggedIn', 'true');
        this.routeToProfile();
      } else {
        alert('Wrong email, password combination');
      }
    });
  }

  private routeToProfile() {
    this.profileService
      .getTechTeam(this.techProfile.email)
      .subscribe((response) => {
        console.log(response);
        localStorage.setItem('techTeamID', response[0].id.toString());
        this.router.navigateByUrl('/profile');
      });
  }
}
