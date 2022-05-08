import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import {ApiTicketService} from '@grid-watch/api/ticket/service';
import {Ticket} from '@prisma/client';


@Controller('ticket')
export class TicketController {

    constructor(private readonly ticketService: ApiTicketService){}

    @Get()
    testing(){
        return  "Testing Tickets";
    }

     @Get()
     async findAll(): Promise<Ticket[]> {
       return this.ticketService.findAll();
     }
  
     @Get(':id')
     async find(@Param('id') id: number): Promise<Ticket> {
       return this.ticketService.find(id);
     }
  
     @Post()
     async create(@Body('item') status:string,createDate:Date,closeDate:Date,type:string,city:string,location:string,cost:number,description:string,repairTime:number,upVotes:number): Promise<void> {
       this.ticketService.createTicket(status,createDate,closeDate,type,city,location,cost,description,repairTime,upVotes)
     }
  
     @Put()
     async update(@Body('item') ticketId: number, status: string, createDate: Date, closeDate: Date,type:string,city: string, location: string,cost:number, description:string,repairTime:number,upVotes:number): Promise<void> {
       this.ticketService.UpdateTicket(ticketId,status,createDate,closeDate,type,city,location,cost,description,repairTime,upVotes);
     }
  
     @Delete(':id')
     async delete(@Param('id') id: number): Promise<void> {
       this.ticketService.deleteTicket(id);
     }

}