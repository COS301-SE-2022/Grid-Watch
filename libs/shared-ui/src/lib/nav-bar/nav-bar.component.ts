import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  logged! : string | null;
  userId! : string;

  constructor(
    private router : Router
  ) 
  {
    this.options = [];
    this.router_options = [];
  }

  ngOnInit(): void {
    this.logged = localStorage.getItem("LoggedIn");
    const temp = document.getElementById("application_type");
      if (temp)
    this.application_type = temp.innerHTML;
    if (this.application_type === "admin")
    {
      this.login_url = "/login";
      
      /*this.options.push("Tickets");
      this.router_options.push("/adminViewTicket");
      
      this.options.push("Tech team");
      this.router_options.push("/techTeam");*/

      const y = document.getElementById("classIdentifier");
      if(y != null)
        y.innerHTML = "Admin";
    }
    else if (this.application_type === "tech-team")
    {
      
      this.login_url = "/login";
      
      this.options.push("Available Tickets");
      this.router_options.push("/tickets");
      
      this.options.push("Accepted Tickets");
      this.router_options.push("/acceptedTickets");


      const y = document.getElementById("classIdentifier");
      if(y != null)
        y.innerHTML = "Technician Team";
    }
    else
    {
      this.login_url = "/login";
      
      this.options.push("Tickets");
      this.router_options.push("/tickets");      

      const y = document.getElementById("classIdentifier");
      if(y != null)
        y.innerHTML = "Citizens";
    }


  }

  dropdown() : void {
    const temp = document.getElementById("drop-down-toggle") as HTMLInputElement;
    // temp.dropdown();
  }

  logout(){
    this.logged = "false";
    localStorage.removeItem("adminId");
    localStorage.setItem("LoggedIn", "false");
    this.router.navigateByUrl("/login")
  }
}
