import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-watch-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit{


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
      console.log("admin");
      this.options.push("Tickets")
      this.router_options.push("/adminViewTicket")
      
      this.options.push("Tech team")
      this.router_options.push("/techTeam")
    }
    else if (this.application_type === "public")
    {
      console.log("public");
      this.options.push("Tickets")
      this.router_options.push("/tickets")
      
      this.options.push("option 2")
      this.router_options.push("/option2")
    }
    else
    {
      console.log("tech-team");
      this.options.push("Tickets")
      this.router_options.push("/tickets")
      
      this.options.push("option 2")
      this.router_options.push("/option2")

    }
  }
}
