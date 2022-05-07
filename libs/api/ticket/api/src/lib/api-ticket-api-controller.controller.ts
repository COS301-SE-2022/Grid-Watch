import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';



@Controller('ticket')
export class TicketController {

    @Get()
    testing(){
        return  "Testing Tickets";
    }

    // @Get()
    // async findAll(): Promise<Ticket> {
    //   return this.ticketService.findAll();
    // }
  
    // @Get(':id')
    // async find(@Param('id') id: number): Promise<Ticket> {
    //   return this.ticketService.find(id);
    // }
  
    // @Post()
    // async create(@Body('item') ticket: Ticket): Promise<void> {
    //   this.ticketService.create(ticket);
    // }
  
    // @Put()
    // async update(@Body('item') ticket: Ticket): Promise<void> {
    //   this.ticketService.update(ticket);
    // }
  
    // @Delete(':id')
    // async delete(@Param('id') id: number): Promise<void> {
    //   this.ticketService.delete(id);
    // }

}