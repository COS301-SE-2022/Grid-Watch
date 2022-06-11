import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketPictureDto } from '@grid-watch/api/ticket/api/shared/ticket-picture-dto';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
import { catchError, Observable, of } from 'rxjs';

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


  constructor(private http : HttpClient) {

   }

   public print(message : string)
   {  
      console.log(message);
   }
   

   public createTicket(ticket : TicketDto) : boolean {
    return true;
   }

   public updateTicket() : boolean {
    return true;
   }

   public getTickets() : Observable<TicketDto[]> {
    return this.http.get<TicketDto[]>(this.getAllURL)
    .pipe(
      catchError(this.handleError<TicketDto[]>('getTickets', []))
    );
   } 

   public uploadImage() : boolean 
   {
    return true;
   }

   private handleError<T>(operation = 'operation', result?: T) 
   {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(`${operation} failed: ${error.message}`);

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
}
