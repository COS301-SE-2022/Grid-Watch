import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionManagerService } from '../../services/session/session-manager.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(
    private sessionService : SessionManagerService,
    private router : Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const id = this.sessionService.getID()
      const logged = this.sessionService.getLoggedIn()
      if (id !== null)
      {
        if (logged !== null && logged !== "false")
        {
          return true;
        }
      }
      this.router.navigateByUrl("/login");
      return false;
      
        // return true;
  }
  
}
