import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { Loader } from '@googlemaps/js-api-loader';
import { AdminDto } from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto';
import { AdminProfileService, GoogleMapsService, MessageDialogComponent, SessionManagerService } from '@grid-watch/shared-ui';
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
  adminPerm! : AdminDto;
  city! : string;
  autocomplete!: google.maps.places.Autocomplete;
  
  emailStatus = true;
  contactStatus = true;
  adminId!: string | null;
  dialogRef! : MatDialogRef<MessageDialogComponent>;
  confirmPassword! : string;
  changePassword = false;

  constructor(
    private formBuilder : FormBuilder,
    private googleMapsService : GoogleMapsService, 
    private profileService : AdminProfileService,
    public dialog: MatDialog,
    public sessionService: SessionManagerService
    ) {}

  ngOnInit(): void {
    this.admin = new AdminDto();
    this.adminPerm = new AdminDto();
    this.adminId = this.sessionService.getID();
    if (this.adminId)
     this.profileService.getAdmin(this.adminId).subscribe(
      (response) =>{
        console.log(response);
        this.admin = response[0];
        this.admin.password = "";
        this.adminPerm.email = this.admin.email;
        this.adminPerm.cities =  Object.assign([], this.admin.cities);
        this.adminPerm.contactNumber = this.admin.contactNumber;
      }
     )

     const loader = new Loader({
      apiKey: "AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE",
      version: "weekly",
      libraries: ["places","visualization"]
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
      if (this.adminPerm.email !== this.admin.email)
      {
        this.profileService.updateEmail(this.admin.id.toString(), this.admin.email).subscribe(
          (response) =>
          {
            // console.log(response);

            this.adminPerm.email = this.admin.email
          }
        )
      }
      if (this.adminPerm.contactNumber !== this.admin.contactNumber)
      {
        this.profileService.updateContactNumber(this.admin.id.toString(), this.admin.contactNumber).subscribe(
          (response) =>
          {
            // console.log(response);
            this.adminPerm.contactNumber = this.admin.contactNumber
          }
        )
      }
      if (!this.isEqual(this.admin.cities, this.adminPerm.cities))
      {
        
        this.profileService.updateCities(this.admin.id.toString(), this.admin.cities).subscribe(
          (response) =>
          {
            // console.log(response);
            this.adminPerm.cities = Object.assign([], this.admin.cities);
          }
        )
      }
      if (this.changePassword)
      {
        if ((this.admin.password === this.confirmPassword) && (this.admin.password !== ""))
        {
          this.profileService.updatePassword(this.admin.id.toString(), this.admin.password).subscribe(
            (response) =>
            {
              // console.log(response);
              this.adminPerm.cities = Object.assign([], this.admin.cities);
            }
          )
        }
        else
        {
          this.showMessage("Password", "Please make sure that your passwords match" )
        }
      }
    }
    else
    {
      this.showMessage("Login Admin","Could not find this admin ID, please login again");
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

  togglePassword()
  {
    if (this.changePassword === false)
      this.changePassword = true;
    else
     this.changePassword = false;
  }

  async checkEmailExists() {
    return await this.profileService.checkEmailExists(this.admin.email);
  }

  async checkContactExist() {
    return await this.profileService.checkContactNumberExists(this.admin.contactNumber);
  }


  showMessage(title :string, info : string ) : void{
    const temp = window.innerWidth;
      const pageData = title;
      const pageInfo = info;
      this.dialogRef = this.dialog.open(MessageDialogComponent,{
        panelClass: ['full-screen'],
        data: {pageData: pageData, pageInfo : pageInfo, return: ""},
        width: temp.toString(), 
        height: "150",
        scrollStrategy: new NoopScrollStrategy()
      },);
    
  }

  isEqual(x : string [], y : string []) : boolean
  {
    let returnValue = true;

    if (x.length !== y.length)
    {
      return false;
    }

    x.every((value, index) =>{
      if ( value !== y[index])
        returnValue = false;
    })

    return returnValue;
  }
  
}
