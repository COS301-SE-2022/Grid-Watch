import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { catchError, Observable, of } from 'rxjs';
import { Express } from 'express';
import { Multer } from 'multer';
import { ImageResponse } from './image-response';
import { id } from '@swimlane/ngx-charts';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private getAllURL = '/api/ticket/all/tickets';
  private upvoteURL = '/api/ticket/update/upvotes/';
  private getPictureURL = '/api/ticket/picture/';
  private getTicketURL = '/api/ticket/';
  private getSubtaskURL = 'api/ticket/subtasks/';
  private createSubtaskURL = 'api/ticket/subtask/create/'
  private uploadURL = '/api/ticket/upload';
  private updateURL = '/api/ticket/update/';
  private createPictureURL = '/api/ticket/picture/create/';
  private createTicketURL = '/api/ticket/create';
  private UpdateStatusURL = '/api/ticket/update/status/';
  private getTicketStatus = '/api/ticket/status/';
  private updateRepairURL = '/api/ticket/update/repair/';
  private updateCostURL = '/api/ticket/update/cost/';
  private updateAssignedTechTeamURL = '/api/ticket/update/assignedTeam//techTeam';

  constructor(private http: HttpClient) {}

  public print(message: string) {
    console.log(message);
  }

  updateTicketStatus(issueID: string, status_: string) {
    const temp = { status: status_ };
    const tempURL = this.UpdateStatusURL + issueID;
    console.log(temp);

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
        catchError(this.handleError<JSON>('updateTicketRepairTime', JSON.parse('{"status":"error"}')))
      );
  } 

  updateTicketCost(issueID: string, cost : number) {
    const temp = '{"cost": ' + cost + '}';
    const tempURL = this.updateCostURL + issueID;
    return this.http
      .put<JSON>(tempURL, JSON.parse(temp), this.httpOptions)
      .pipe(
        catchError(this.handleError<JSON>('updateTicketRepairTime', JSON.parse('{"status":"error"}')))
      );
  }

  public getTicketSubtasks(ticketID: number)
  {
    const tempURL = this.getSubtaskURL + ticketID;
    return this.http
      .get<any>(tempURL)
      .pipe(
        catchError(this.handleError<JSON>('getSubtasksError', JSON.parse('{"status":"error"}')))
      );
  }

  public createTicketSubtask(ticketID: number, taskDesc: string, taskStep: string, taskStat: string)
  {
    const temp = '{"ticketId": ' + ticketID + "," +
    '"taskDesc": ' + '"' + taskDesc + '"' + "," +
    '"taskStep": ' + '"' + taskStep + '"' + "," + 
    '"taskStat": ' + '"' + taskStat + '"' + '}';
    console.log(temp);
    const tempURL = this.createSubtaskURL + ticketID;
    return this.http
      .post<JSON>(tempURL, JSON.parse(temp), this.httpOptions)
      .pipe(
        catchError(this.handleError<JSON>('createSubtasksError', JSON.parse('{"status":"error"}')))
      );
  }
  
  public createNewTicket(ticket: TicketDto): Observable<TicketDto> {
    return this.http
      .post<TicketDto>(this.createTicketURL, ticket, this.httpOptions)
      .pipe(catchError(this.handleError<TicketDto>('createNewTickets', new TicketDto())));
  }

  public updateTicket(ticket: TicketDto): boolean {
    const tempURL = this.updateURL + ticket.ticketId;
    this.http
      .put<TicketDto[]>(tempURL, ticket, this.httpOptions)
      .subscribe((response) => {
        console.log(response);
      });
    return true;
  }

  public getTickets(): Observable<TicketDto[]> {
    return this.http
      .get<TicketDto[]>(this.getAllURL)
      .pipe(catchError(this.handleError<TicketDto[]>('getTickets', [])));
  }

  public getTicketsType(status: string): Observable<TicketDto[]> {
    const tempURL = this.getTicketStatus + status;
    return this.http
      .get<TicketDto[]>(tempURL)
      .pipe(catchError(this.handleError<TicketDto[]>('getTicketsType', [])));
  }

  public getTicket(ticket_id: string): Observable<TicketDto[]> {
    const tempURL = this.getTicketURL + ticket_id;
    return this.http
      .get<TicketDto[]>(tempURL)
      .pipe(catchError(this.handleError<TicketDto[]>('getTicket', [])));
  }

  public assignTechTeam(ticketID: number, techTeamID : number)
  {
    const body ={"ticketId" : ticketID, "techTeamId" : techTeamID}
    return this.http
    .put<JSON>(this.updateAssignedTechTeamURL, body)
    .pipe(catchError(this.handleError<boolean>('assignTechTeam', false)));

  }

  public uploadImage(ticketImg: string, ticketID: number): Observable<string> {
    const tempURL = this.createPictureURL + ticketID;
    const body = JSON.parse('{ "imgLink" : "' + ticketImg + '"}');
    return this.http
      .post<string>(tempURL, body, this.httpOptions)
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

  public increaseUpvotes(ticketID: number, ticketUpvotes: number): void {
    const tempURL = this.upvoteURL + ticketID;
    const temp = '{"upvotes": ' + ticketUpvotes + '}';
    this.http
      .put<JSON>(tempURL, JSON.parse(temp), this.httpOptions)
      .subscribe(() => {
        return;
      });
  }

  public getImages(ticketID: number): Observable<TicketPictureDto[]> {
    const tempURL = this.getPictureURL + ticketID;
    return this.http
      .get<TicketPictureDto[]>(tempURL)
      .pipe(catchError(this.handleError<TicketPictureDto[]>('getImages', [])));
  }

  public postImage(formData: FormData): Observable<ImageResponse> {
    // console.log("OVER HERE NOW");

    return this.http
      .post<Express.Multer.File>(this.uploadURL, formData)
      .pipe(
        catchError(
          this.handleError<ImageResponse>('postImage', {
            originalname: '',
            filename: '',
          })
        )
      );
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
