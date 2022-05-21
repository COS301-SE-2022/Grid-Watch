import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {  //implements OnInit {
  
  @Input() first_name! : string;
  @Input() last_name! : string;
  @Input() email! : string;
  @Input() password! : string;
  @Input() confirm_password! : string;

  // constructor() {}

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
}