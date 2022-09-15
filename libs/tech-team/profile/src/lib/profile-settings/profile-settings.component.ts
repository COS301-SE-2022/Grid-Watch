import { Component, OnInit } from '@angular/core';
import { SessionManagerService, TechTeamProfileService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {

  id!: string;

  constructor(
    private profileService : TechTeamProfileService,
    private sessionService : SessionManagerService
    ) {}

  ngOnInit(): void {
    this.id = this.sessionService.getID() || "";
    this.profileService.getTechTeam(this.id).subscribe(
      (response) =>{
        console.log(response);
        
      }
    )
  }
}
