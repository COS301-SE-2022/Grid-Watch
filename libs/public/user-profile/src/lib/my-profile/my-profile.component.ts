import { Component, Input, OnInit } from '@angular/core';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { PublicProfileService } from 'libs/shared-ui/src/lib/services/public-profile/public-profile.service';

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
    private profileService : PublicProfileService
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

  changeView(){
    console.log("changing view");
    
  }
}
