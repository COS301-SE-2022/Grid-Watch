import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminDto } from '@grid-watch/api/profiles/admin/api/shared/api-profiles-admin-api-dto';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {

  private createAdminURL = "api/admin/create";
  private getAdminEmailURL = "api/admin/email/";
  private getAdminContactURL = "api/admin/cell/";
  private loginURL = "api/admin/verify/";
  private getAdminURL = "api/admin/";
  private updateAdminURL = "api/admin/update/admin/";
  
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

    console.log(admins);

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
    .post<AdminDto>(this.loginURL, admin)
    .pipe(catchError(this.handleError<boolean>('login', false)));

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

}
