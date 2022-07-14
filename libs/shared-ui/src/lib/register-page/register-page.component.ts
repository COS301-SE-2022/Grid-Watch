import { Component, Input} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'grid-watch-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {  //implements OnInit {

  
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });
  
  @Input() first_name! : string;
  @Input() last_name! : string;
  @Input() email! : string;
  @Input() password! : string;
  @Input() confirm_password! : string;
  hide = true;
  hideConfirm = true;

  constructor(
    private router : Router,
    private formBuilder : FormBuilder
  ) {}

  // ngOnInit(): void {

  // }

  register() : void
  {
    console.log(this.first_name);
    console.log(this.last_name);
    console.log(this.email);
    console.log(this.password);
    console.log(this.confirm_password);
    
  }

  back() : void {
    this.router.navigate(["/login",{app:"tech-team"}]);
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
