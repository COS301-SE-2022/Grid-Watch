import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { SessionManagerService } from '../../shared-ui/src';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    // private sessionService: SessionManagerService,
    private reflector : Reflector
  ){}

  canActivate(
    context: ExecutionContext,
   ): boolean | Promise<boolean> | Observable<boolean> {
    // const id = this.sessionService.getID()
    // const logged = this.sessionService.getLoggedIn()
    // if (id !== null)
    // {
    //   if (logged !== null && logged !== "false")
    //   {
    //     return true;
    //   }
    // }
    // // this.router.navigateByUrl("/login");
    // return false;
    
    const request = context.switchToHttp().getRequest();
    Logger.log(request)
    // Logger.log(logged)
      return false;
  }
}
