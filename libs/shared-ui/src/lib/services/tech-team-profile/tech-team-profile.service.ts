import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '@grid-watch/api/authentication';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TechTeamProfileService {
  private createTechTeamURL = 'api/techteam/create';
  private getTechTeamURL = 'api/techteam/email/';
  private getTechTeamIDURL = 'api/techteam/';
  private loginURL = 'api/techteam/verify';

  constructor(private http: HttpClient) {}

  public createTechTeam(techteam: TechTeamDto) {
    // this.http.post<TechTeamDto[]>(this.createTechTeamURL, this.tech_profile, this.httpOptions)
    //   .subscribe({
    //     next: (data) => {
    //         this.showSuccessMessage();
    //       },
    //       error: () => {
    //         this.showErrorMessage();
    //     }
    // })

    return this.http
      .post<TechTeamDto>(this.createTechTeamURL, techteam)
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

  public getTechTeam(email : string) {
    const tempURL = this.getTechTeamURL + email 
    return this.http
    .get<TechTeamDto[]>(tempURL)
    .pipe(catchError(this.handleError<TechTeamDto[]>('getTechTeam', [])));
  }

  public getTechTeamID(id : string) {
    const tempURL = this.getTechTeamIDURL + id 
    return this.http
    .get<TechTeamDto[]>(tempURL)
    .pipe(catchError(this.handleError<TechTeamDto[]>('getTechTeam', [])));
  }

  public async checkEmailExist(email : string) {
  const techTeam = await new Promise<TechTeamDto[]>((resolve, reject) => {
    this.getTechTeam(email).subscribe((res) => {
      return resolve(res);
    });
  });

  // console.log(users.length);

  if (techTeam.length > 0) return true;
  else return false;
}

public login(techProfile : TechTeamDto) 
{  
  return this.http
  .post<Token>(this.loginURL, techProfile)
  .pipe(catchError(this.handleError<Token>('getTechTeam', {access_token:""})));
}
}
