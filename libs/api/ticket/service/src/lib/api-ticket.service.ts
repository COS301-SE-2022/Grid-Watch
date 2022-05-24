import { Injectable, Logger } from '@nestjs/common';
//import {Ticket,PrismaClient} from '@prisma/client';
import {QueryBus,CommandBus} from '@nestjs/cqrs';
import { GetTicketQuery, GetIssueQuery, GetTicketsQuery,GetCityTicketQuery,GetStatusQuery,CloseTicketQuery, GetTicketsDispatchedQuery, GetTicketsSortByDateQuery } from './queries/api-ticket-query.query';
import { CreateTicketCommand,
    UpdateTicketCommand, 
    DeleteTicketCommand, 
    UpdateTicketCloseDateCommand,
    UpdateTicketCreateDateCommand,
    UpdateTicketStatusCommand,
    UpdateTicketTypeCommand,
    UpdateTicketCostCommand,
    UpdateTicketDescriptionCommand,
    UpdateTicketLocationCommand,
    UpdateTicketRepairTimeCommand,
    UpdateTicketUpVotesCommand } from './commands/api-ticket-command.command';

@Injectable()
export class ApiTicketService {
    constructor (private commandBus: CommandBus, private queryBus: QueryBus){}

    async GetAll() {
        return await this.queryBus.execute(new GetTicketsQuery())
    }

    async GetAllSortByDate() {
        return await this.queryBus.execute(new GetTicketsSortByDateQuery())
    }

    async GetAllDispatched() {
        return await this.queryBus.execute(new GetTicketsDispatchedQuery())
    }

    async GetTicket(ticketId: number){
        return await this.queryBus.execute(new GetTicketQuery(ticketId))
    }

    async UpdateTicket(TicketId: number, Status: string, createDate: Date, closeDate: Date, Type: string, City: string, Location: string, Cost: number, Description: string, RepairTime: number, Upvotes: number){
        return await this.commandBus.execute(new UpdateTicketCommand(TicketId, Status, createDate, closeDate, Type, City, Location, Cost, Description, RepairTime, Upvotes))
    }

    async deleteTicket(ticketId:number){
        return await this.commandBus.execute(new DeleteTicketCommand(ticketId))
    }

    async createTicket(Status: string, createDate: Date, closeDate: Date, Type: string, City: string, Location: string, Cost: number, Description: string, RepairTime: number, Upvotes: number){
        return await this.commandBus.execute(new CreateTicketCommand(Status, createDate, closeDate, Type, City, Location, Cost, Description, RepairTime, Upvotes))
    }

    async getStatus(Status: string){
        return await this.queryBus.execute(new GetStatusQuery(Status))
    }

    async getIssue(issue: string){
        return await this.queryBus.execute(new GetIssueQuery(issue))
    }

    async getCityTicket(City: string){
        return await this.queryBus.execute(new GetCityTicketQuery(City))
    }

    async updateTicketStatus(TicketId:number,TicketStatus: string){
        return await this.commandBus.execute(new UpdateTicketStatusCommand(TicketId,TicketStatus))
    }

    async updateTicketCreateDate(TicketId:number,CreateDate:Date){
        return await this.commandBus.execute(new UpdateTicketCreateDateCommand(TicketId,CreateDate))
    }

    async updateTicketCloseDate(TicketId:number,CloseDate:Date){
        return await this.commandBus.execute(new UpdateTicketCloseDateCommand(TicketId,CloseDate))
    }
    
    async updateTicketType(TicketId:number,Type:string){
        return await this.commandBus.execute(new UpdateTicketTypeCommand(TicketId,Type))
    }

    async updateTicketLocation(TicketId:number,Location:string){
        return await this.commandBus.execute(new UpdateTicketLocationCommand(TicketId,Location))
    }

    async updateTicketCost(TicketId:number,Cost:number){
        return await this.commandBus.execute(new UpdateTicketCostCommand(TicketId,Cost))
    }

    async updateTicketDescription(TicketId:number,Description:string){
        return await this.commandBus.execute(new UpdateTicketDescriptionCommand(TicketId,Description))
    }

    async updateTicketRepairTime(TicketId:number,RepairTime:number){
        return await this.commandBus.execute(new UpdateTicketRepairTimeCommand(TicketId,RepairTime))
    }

    async updateTicketUpVotes(TicketId:number,UpVotes: number){
        return await this.commandBus.execute(new UpdateTicketUpVotesCommand(TicketId,UpVotes))
    }

    async closeTicket(TicketId:number){
        return await this.queryBus.execute(new CloseTicketQuery(TicketId))
    }


}
