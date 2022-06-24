import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'grid-watch-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {


  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  formOptions = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  application_type! : string | undefined | null;
  @Input() email! : string;
  @Input() password! : string;
  hide = true;
  
  constructor(private route : ActivatedRoute,
    private formBuilder : FormBuilder) {}

  ngOnInit(): void {
    const application_type = this.route.snapshot.paramMap.get('app');
    this.application_type = application_type;
  }

  login() : void
  {
    console.log("Email: " + this.email);
    console.log("Password: " + this.password);
  }

  
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
