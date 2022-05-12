import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';

  import { ApiTicketService } from '@grid-watch/api/ticket/service';
  import { TicketDto } from '../dto/ticket.dto';

@Controller('ticket')
export class TicketController {

    constructor(private readonly apiTicketService:ApiTicketService){}

    //Testing endpoint to test functionality
    @Get()
    testing(){
        return  "Testing Tickets";
    }

    //get endpiont to return a specific ticket
    @Get(':id')
    async getTicket(@Param() params){
        return this.apiTicketService.GetTicket(parseInt(params.id));
    }

    @Get('city/:city')
    async getCity(@Param() params){
        return this.apiTicketService.getCityTicket(params.city);
    }

    @Get('status/:status')
    async getStatus(@Param() params){
        return this.apiTicketService.getStatus(params.status);
    }

    //get endpint to return all tickets
    @Get('/tickets/all')
    async getAll(){
        return this.apiTicketService.GetAll();
    }

    //creating tickets
    @Post('/create')
    async CreateTicket(@Body() ticket: TicketDto):Promise<boolean> {
        return this.apiTicketService.createTicket(ticket.ticket_status,ticket.ticket_create_date,ticket.ticket_close_date,ticket.ticket_type,ticket.ticket_city,ticket.ticket_location,ticket.ticket_cost,ticket.ticket_description,ticket.ticket_repair_time,ticket.ticket_upvotes);
    }

    //update ticket 
    @Put('/update/:id')
    async UpdateTicket(@Param() params,@Body() ticket: TicketDto):Promise<boolean> {
        return this.apiTicketService.UpdateTicket(parseInt(params.id),ticket.ticket_status,ticket.ticket_create_date,ticket.ticket_close_date,ticket.ticket_type,ticket.ticket_city,ticket.ticket_location,ticket.ticket_cost,ticket.ticket_description,ticket.ticket_repair_time,ticket.ticket_upvotes);
    }

    //update ticket status
    @Put('/update/status/:id')
    async UpdateTicketStatus(@Param() params,@Body() status: string):Promise<boolean> {
        return this.apiTicketService.updateTicketStatus(parseInt(params.id),status);
    }

    //update ticket createdate
    @Put('/update/createdate/:id')
    async UpdateTicketCreateDate(@Param() params,@Body() createDate: Date):Promise<boolean>{
        return this.apiTicketService.updateTicketCreateDate(parseInt(params.id),createDate);
    }

    //update ticket closedate
    @Put('/update/closedate/:id')
    async UpdateTicketCloseDate(@Param() params,@Body() closeDate: Date):Promise<boolean> {
        return this.apiTicketService.updateTicketCloseDate(parseInt(params.id),closeDate);
    }

    //update ticket type
    @Put('/update/type/:id')
    async UpdateTicketType(@Param() params,@Body() type: string):Promise<boolean> {
        return this.apiTicketService.updateTicketType(parseInt(params.id),type);
    }
  
    //update ticket location
    @Put('/update/location/:id')
    async UpdateTicketLocation(@Param() params,@Body() location: string):Promise<boolean> {
        return this.apiTicketService.updateTicketLocation(parseInt(params.id),location);
    }

    //update ticket cost
    @Put('/update/cost/:id')
    async UpdateTicketCost(@Param() params,@Body() cost: number):Promise<boolean> {
        return this.apiTicketService.updateTicketCost(parseInt(params.id),cost);
    }

    //update ticket description
    @Put('/update/description/:id')
    async UpdateTicketDescription(@Param() params,@Body() description: string):Promise<boolean> {
        return this.apiTicketService.updateTicketDescription(parseInt(params.id),description);
    }

    //update ticket repair
    @Put('/update/repair/:id')
    async UpdateTicketRepairTime(@Param() params,@Body() repairTime: number):Promise<boolean> {
        return this.apiTicketService.updateTicketRepairTime(parseInt(params.id),repairTime);
    }

    @Put('/update/upvotes/:id')
    async UpdateTicketUpvotes(@Param() params,@Body() upvotes: number):Promise<boolean> {
        return this.apiTicketService.updateTicketRepairTime(parseInt(params.id),upvotes);
    }

    @Post('/close')
    async CloseTicket(@Body() ticketNum: number):Promise<boolean> {
        return this.apiTicketService.closeTicket(ticketNum);
    }

    @Delete('/delete')
    async DeleteTicket(@Body() ticketNum: number):Promise<boolean> {
        return this.apiTicketService.deleteTicket(ticketNum);
    }



}