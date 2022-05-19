import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'grid-watch-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  application_type! : string | undefined | null;
  @Input() email! : string;
  @Input() password! : string;
  
  constructor(private route : ActivatedRoute) {}

  ngOnInit(): void {
    const application_type = this.route.snapshot.paramMap.get('app');
    this.application_type = application_type;
    // this.application_type = this.application_type?.charAt(0).toUpperCase();
  }

  login() : void
  {
    console.log("Email: " + this.email);
    console.log("Password: " + this.password);
  }
}
