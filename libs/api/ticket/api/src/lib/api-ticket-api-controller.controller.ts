import { Controller, Get } from '@nestjs/common';

@Controller('ticket')
export class TicketController {

    @Get()
    tickets(){
        return  "Tickets lets gooo";
    }

}