import { Component, OnInit } from '@angular/core';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { TechTeamProfileService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-tech-team-page',
  templateUrl: './tech-team-page.component.html',
  styleUrls: ['./tech-team-page.component.scss'],
})
export class TechTeamPageComponent implements OnInit {

  items: string [] =  ["",""]
  techTeams! : TechTeamDto [];
  constructor(
    private techTeamService: TechTeamProfileService
  ) {}

  async ngOnInit(): Promise<void> {
    for (let k = 0; k < 10; k++) {
      this.items.push(k.toString()
      );
      
    }

    this.techTeamService.getAllTechTeams().subscribe(
      (response) =>{
        this.techTeams = response;
      }
    );
  }
}
