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
  logged! : string | null;
  userId! : string;

  constructor() 
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
      
      this.options.push("Tickets");
      this.router_options.push("/adminViewTicket");
      
      this.options.push("Tech team");
      this.router_options.push("/techTeam");

      const x = document.getElementById("generalNavbar");
      x?.classList.add("bg-danger");

      const y = document.getElementById("classIdentifier");
      if(y != null)
        y.innerHTML = "Admin";
    }
  

  }

  dropdown() : void {
    const temp = document.getElementById("drop-down-toggle") as HTMLInputElement;
    // temp.dropdown();
  }

  logout(){
    localStorage.removeItem("adminId");
    localStorage.setItem("LoggedIn", "false");
  }
}
