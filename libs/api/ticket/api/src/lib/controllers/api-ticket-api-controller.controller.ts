import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';

import { ApiTicketService } from '@grid-watch/api/ticket/service';
import { TicketDto } from '../dto/ticket.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';
import { Helper } from './helper';

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

    @Get('issue/:issue')
    async getIssue(@Param() params){
        return this.apiTicketService.getIssue(params.issue);
    }

    //get endpint to return all tickets
    @Get('/all/tickets')
    async getAll(){
        return this.apiTicketService.GetAll();
    }

    //get endpint to return all tickets sort by Date
    @Get('/all/tickets/Date')
    async getAllSortByDate(){
        return this.apiTicketService.GetAllSortByDate();
    }
    
    //get endpint to return all tickets sort by Issue
    @Get('/all/tickets/Issue')
    async getAllSortByIssue(){
        return this.apiTicketService.GetAllSortByIssue();
    }
    
    //get endpint to return all tickets sort by Location
    @Get('/all/tickets/Location')
    async getAllSortByLocation(){
        return this.apiTicketService.GetAllSortByLocation();
    }
    
    //get endpint to return all tickets sort by Location
    @Get('/all/tickets/City')
    async getAllSortByCity(){
        return this.apiTicketService.GetAllSortByCity();
    }
    
    //get endpint to return all tickets sort by Location
    @Get('/all/tickets/Status')
    async getAllSortByStatus(){
        return this.apiTicketService.GetAllSortBystatus();
    }
    
    //get endpint to return all tickets sort by Location
    @Get('/all/tickets/Upvotes')
    async getAllSortByUpvotes(){
        return this.apiTicketService.GetAllSortByUpvotes();
    }

    //get endpint to return all tickets dispatched
    @Get('/all/tickets/dispatched')
    async getAllDispatched(){
        return this.apiTicketService.GetAllDispatched();
    }

    //creating tickets
    @Post('/create')
    async CreateTicket(@Body() ticket: TicketDto){
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
        return this.apiTicketService.updateTicketStatus(parseInt(params.id),status["status"]);
    }

    //update ticket createdate
    @Put('/update/createdate/:id')
    async UpdateTicketCreateDate(@Param() params,@Body() createDate: Date):Promise<boolean>{
        return this.apiTicketService.updateTicketCreateDate(parseInt(params.id),createDate["createDate"]);
    }

    //update ticket closedate
    @Put('/update/closedate/:id')
    async UpdateTicketCloseDate(@Param() params,@Body() closeDate: Date):Promise<boolean> {
        return this.apiTicketService.updateTicketCloseDate(parseInt(params.id),closeDate["closeDate"]);
    }

    //update ticket type
    @Put('/update/type/:id')
    async UpdateTicketType(@Param() params,@Body() type: string):Promise<boolean> {
        return this.apiTicketService.updateTicketType(parseInt(params.id),type["type"]);
    }
  
    //update ticket location
    @Put('/update/location/:id')
    async UpdateTicketLocation(@Param() params,@Body() location: string):Promise<boolean> {
        return this.apiTicketService.updateTicketLocation(parseInt(params.id),location["location"]);
    }

    //update ticket cost
    @Put('/update/cost/:id')
    async UpdateTicketCost(@Param() params,@Body() cost: string):Promise<boolean> {
        return this.apiTicketService.updateTicketCost(parseInt(params.id),cost["cost"]);
    }

    //update ticket description
    @Put('/update/description/:id')
    async UpdateTicketDescription(@Param() params,@Body() description: string):Promise<boolean> {
        return this.apiTicketService.updateTicketDescription(parseInt(params.id), description["description"]);
    }

    //update ticket repair
    @Put('/update/repair/:id')
    async UpdateTicketRepairTime(@Param() params,@Body() repairTime: string):Promise<boolean> {
        return this.apiTicketService.updateTicketRepairTime(parseInt(params.id),repairTime["repairTime"]);
    }
    
    //update ticket upvotes
    @Put('/update/upvotes/:id')
    async UpdateTicketUpvotes(@Param() params,@Body() upvotes: string):Promise<boolean> {
        return this.apiTicketService.updateTicketUpVotes(parseInt(params.id),upvotes["upvotes"]);
    }

    @Post('/close')
    async CloseTicket(@Body() ticketNum: number):Promise<boolean> {
        return this.apiTicketService.closeTicket(ticketNum["ticketNum"]);
    }

    @Delete('/delete')
    async DeleteTicket(@Body() ticketNum: number):Promise<boolean> {
        return this.apiTicketService.deleteTicket(ticketNum["ticketNum"]);
    
    }

    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage : diskStorage(
                {
                    destination: Helper.destinationPath,
                    filename : Helper.customFileName
                }
            )
        }))
    uploadFile(@UploadedFile() file: Express.Multer.File){
        const response = {
            
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
        
    }


}