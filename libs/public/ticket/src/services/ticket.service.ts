import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  getAllURL = "/api/ticket/all/tickets"

  constructor(private http : HttpClient) {

   }

   print(message : string)
   {  
      console.log(message);
   }
   

   createTicket(ticket : TicketDto) : boolean {
    return true;
   }

   updateTicket() : boolean {
    return true;
   }

   async getTickets() : Promise<TicketDto[]> {
    await this.http.get<TicketDto[]>(this.getAllURL).subscribe(
      (data: TicketDto[]) => {
        return data;
    },
    () =>
    {
      return [];
    }
    );
    return [];
   } 

   uploadImage() : boolean 
   {
    return true;
   }




   
}
