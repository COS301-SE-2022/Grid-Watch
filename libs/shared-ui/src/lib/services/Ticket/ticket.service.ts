import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { catchError, Observable, of } from 'rxjs';
import { Express } from 'express';
import { Multer } from 'multer';
import { ImageResponse } from './image-response';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  private getAllURL = "/api/ticket/all/tickets"
  private upvoteURL = "/api/ticket/update/upvotes/"
  private getPictureURL = "/api/ticket/picture/"
  private getTicketURL = "/api/ticket/";
  private uploadURL = "/api/ticket/upload";
  private updateURL = "/api/ticket/update/";
  private createPictureURL = "/api/ticket/picture/create/";
  private createTicketURL = "/api/ticket/create";

  constructor(private http : HttpClient) {

   }

   public print(message : string)
   {  
      console.log(message);
   }
   

   public createNewTicket(ticket : TicketDto) : Observable<TicketDto[]> {
    return this.http.post<TicketDto[]>(this.createTicketURL, ticket, this.httpOptions)
    .pipe(
      catchError(this.handleError<TicketDto[]>('createNewTickets', []))
    )
   }

   public updateTicket(ticket : TicketDto) : boolean {
    const tempURL = this.updateURL + ticket.ticket_id ;
      this.http.put<TicketDto[]>(tempURL, ticket, this.httpOptions).subscribe(
        (response) =>
        {
          console.log(response);
        }
      ) 
      return true;
   }

   public getTickets() : Observable<TicketDto[]> {
    return this.http.get<TicketDto[]>(this.getAllURL)
    .pipe(
      catchError(this.handleError<TicketDto[]>('getTickets', []))
    );
   } 

   public getTicket(ticket_id : string) : Observable<TicketDto[]> {
    const tempURL = this.getTicketURL + ticket_id
    return this.http.get<TicketDto[]>(tempURL).pipe(
      catchError(this.handleError<TicketDto[]>("getTicket", []))
    );
   }

   public uploadImage(ticketImg : string, ticketID : number) : Observable<string> 
   {
    const tempURL = this.createPictureURL + ticketID;
    const body = JSON.parse('{ "imgLink" : "' + ticketImg + '"}');
    return this.http.post<string>(tempURL, body, this.httpOptions).pipe(
      catchError(this.handleError<string>('getTickets', "failed"))
    )
   }

   private handleError<T>(operation = 'operation', result?: T) 
   {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(`${operation} failed: ${error.messgae}`);

      return of(result as T);
    };

  

  }

  public increaseUpvotes(ticketID : number, ticketUpvotes : number ) : void
  {
    const tempURL = this.upvoteURL + ticketID 
    const temp = '{"upvotes": ' + ticketUpvotes + '}';
    this.http.put<JSON>(tempURL, JSON.parse(temp) ,this.httpOptions).subscribe(
      () => {
        return;
      }
      );
  }

  public getImages(ticketID : number) : Observable<TicketPictureDto[]>
  {
    const tempURL = this.getPictureURL + ticketID
    return this.http.get<TicketPictureDto[]>(tempURL)
    .pipe(     
      catchError(this.handleError<TicketPictureDto[]>('getImages', []))
    );
  }

  public postImage(formData : FormData) : Observable<ImageResponse>{
    // console.log("OVER HERE NOW");
    
    return this.http.post<Express.Multer.File>(this.uploadURL, formData)
    .pipe(
      catchError(this.handleError<ImageResponse>('postImage', {originalname:"", filename: ""}))
    );
  }

  
  sort(selectedOption: string, order: string, tickets : TicketDto []): TicketDto[] {
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

  sortByIssue(a: TicketDto, b: TicketDto): number {
    if (b.ticket_type > a.ticket_type) return 1;
    else return -1;
  }

  sortByIssueDesc(a: TicketDto, b: TicketDto): number {
    if (b.ticket_type < a.ticket_type) return 1;
    else return -1;
  }

  sortByUpvotes(a: TicketDto, b: TicketDto): number {
    if (b.ticket_upvotes > a.ticket_upvotes) return 1;
    else return -1;
  }

  sortByStatus(a: TicketDto, b: TicketDto): number {
    if (b.ticket_status > a.ticket_status) return 1;
    else return -1;
  }

  sortByCity(a: TicketDto, b: TicketDto): number {
    if (b.ticket_city > a.ticket_city) return 1;
    else return -1;
  }

  sortByLocation(a: TicketDto, b: TicketDto): number {
    if (b.ticket_location > a.ticket_location) return 1;
    else return -1;
  }

  sortByDate(a: TicketDto, b: TicketDto): number {
    if (b.ticket_create_date > a.ticket_create_date) return 1;
    else return -1;
  }

  sortByUpvotesDesc(a: TicketDto, b: TicketDto): number {
    if (b.ticket_upvotes < a.ticket_upvotes) return 1;
    else return -1;
  }

  sortByStatusDesc(a: TicketDto, b: TicketDto): number {
    if (b.ticket_status < a.ticket_status) return 1;
    else return -1;
  }

  sortByCityDesc(a: TicketDto, b: TicketDto): number {
    if (b.ticket_city < a.ticket_city) return 1;
    else return -1;
  }

  sortByLocationDesc(a: TicketDto, b: TicketDto): number {
    if (b.ticket_location < a.ticket_location) return 1;
    else return -1;
  }

  sortByDateDesc(a: TicketDto, b: TicketDto): number {
    if (b.ticket_create_date < a.ticket_create_date) return 1;
    else return -1;
  }
  
}
