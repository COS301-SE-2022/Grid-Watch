import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '@grid-watch/api/authentication';
import { UserDto } from '@grid-watch/api/profiles/public/api/shared/api-profiles-public-api-dto';
import { TechTeamDto } from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TechTeamProfileService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "https://grid-watch-api.azurewebsites.net/"
    }),
  };

  private apiURL = "https://grid-watch-api.azurewebsites.net"
  private createTechTeamURL = this.apiURL +  '/api/techteam/create';
  private getTechTeamURL = this.apiURL +  '/api/techteam/email/';
  private getTechTeamIDURL = this.apiURL +  '/api/techteam/';
  private loginURL = this.apiURL +  '/api/techteam/verify';
  private getAllTechTeamsURL = this.apiURL +  '/api/techteam/all';
  private updateNameURL = this.apiURL +  '/api/techteam/update/name/';
  private updateEmailURL = this.apiURL +  '/api/techteam/update/email/';
  private updateContactURL = this.apiURL +  '/api/techteam/update/contactnr/';
  private getContactURL = this.apiURL +  '/api/techteam/contactnr/';
  private updateSpecialisationURL = this.apiURL +  '/api/techteam/update/specialisation/';
  private updateTeamURL = this.apiURL +  '/api/techteam/update/';
  private deleteTeamURL = "http://localhost:3333" +  '/api/techteam/delete/';

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

  public getTechTeam(email: string) {
    const tempURL = this.getTechTeamURL + email;
    return this.http
      .get<TechTeamDto[]>(tempURL)
      .pipe(catchError(this.handleError<TechTeamDto[]>('getTechTeam', [])));
  }

  public getTechTeamID(id: string) {
    const tempURL = this.getTechTeamIDURL + id;
    return this.http
      .get<TechTeamDto[]>(tempURL)
      .pipe(catchError(this.handleError<TechTeamDto[]>('getTechTeam', [])));
  }

  public async checkEmailExist(email: string) {
    const techTeam = await new Promise<TechTeamDto[]>((resolve, reject) => {
      this.getTechTeam(email).subscribe((res) => {
        return resolve(res);
      });
    });

    // console.log(users.length);

    if (techTeam.length > 0) return true;
    else return false;
  }

  public async checkContactExist(contactNr: string) {
    const techTeam = await new Promise<TechTeamDto[]>((resolve, reject) => {
      this.getTechTeamContact(contactNr).subscribe((res) => {
        return resolve(res);
      });
    });

    // console.log(users.length);

    if (techTeam.length > 0) return true;
    else return false;
  }

  public login(techProfile: TechTeamDto) {
    return this.http
      .post<Token>(this.loginURL, techProfile)
      .pipe(
        catchError(this.handleError<Token>('getTechTeam', { access_token: '' }))
      );
  }

  public getAllTechTeams() {
    return this.http
      .get<TechTeamDto[]>(this.getAllTechTeamsURL)
      .pipe(catchError(this.handleError<TechTeamDto[]>('getTechTeam', [])));
  }

  public updateName(name: string, id: string) {
    const tempUrl = this.updateNameURL + id;
    const body = {
      name: name,
    };
    return this.http
      .put<JSON>(tempUrl, body)
      .pipe(catchError(this.handleError<boolean>('updateName', false)));
  }

  public updateEmail(email: string, id: string) {
    const tempUrl = this.updateEmailURL + id;
    // console.log(tempUrl);

    const body = {
      email: email,
    };
    return this.http
      .put<JSON>(tempUrl, body)
      .pipe(catchError(this.handleError<boolean>('updateEmail', false)));
  }

  public updateContact(contact: string, id: string) {
    const tempUrl = this.updateContactURL + id;
    // console.log(tempUrl);

    const body = {
      ContactNr: contact,
    };
    return this.http
      .put<JSON>(tempUrl, body)
      .pipe(catchError(this.handleError<boolean>('updateContact', false)));
  }

  public getTechTeamContact(contact: string) {
    const tempURL = this.getContactURL + contact;
    return this.http
      .get<TechTeamDto[]>(tempURL)
      .pipe(
        catchError(this.handleError<TechTeamDto[]>('getTechTeamContact', []))
      );
  }

  public updateSpecialisation(specialisation : string[], id : string){
    const tempURL = this.updateSpecialisationURL + id;
    const body = {
      specialisation: specialisation,
    };
    // console.log(body);
    
    return this.http
      .put<JSON>(tempURL, body)
      .pipe(catchError(this.handleError<boolean>('updateSpecialisation', false)));
  }

  public updateCities(techTeam : TechTeamDto, id : string){
    const tempURL = this.updateTeamURL + id;
   
    
    return this.http
      .put<JSON>(tempURL, techTeam)
      .pipe(catchError(this.handleError<boolean>('updateCities', false)));
  }

  public deleteTechTeam(id : string){
    return this.http.delete(this.deleteTeamURL + id)
    .pipe(catchError(this.handleError<boolean>('deleteTechTeam', false)));
  }
}
