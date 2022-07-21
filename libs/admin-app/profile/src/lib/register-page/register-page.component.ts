import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Loader } from '@googlemaps/js-api-loader';
import { AdminDto } from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto';
import { GoogleMapsService } from '@grid-watch/shared-ui';

@Component({
  selector: 'grid-watch-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {

  hide = true;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  city! : string;
  autocomplete!: google.maps.places.Autocomplete;
  admin! : AdminDto;
  confirmPassword! : string;

  constructor(
    private formBuilder : FormBuilder,
    private googleMapsService : GoogleMapsService
  ) {}

  ngOnInit(): void {
    this.city = "";
    this.confirmPassword = "";
    this.admin = new AdminDto();
    this.admin.cities = [];

    
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

  register()
  {
    this.admin.dateCreated = new Date();
    

    console.log(this.admin);
    
  }

  addChip(){
    this.admin.cities.push(this.city);
    this.city = "";
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
            console.log(place.address_components[0].long_name);
            this.city = place.address_components[0].long_name;
          }
          this.addChip();
          
        }
      })
  }
}
