import { Controller, Get } from '@nestjs/common';
import { ApiTicketService } from 'libs/api/ticket/service/src/lib/api-ticket.service';

@Controller('ticket')
export class TicketController {

    constructor(private ticketService: ApiTicketService) 
    {

    }

    @Get()
    tickets(){
        console.log("get/tickets");
        this.ticketService.createTicket("John Doe", "Pothole", "This pothole is a huge whole in the ground", "img.png");
        return  "Tickets lets gooo";

    }

    
}