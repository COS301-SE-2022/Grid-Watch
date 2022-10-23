import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '@grid-watch/api/authentication';
import { AdminDto } from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {
  private apiURL = "https://grid-watch-api-2.azurewebsites.net"
  private createAdminURL = this.apiURL +  "/api/admin/create";
  private getAdminEmailURL = this.apiURL +  "/api/admin/email/";
  private getAdminContactURL = this.apiURL +  "/api/admin/cell/";
  private loginURL = this.apiURL +  "/api/admin/verify/";
  private getAdminURL = this.apiURL +  "/api/admin/";
  private updateAdminURL = this.apiURL +  "/api/admin/update/admin/";
  private updateEmailURL = this.apiURL +  "/api/admin/update/email/";
  private updateContactNumberURL = this.apiURL +  "/api/admin/update/cell/";
  private updateCitiesURL = this.apiURL +  "/api/admin/update/cities/";
  private updatePasswordURL = this.apiURL +  "/api/admin/update/password/";
  
  constructor(
    private http : HttpClient
  ) { }

  createAdmin(admin : AdminDto)
  {
    return this.http.post<AdminDto>(this.createAdminURL, admin)
    .pipe(catchError(this.handleError<boolean>('createAdmin', false)));

  }

  private handleError<T>(operation = 'operation', result?: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.messgae}`);

      return of(result as T);
    };
  }

  async checkEmailExists( email : string)
  {
    const admins = await new Promise<AdminDto[]>((resolve, reject) => {
      this.getAdminEmail(email).subscribe((res) => {
        return resolve(res);
      });
    });

    // console.log(admins);

    if (admins.length > 0) return true;
    else return false;
  }

  async checkContactNumberExists( contact : string)
  {
    const admins = await new Promise<AdminDto[]>((resolve, reject) => {
      this.getAdminContact(contact).subscribe((res) => {
        return resolve(res);
      });
    });

    // console.log(users.length);

    if (admins.length > 0) return true;
    else return false;
  }

  public getAdminEmail(email: string): Observable<AdminDto[]> {
    const tempURL = this.getAdminEmailURL + email;
    return this.http
      .get<AdminDto[]>(tempURL)
      .pipe(catchError(this.handleError<AdminDto[]>('getAdminEmail', [])));
  }

  public getAdminContact(contact: string): Observable<AdminDto[]> {
    const tempURL = this.getAdminContactURL + contact;
    return this.http
      .get<AdminDto[]>(tempURL)
      .pipe(catchError(this.handleError<AdminDto[]>('getAdminContact', [])));
  } 

  public login(admin : AdminDto)
  {
    return this.http
    .post<Token>(this.loginURL, admin)
    .pipe(catchError(this.handleError<Token>('login', {access_token:""})));

  }

  public getAdmin(id : string)
  {
    const tempURL = this.getAdminURL + id;
    return this.http
    .get<AdminDto[]>(tempURL)
    .pipe(catchError(this.handleError<AdminDto[]>('getAdmin', [])));

  }

  public updateAdmin(id : string, admin : AdminDto )
  {
    const tempURL = this.updateAdminURL + id
    return this.http
    .put<AdminDto>(tempURL, admin)
    .pipe(catchError(this.handleError<boolean>('getAdmin', false)));
  }

  public updateEmail(id : string, email : string )
  {
    const body = {"email" : email}
    const tempURL = this.updateEmailURL + id
    return this.http
    .put<JSON>(tempURL, body)
    .pipe(catchError(this.handleError<boolean>('updateEmail', false)));
  }

  public updateContactNumber(id : string, contactNumber : string )
  {
    const body = {"cell" : contactNumber};    
    const tempURL = this.updateContactNumberURL + id;
    return this.http
    .put<JSON>(tempURL, body)
    .pipe(catchError(this.handleError<boolean>('updateContactNumber', false)));
  }

  public updateCities(id : string, cities : string [] )
  {
    const body = {"cities" : cities};    
    const tempURL = this.updateCitiesURL + id;
    return this.http
    .put<JSON>(tempURL, body)
    .pipe(catchError(this.handleError<boolean>('updateCities', false)));
  }

  public updatePassword(id : string, password : string )
  {
    const body = {"newPassword" : password};    
    const tempURL = this.updatePasswordURL + id;
    return this.http
    .put<JSON>(tempURL, body)
    .pipe(catchError(this.handleError<boolean>('updatePassword', false)));
  }

}
