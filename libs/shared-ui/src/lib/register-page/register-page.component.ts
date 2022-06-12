import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(
    private router : Router
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
}
