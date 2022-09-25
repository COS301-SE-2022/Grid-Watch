import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '@grid-watch/api/authentication';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { catchError, Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class PublicProfileService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "https://grid-watch-api.azurewebsites.net/"
    }),
  };

  private apiURL = "https://grid-watch-api.azurewebsites.net"
  private createUserURL = this.apiURL +  '/api/public/create';
  private getUserEmailURL = this.apiURL +  '/api/public/email/';
  private verifyLoginURL = this.apiURL +  '/api/public/verify';
  private getUserIDURL = this.apiURL +  '/api/public/';

  constructor(private http: HttpClient) {}

  public createUser(user: UserDto) {
    return this.http
      .post<UserDto>(this.createUserURL, user)
      .pipe(catchError(this.handleError<UserDto>('createUser', new UserDto())));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.messgae}`);

      return of(result as T);
    };
  }

  public getUserEmail(email: string): Observable<UserDto[]> {
    const tempURL = this.getUserEmailURL + email;
    return this.http
      .get<UserDto[]>(tempURL)
      .pipe(catchError(this.handleError<UserDto[]>('getEmails', [])));
  }

  public async checkEmailExists(email: string) {
    const users = await new Promise<UserDto[]>((resolve, reject) => {
      this.getUserEmail(email).subscribe((res) => {
        return resolve(res);
      });
    });

    // console.log(users.length);

    if (users.length > 0) return true;
    else return false;
  }

  public login(user: UserDto) {
    // console.log("True");
    return new Promise<Token>(
      (resolve) => {
        this.http.post<Token>(this.verifyLoginURL, user).subscribe(
          (res) =>{
            console.log(res);
            
            resolve(res);
          }
        )
        
      }
    );
    // return this.http
    //   .post<Token>(this.verifyLoginURL, user)
    //   .pipe(catchError(this.handleError<Token>('login', {accessToken: ""})));
  }

  public getUser(id : string )
  {
    const tempURL = this.getUserIDURL + id;
    return this.http.get<UserDto[]>(tempURL, this.httpOptions)
    .pipe(catchError(this.handleError<UserDto[]>('getUser', [])));
  }
}
