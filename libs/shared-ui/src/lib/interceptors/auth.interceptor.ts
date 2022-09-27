import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SessionManagerService } from '../services/session/session-manager.service';
import { SpinnerService } from '../services/spinner/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private sessionManager : SessionManagerService,
    private spinnerService : SpinnerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.spinnerService.requestStarted();
    const authToken = this.sessionManager.getToken();
    if (authToken)
    {
      const authRequest = request.clone({headers: request.headers.set("Authorization", authToken)})
      return next.handle(authRequest).pipe(
        tap(
          (event) =>{
            if (event instanceof HttpResponse)
              this.spinnerService.requestEnded();
          },
          () =>{
            this.spinnerService.resetSpinner();
          }
        )
      );
    }
    else
      return next.handle(request).pipe(
        tap(
          (event) =>{
            if (event instanceof HttpResponse)
              this.spinnerService.requestEnded();
          },
          () =>{
            this.spinnerService.resetSpinner();
          }
        )
      );;
  }
}
