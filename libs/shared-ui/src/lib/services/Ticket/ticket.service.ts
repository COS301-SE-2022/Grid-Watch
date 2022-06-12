import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { catchError, Observable, of } from 'rxjs';
import { Express } from 'express';
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
}
