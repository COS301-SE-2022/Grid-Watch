import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagerService {

  constructor() { }

  login(userId : string)
  {
    localStorage.setItem("LoggedIn", "true");
    localStorage.setItem("userId", userId);

  }

  logout()
  {
    localStorage.setItem("LoggedIn", "false");
    localStorage.removeItem("userId");
  }
}
