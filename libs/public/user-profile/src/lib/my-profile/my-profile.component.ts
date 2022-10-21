import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { PublicProfileService, SessionManagerService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit
{

  @Input() user!: UserDto;
  viewSelected!: string;
  constructor(
    private profileService : PublicProfileService,
    private router: Router,
    private sessionService : SessionManagerService
  ) {}

  ngOnInit(): void
  {
    this.user = new UserDto();
    this.viewSelected = "list"
    const id = this.sessionService.getID();
    if (id)
      this.profileService.getUser(id).subscribe(
        (response) =>
        {
          this.user = response[0];
          // console.log(this.user);
          if (this.user.email.includes("@gridwatch.com"))
          {
            this.user.name = "Guest";
            this.user.email = "guest@gridwatch.com";
          }
        }
      )

  }

  logout() : void{
    this.sessionService.logout()
    this.router.navigateByUrl("/login");
  }
}
