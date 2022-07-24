import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { PublicProfileService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {

  @Input() user! : UserDto;
  items = ["","","","","","","","","","",""]
  viewSelected! : string;
  constructor(
    private profileService : PublicProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = new UserDto();
    this.viewSelected = "list"
    const id = localStorage.getItem("userId");
    if (id)
    this.profileService.getUser(id).subscribe(
      (response) =>
      { 
        this.user = response[0];
        console.log(this.user);
      }
    )
  }

  logout() : void{
    localStorage.setItem("LoggedIn", "false");
    localStorage.removeItem("userId")
    this.router.navigateByUrl("/login");
  }
}
