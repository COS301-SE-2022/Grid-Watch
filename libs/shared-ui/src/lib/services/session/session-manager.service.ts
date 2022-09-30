import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  // constructor() { }

  login(userId : string)
  {
    localStorage.setItem("LoggedIn", "true");
    localStorage.setItem("userId", userId);

  }

  setToken(token : string)
  {
    localStorage.setItem("accessToken", token);
    
  }

  getToken()
  {
    return localStorage.getItem("accessToken");
  }

  logout()
  {
    localStorage.removeItem("accessToken");
    localStorage.setItem("LoggedIn", "false");
    localStorage.removeItem("userId");
  }

  getID(){
    return localStorage.getItem("userId")
  }

  getLoggedIn()
  {
    return localStorage.getItem("LoggedIn")
  } 
}
