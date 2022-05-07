import { Controller, Get } from '@nestjs/common';
import { ApiTicketService } from 'libs/api/ticket/service/src/lib/api-ticket.service';

@Controller('ticket')
export class TicketController {

    @Get()
    tickets(){
        console.log("get/tickets")
        return  "Tickets lets gooo";
    }

    
}