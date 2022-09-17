import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import {
  GoogleMapsService,
  SessionManagerService,
  TechTeamProfileService,
} from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  id!: string | null;
  techTeam!: TechTeamDto;
  techTeamPerm!: TechTeamDto;

  emailStatus = true;
  nameStatus = true;
  contactStatus = true;
  confirmPassword!: string;
  changePassword = false;
  city!: string;

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  autocomplete!: google.maps.places.Autocomplete;
  issue_options = [
    'Pothole',
    'Sinkhole',
    'Water Outage',
    'Broken Street Light',
    'Broken Traffic Light',
    'Electricity Outage',
    'Other',
  ];
  specialisationSelected!: boolean[];

  constructor(
    private formBuilder: FormBuilder,
    private profileService: TechTeamProfileService,
    private sessionService: SessionManagerService,
    private googleMapsService: GoogleMapsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.techTeam = new TechTeamDto();
    this.techTeamPerm = new TechTeamDto();
    this.techTeam.name = '';
    this.id = this.sessionService.getID();
    this.specialisationSelected = [];
    this.techTeam.specialisation = [];

    if (this.id !== null) {
      this.profileService.getTechTeam(this.id).subscribe((response) => {
        console.log(response);
        console.log(this.id);
        this.techTeam = response[0];
        this.techTeamPerm.name = this.techTeam.name;
        this.techTeamPerm.email = this.techTeam.email;
        this.techTeamPerm.specialisation = [...this.techTeam.specialisation];
        this.techTeamPerm.contactNumber = this.techTeam.contactNumber;
        this.techTeamPerm.cities = [...this.techTeam.cities];
        for (let k = 0; k < this.issue_options.length; k++) {
          if (this.techTeam.specialisation.includes(this.issue_options[k]))
            this.specialisationSelected.push(true);
          else this.specialisationSelected.push(false);
        }
      });
      const loader = new Loader({
        apiKey: 'AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE',
        version: 'weekly',
        libraries: ['places', 'visualization'],
      });

      loader.load().then(
        () => {
          this.initiateAutoComplete();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
  
  update() {
    this.techTeam.specialisation = [];
    this.specialisationSelected.forEach((value, index) =>{
      if (value)
        if (!this.techTeam.specialisation.includes(this.issue_options[index]))
          this.techTeam.specialisation.push(this.issue_options[index]);
    })
    if (this.techTeamPerm.name !== this.techTeam.name)
    {
      
      this.profileService.updateName(this.techTeam.name, this.id || "").subscribe(
        (response) =>{
          console.log(response);
        }
      )
    }
    if (this.techTeamPerm.email !== this.techTeam.email)
    {
      this.profileService.updateEmail(this.techTeam.email, this.id || "").subscribe(
        (response) =>{
          console.log(response);
        }
      )
    }
    if (this.techTeamPerm.contactNumber !== this.techTeam.contactNumber)
    {
      this.profileService.updateContact(this.techTeam.contactNumber, this.id || "").subscribe(
        (response) =>{
          console.log(response);
        }
      )
    }
    if (!this.equalsArray(this.techTeam.specialisation, this.techTeamPerm.specialisation))
    {
      console.log(this.specialisationSelected);
      
      this.profileService.updateSpecialisation(this.techTeam.specialisation, this.id || "").subscribe(
        (response) =>{
          console.log(response);
          
        }
      );
    }
    if (!this.equalsArray(this.techTeam.cities, this.techTeamPerm.cities))
    {
      console.log(this.specialisationSelected);
      
      this.profileService.updateCities(this.techTeam, this.id || "").subscribe(
        (response) =>{
          console.log(response);
          
        }
      );
    }
  }

  private equalsArray(array1 : string [], array2 : string[]) : boolean
  {
    if (array1.length !== array2.length)
      return false;
      
     let retVal = true;
    for (let k = 0; k < array1.length; k++) {
      const element = array1[k];
      if (!array2.includes(element))
        retVal = false
    }
    return retVal;
  }

  toggleEmail() {
    if (this.emailStatus === false) this.emailStatus = true;
    else this.emailStatus = false;
  }

  toggleContact() {
    if (this.contactStatus === false) this.contactStatus = true;
    else this.contactStatus = false;
  }

  togglePassword() {
    if (this.changePassword === false) this.changePassword = true;
    else this.changePassword = false;
  }

  toggleName() {
    if (this.nameStatus === false) this.nameStatus = true;
    else this.nameStatus = false;
  }

  remove(i: number) {
    this.techTeam.cities.splice(i, 1);
  }

  initiateAutoComplete() {
    this.autocomplete =
      this.googleMapsService.createAutoCompleteObjectCities('pac-input');
    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
      const place = this.autocomplete.getPlace();
      if (place.geometry?.location !== undefined) {
        const pos = {
          lat: place.geometry?.location?.lat(),
          lng: place.geometry?.location?.lng(),
        };
        if (place.address_components !== undefined) {
          // console.log(place.address_components[0].long_name);
          this.city = place.address_components[0].long_name;
        }
        this.addChip();
      }
    });
  }

  addChip() {
    this.techTeam.cities.push(this.city);
    this.city = '';
  }

  async checkEmailExists(email : string){
    return await this.profileService.checkEmailExist(email);
  }

  async checkContactExists(contactNr : string){
    return await this.profileService.checkContactExist(contactNr);
  }
}
