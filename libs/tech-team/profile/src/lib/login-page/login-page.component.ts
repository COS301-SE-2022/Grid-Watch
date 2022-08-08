import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { SessionManagerService, TechTeamProfileService } from '@grid-watch/shared-ui';

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
    private router: Router,
    private sessionService : SessionManagerService
  ) {}

  ngOnInit(): void {
    this.techProfile = new TechTeamDto();
    this.techProfile.dateCreated = new Date();
    this.techProfile.specialisation = [];
    console.log(this.techProfile);

    if (
      this.sessionService.getID() !== null &&
      this.sessionService.getLoggedIn() !== null &&
      this.sessionService.getLoggedIn() === 'true'
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
        this.sessionService.login(response[0].id.toString())
        this.router.navigateByUrl('/profile');
      });
  }
}
