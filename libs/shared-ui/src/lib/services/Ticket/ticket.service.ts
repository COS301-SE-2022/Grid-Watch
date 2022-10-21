import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { catchError, finalize, Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';


@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "https://grid-watch-api.azurewebsites.net"
    }),
  };

  private apiURL = "https://grid-watch-api.azurewebsites.net"
  private getAllURL = this.apiURL +  '/api/ticket/all/tickets';
  private upvoteURL = this.apiURL +  '/api/ticket/update/upvotes/';
  private upvoteURLUser = this.apiURL +  '/api/public/add/upvote/';
  private getTicketIssue = this.apiURL +  '/api/ticket/issue/';
  private getPictureURL = this.apiURL +  '/api/ticket/picture/';
  private getTicketURL = this.apiURL +  '/api/ticket/';
  private getSubtaskURL = this.apiURL +  '/api/ticket/subtasks/';
  private createSubtaskURL = this.apiURL +  '/api/ticket/subtask/create/';
  private uploadURL = this.apiURL +  '/api/ticket/upload';
  private updateURL = this.apiURL +  '/api/ticket/update/';
  private createPictureURL = this.apiURL +  '/api/ticket/picture/create/';
  private updatePictureURL = this.apiURL +  '/api/ticket/picture/update/';
  private createTicketURL = this.apiURL +  '/api/ticket/create';
  private UpdateStatusURL = this.apiURL +  '/api/ticket/update/status/';
  private getTicketStatus = this.apiURL +  '/api/ticket/status/';
  private updateRepairURL = this.apiURL +  '/api/ticket/update/repair/';
  private updateCostURL = this.apiURL +  '/api/ticket/update/cost/';
  private updateAssignedTechTeamURL = this.apiURL + 
    '/api/ticket/update/assignedTeam//techTeam';
  private getAITicketCostURL = this.apiURL +  '/api/ticketAI/estimate/cost';
  private getAITicketTimeURL = this.apiURL +  '/api/ticketAI/estimate/time';
  private deleteURL = this.apiURL + "/api/ticket/delete/"; 
  private getTicketsSomeURL = this.apiURL + "/api/ticket/some/tickets/"; 
  private getTicketUserURL = "http://localhost:3333/api/ticket/all/tickets/"
  constructor(private http: HttpClient,  private storage : AngularFireStorage) {}

  public getUserTicket(userID : string, skip: number, take : number ){
    
    return this.http.get<TicketDto[]>(this.getTicketUserURL + userID + "/" + skip + "/" + take)
    .pipe(
      catchError(this.handleError<TicketDto[]>('getUserTicket', []))
    );
  }
  
  public print(message: string) {
    // console.log(message);
  }

  updateTicketStatus(issueID: string, status_: string) {
    const temp = { status: status_ };
    const tempURL = this.UpdateStatusURL + issueID;
    // console.log(temp);

    return this.http
      .put<string>(tempURL, temp, this.httpOptions)
      .pipe(
        catchError(this.handleError<string>('updateTicketStatus', 'Error'))
      );
  }

  updateTicketRepairTime(issueID: string, time: number) {
    const temp = '{"repairTime": ' + time + '}';
    const tempURL = this.updateRepairURL + issueID;
    return this.http
      .put<JSON>(tempURL, JSON.parse(temp), this.httpOptions)
      .pipe(
        catchError(
          this.handleError<JSON>(
            'updateTicketRepairTime',
            JSON.parse('{"status":"error"}')
          )
        )
      );
  }

  updateTicketCost(issueID: string, cost: number) {
    const temp = '{"cost": ' + cost + '}';
    const tempURL = this.updateCostURL + issueID;
    return this.http
      .put<JSON>(tempURL, JSON.parse(temp), this.httpOptions)
      .pipe(
        catchError(
          this.handleError<JSON>(
            'updateTicketRepairTime',
            JSON.parse('{"status":"error"}')
          )
        )
      );
  }

  public getTicketSubtasks(ticketID: number) {
    const tempURL = this.getSubtaskURL + ticketID;
    return this.http
      .get<any>(tempURL)
      .pipe(
        catchError(
          this.handleError<JSON>(
            'getSubtasksError',
            JSON.parse('{"status":"error"}')
          )
        )
      );
  }

  public createTicketSubtask(
    ticketID: number,
    taskDesc: string,
    taskStep: string,
    taskStat: string
  ) {
    const temp =
      '{"ticketId": ' +
      ticketID +
      ',' +
      '"taskDesc": ' +
      '"' +
      taskDesc +
      '"' +
      ',' +
      '"taskStep": ' +
      '"' +
      taskStep +
      '"' +
      ',' +
      '"taskStat": ' +
      '"' +
      taskStat +
      '"' +
      '}';
    const tempURL = this.createSubtaskURL + ticketID;
    return this.http
      .post<JSON>(tempURL, JSON.parse(temp), this.httpOptions)
      .pipe(
        catchError(
          this.handleError<JSON>(
            'createSubtasksError',
            JSON.parse('{"status":"error"}')
          )
        )
      );
  }

  public getAITicketCost(ticket: TicketDto) {
    return this.http.post<any>(
      this.getAITicketCostURL,
      ticket,
      this.httpOptions
    );
  }

  public getAITicketTime(ticket: TicketDto) {
    return this.http.post<any>(
      this.getAITicketTimeURL,
      ticket,
      this.httpOptions
    );
  }

  public createNewTicket(ticket: TicketDto): Observable<TicketDto> {
    return this.http
      .post<TicketDto>(this.createTicketURL, ticket, this.httpOptions)
      .pipe(
        catchError(
          this.handleError<TicketDto>('createNewTickets', new TicketDto())
        )
      );
  }

  public updateTicket(ticket: TicketDto): boolean {
    const tempURL = this.updateURL + ticket.ticketId;
    this.http
      .put<TicketDto[]>(tempURL, ticket, this.httpOptions)
      .subscribe((response) => {
        // console.log(response);
      });
    return true;
  }

  public getTickets(): Observable<TicketDto[]> {
    return this.http
      .get<TicketDto[]>(this.getAllURL)
      .pipe(catchError(this.handleError<TicketDto[]>('getTickets', [])));
  }

  public getTicketsSome(skip : number, take : number): Observable<TicketDto[]> {
    const value = {
      skip : skip, 
      take : take
    }
    console.log(this.getTicketsSomeURL + skip + "/" + take);
    return this.http
      .get<TicketDto[]>(this.getTicketsSomeURL + skip + "/" + take)
      .pipe(catchError(this.handleError<TicketDto[]>('getTickets', [])));
  }

  public getTicketsType(status: string): Observable<TicketDto[]> {
    const tempURL = this.getTicketStatus + status;
    return this.http
      .get<TicketDto[]>(tempURL)
      .pipe(catchError(this.handleError<TicketDto[]>('getTicketsType', [])));
  }

  public getTicketsIssue(issue: string): Observable<TicketDto[]> {
    const tempURL = this.getTicketIssue + issue;
    return this.http
      .get<TicketDto[]>(tempURL)
      .pipe(catchError(this.handleError<TicketDto[]>('getTicketsIssue', [])));
  }

  public getTicket(ticket_id: string): Observable<TicketDto[]> {
    const tempURL = this.getTicketURL + ticket_id;
    return this.http
      .get<TicketDto[]>(tempURL)
      .pipe(catchError(this.handleError<TicketDto[]>('getTicket', [])));
  }

  public assignTechTeam(ticketID: number, techTeamID: number) {
    const body = { ticketId: ticketID, techTeamId: techTeamID };
    return this.http
      .put<JSON>(this.updateAssignedTechTeamURL, body)
      .pipe(catchError(this.handleError<boolean>('assignTechTeam', false)));
  }

  public uploadImage(ticketImg: string, ticketID: number) {
    const tempURL = this.createPictureURL + ticketID;
    const body = { "imgLink" : ticketImg };
    return this.http
      .post<JSON>(tempURL, body, this.httpOptions)
      .pipe(catchError(this.handleError<string>('getTickets', 'failed')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.messgae}`);

      return of(result as T);
    };
  }

  public increaseUpvotes(
    ticketID: number,
    ticketUpvotes: number,
    userId: string
  ): void {
    const tempURL = this.upvoteURL + ticketID;
    const temp = '{"upvotes": ' + ticketUpvotes + '}';
    this.http.put<JSON>(tempURL, JSON.parse(temp), this.httpOptions).subscribe(
      () =>{
        const userUpvoteUrl = this.upvoteURLUser + userId;
        const tempBody = '{"ticketId": ' + ticketID + '}';
        this.http
          .put<JSON>(userUpvoteUrl, tempBody, this.httpOptions)
          .subscribe(() => {
            return;
          });
      }
    );

  }

  public getImages(ticketID: number): Observable<TicketPictureDto[]> {
    const tempURL = this.getPictureURL + ticketID;
    return this.http
      .get<TicketPictureDto[]>(tempURL)
      .pipe(catchError(this.handleError<TicketPictureDto[]>('getImages', [])));
  }

  // public postImage(formData: FormData): Observable<ImageResponse> {
  //   // console.log("OVER HERE NOW");

  //   return this.http.post<Express.Multer.File>(this.uploadURL, formData).pipe(
  //     catchError(
  //       this.handleError<ImageResponse>('postImage', {
  //         originalname: '',
  //         filename: '',
  //       })
  //     )
  //   );
  // }

  public postImage(file : File) : Promise<string> {
    return new Promise<string>((resolve, reject) =>{
      const filePath = file.name;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);
      uploadTask.snapshotChanges().pipe(
        finalize(() =>{
            storageRef.getDownloadURL().subscribe(async downloadURL => {
            resolve(downloadURL)
          });
        })
      ).subscribe()
  
    })
  }

  public deleteTicket(ticketId : string){
    return this.http.delete<JSON>(this.deleteURL + ticketId )
    .pipe(catchError(this.handleError<boolean>('deleteTicket', false)));

  }

  public sort(
    selectedOption: string,
    order: string,
    tickets: TicketDto[]
  ): TicketDto[] {
    if (selectedOption == 'Date') {
      if (order === 'asc') tickets.sort(this.sortByDate);
      else tickets.sort(this.sortByDateDesc);
    } else if (selectedOption == 'Location') {
      if (order === 'asc') tickets.sort(this.sortByLocation);
      else tickets.sort(this.sortByLocationDesc);
    } else if (selectedOption == 'City') {
      if (order === 'asc') tickets.sort(this.sortByCity);
      else tickets.sort(this.sortByCityDesc);
    } else if (selectedOption == 'Status') {
      if (order === 'asc') tickets.sort(this.sortByStatus);
      else tickets.sort(this.sortByStatusDesc);
    } else if (selectedOption == 'Upvotes') {
      if (order === 'asc') tickets.sort(this.sortByUpvotes);
      else tickets.sort(this.sortByUpvotesDesc);
    } else if (selectedOption == 'Issue') {
      if (order === 'asc') tickets.sort(this.sortByIssue);
      else tickets.sort(this.sortByIssueDesc);
    }

    return tickets;
  }

  private sortByIssue(a: TicketDto, b: TicketDto): number {
    if (b.ticketType > a.ticketType) return 1;
    else return -1;
  }

  private sortByIssueDesc(a: TicketDto, b: TicketDto): number {
    if (b.ticketType < a.ticketType) return 1;
    else return -1;
  }

  private sortByUpvotes(a: TicketDto, b: TicketDto): number {
    if (b.ticketUpvotes > a.ticketUpvotes) return 1;
    else return -1;
  }

  private sortByStatus(a: TicketDto, b: TicketDto): number {
    if (b.ticketStatus > a.ticketStatus) return 1;
    else return -1;
  }

  private sortByCity(a: TicketDto, b: TicketDto): number {
    if (b.ticketCity > a.ticketCity) return 1;
    else return -1;
  }

  private sortByLocation(a: TicketDto, b: TicketDto): number {
    if (b.ticketLocation > a.ticketLocation) return 1;
    else return -1;
  }

  private sortByDate(a: TicketDto, b: TicketDto): number {
    if (b.ticketCreateDate > a.ticketCreateDate) return 1;
    else return -1;
  }

  private sortByUpvotesDesc(a: TicketDto, b: TicketDto): number {
    if (b.ticketUpvotes < a.ticketUpvotes) return 1;
    else return -1;
  }

  private sortByStatusDesc(a: TicketDto, b: TicketDto): number {
    if (b.ticketStatus < a.ticketStatus) return 1;
    else return -1;
  }

  private sortByCityDesc(a: TicketDto, b: TicketDto): number {
    if (b.ticketCity < a.ticketCity) return 1;
    else return -1;
  }

  private sortByLocationDesc(a: TicketDto, b: TicketDto): number {
    if (b.ticketLocation < a.ticketLocation) return 1;
    else return -1;
  }

  private sortByDateDesc(a: TicketDto, b: TicketDto): number {
    if (b.ticketCreateDate < a.ticketCreateDate) return 1;
    else return -1;
  }
}
