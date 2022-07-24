import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Loader } from '@googlemaps/js-api-loader';
import { AdminDto } from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto';
import { AdminProfileService, GoogleMapsService } from '@grid-watch/shared-ui';
import { profile } from 'console';

@Component({
  selector: 'grid-watch-account-information',
  templateUrl: './account-information.component.html',
  styleUrls: ['./account-information.component.scss'],
})
export class AccountInformationComponent implements OnInit {

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  admin! : AdminDto;
  city! : string;
  autocomplete!: google.maps.places.Autocomplete;
  confirmPassword! : string;

  emailStatus = true;
  contactStatus = true;
  adminId!: string | null;

  constructor(
    private formBuilder : FormBuilder,
    private googleMapsService : GoogleMapsService, 
    private profileService : AdminProfileService
    ) {}

  ngOnInit(): void {
    this.admin = new AdminDto();
    this.admin.password = "HDFVHJW"
    this.adminId = localStorage.getItem("adminId")
    if (this.adminId)
     this.profileService.getAdmin(this.adminId).subscribe(
      (response) =>{
        console.log(response);
        this.admin = response[0];
      }
     )

     const loader = new Loader({
      apiKey: "AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE",
      version: "weekly",
      libraries: ["places"]
    });
    
    loader.load().then(() => {
        this.initiateAutoComplete();
      }, (error) =>{console.log(error);
      });
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  remove(i : number){
    this.admin.cities.splice(i, 1);
  }

  initiateAutoComplete()
  {
    this.autocomplete = this.googleMapsService.createAutoCompleteObjectCities("pac-input");
    google.maps.event.addListener(this.autocomplete, "place_changed" , 
      () =>{
        const place = this.autocomplete.getPlace()
        if (place.geometry?.location !== undefined)
        {
          const pos = {
            lat: place.geometry?.location?.lat(),
          lng: place.geometry?.location?.lng()
          }
          if (place.address_components !== undefined)
          {
            // console.log(place.address_components[0].long_name);
            this.city = place.address_components[0].long_name;
          }
          this.addChip();
          
        }
      })
  }

  async update(){
    if (this.adminId)
    {
      if (await this.checkEmailExists() == false)  
      {
        if (await this.checkContactExist() == false)
        {
          this.profileService.updateAdmin(this.adminId, this.admin).subscribe(
            (response) =>
            {
              console.log(response);
            }
          )
        }
        else
        {
          this.showMessage("Contact already exists");
        }
      } 
      else
      {
        this.showMessage("Email already exists");
      }   
    }
    else
    {
      this.showMessage("Could not find this admin ID, please login again");
    }
  }

  addChip(){
    this.admin.cities.push(this.city);
    this.city = "";
  }

  toggleEmail(){
    if (this.emailStatus === false)
      this.emailStatus = true;
    else
    this.emailStatus = false;
  }

  toggleContact(){
    if (this.contactStatus === false)
      this.contactStatus = true;
    else
     this.contactStatus = false;
  }

  async checkEmailExists() {
    return await this.profileService.checkEmailExists(this.admin.email);
  }

  async checkContactExist() {
    return await this.profileService.checkContactNumberExists(this.admin.contactNumber);
  }

  showMessage(s : string)
  {
    alert(s);
  }
}
