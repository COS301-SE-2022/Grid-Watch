import { Injectable } from '@nestjs/common';
//import {Ticket,PrismaClient} from '@prisma/client';
import {QueryBus,CommandBus} from '@nestjs/cqrs';
import { GetTicketQuery, GetTicketsQuery } from './queries/api-ticket-query.query';
import { CreateTicketCommand,UpdateTicketCommand, DeleteTicketCommand } from './commands/api-ticket-command.command';

@Injectable()
export class ApiTicketService {

    constructor (private commandBus: CommandBus, private queryBus: QueryBus){}

    async findAll() {
        return await this.queryBus.execute(new GetTicketsQuery())
    }

    async find(ticketId: number){
        return await this.queryBus.execute(new GetTicketQuery(ticketId))
    }

    async UpdateTicket(TicketId: number, Status: string, createDate: Date, closeDate: Date, Type: string, City: string, Location: string, Cost: number, Description: string, RepairTime: number, Upvotes: number){
        return await this.commandBus.execute(new UpdateTicketCommand(TicketId, Status, createDate, closeDate, Type, City, Location, Cost, Description, RepairTime, Upvotes))
    }

    async deleteTicket(ticketId:number){
        return await this.commandBus.execute(new DeleteTicketCommand(ticketId))
    }

    async createTicket(Status: string, createDate: Date, closeDate: Date, Type: string, City: string, Location: string, Cost: number, Description: string, RepairTime: number, Upvotes: number){
        {
        return await this.commandBus.execute(new CreateTicketCommand(Status, createDate, closeDate, Type, City, Location, Cost, Description, RepairTime, Upvotes)
            )
    }
    }
}