import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';

  //import {Ticket} from '@prisma/client';
  //import { ApiTicketService } from '@grid-watch/api/ticket/service';
  import { TicketDto } from '../dto/ticket.dto';

@Controller('ticket')
export class TicketController {

    //constructor(private readonly apiTicketService:ApiTicketService){}

    //Testing endpoint to test functionality
    @Get()
    testing(){
        return  "Testing Tickets";
    }

    //get endpiont to return a specific ticket
    @Get(':id')
    async getTicket(@Param() params){
        return `This action return a #${params.id}`;
        //return ApiTicketService.getTicket(params.id);
    }

    @Get('city/:city')
    async getCity(@Param() params){
        return `This action return a city: ${params.city}`;
        //return ApiTicketService.getCityTicket(params.id);
    }

    @Get('status/:status')
    async getStatus(@Param() params){
        return `This action return a status: ${params.status}`;
        //return ApiTicketService.getCityTicket(params.id);
    }

    //get endpint to return all tickets
    @Get('/all')
    async getAll(){
        return 'All tickets will be returned';
    }

    //creating tickets
    @Post('/create')
    async CreateTicket(@Body() body: TicketDto):Promise<boolean> {
        return true;
        //call createTicket service layer
    }

    //update ticket 
    @Put('/update/:id')
    async UpdateTicket(@Param() params,@Body() body: TicketDto):Promise<boolean> {
        return true;
        //call updateTicket service layer
    }

    //update ticket status
    @Put('/update/status/:id')
    async UpdateTicketStatus(@Param() params,@Body() status: string):Promise<boolean|string> {
        return status;
        //call updateTicketStatus service layer
    }

    //update ticket createdate
    @Put('/update/createdate/:id')
    async UpdateTicketCreateDate(@Param() params,@Body() createDate: Date):Promise<boolean|Date>{
        return createDate;
        //call updateTicketCreateDate service layer
    }

    //update ticket closedate
    @Put('/update/closedate/:id')
    async UpdateTicketCloseDate(@Param() params,@Body() closeDate: Date):Promise<boolean|Date> {
        return closeDate;
        //call updateTicketCloseDate service layer
    }

    //update ticket type
    @Put('/update/closedate/:id')
    async UpdateTicketType(@Param() params,@Body() type: string):Promise<boolean|string> {
        return type;
        //call updateTicketType service layer
    }
  
    //update ticket location
    @Put('/update/location/:id')
    async UpdateTicketLocation(@Param() params,@Body() location: string):Promise<boolean|string> {
        return location;
        //call updateTicketLocation service layer
    }

    //update ticket cost
    @Put('/update/cost/:id')
    async UpdateTicketCost(@Param() params,@Body() cost: number):Promise<boolean|number> {
        return cost;
        //call updateTicketCost service layer
    }

    //update ticket description
    @Put('/update/description/:id')
    async UpdateTicketDescription(@Param() params,@Body() description: string):Promise<boolean|string> {
        return description;
        //call updateTicketDescription service layer
    }

    //update ticket repair
    @Put('/update/repair/:id')
    async UpdateTicketRepairTime(@Param() params,@Body() repairTime: number):Promise<boolean|number> {
        return repairTime;
        //call updateTicketRepairTime service layer
    }

    @Put('/update/upvotes/:id')
    async UpdateTicketUpvotes(@Param() params,@Body() upvotes: number):Promise<boolean|number> {
        return upvotes;
        //call updateTicketUpvotes service layer
    }

    @Post('/close')
    async CloseTicket(@Body() ticketNum: number):Promise<boolean|number> {
        return ticketNum;
        //call closeTicket service layer
    }

    @Delete('/delete')
    async DeleteTicket(@Body() ticketNum: number):Promise<boolean|number> {
        return ticketNum;
        //call DeleteTicket service layer
    }



}