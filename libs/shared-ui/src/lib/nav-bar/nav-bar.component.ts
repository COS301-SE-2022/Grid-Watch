import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit{

  login_url! : string;
  application_type! : string | undefined;
  options! : string[];
  router_options! : string[];

  constructor() 
  {
    this.options = [];
    this.router_options = [];
  }

  ngOnInit(): void {
    const temp = document.getElementById("application_type");
    this.application_type = temp?.innerHTML;
    if (this.application_type === "admin")
    {
      this.login_url = "/login";
      
      this.options.push("Tickets");
      this.router_options.push("/adminViewTicket");
      
      this.options.push("Tech team");
      this.router_options.push("/techTeam");
    }
    else if (this.application_type === "tech-team")
    {
      
      this.login_url = "/login";
      
      this.options.push("Available Tickets");
      this.router_options.push("/tickets");
      
      this.options.push("Accepted Tickets");
      this.router_options.push("/acceptedTickets");
    }
    else
    {
      this.login_url = "/login";
      
      this.options.push("Tickets");
      this.router_options.push("/tickets");
      
      // this.options.push("option 2");
      // this.router_options.push("/option2");

    }
  }

  dropdown() : void {
    const temp = document.getElementById("drop-down-toggle") as HTMLInputElement;
    // temp.dropdown();
  }
}
