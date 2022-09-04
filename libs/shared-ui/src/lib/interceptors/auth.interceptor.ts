import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionManagerService } from '../services/session/session-manager.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private sessionManager : SessionManagerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const authToken = this.sessionManager.getToken();
    if (authToken)
    {
      const authRequest = request.clone({headers: request.headers.set("Authorization", authToken)})
      return next.handle(authRequest);
    }
    else
      return next.handle(request);
  }
}
