import { Injectable, Logger } from '@nestjs/common';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
//import {Ticket,PrismaClient} from '@prisma/client';
import {QueryBus,CommandBus} from '@nestjs/cqrs';
import { GetTicketQuery, GetIssueQuery, GetTicketsQuery,GetCityTicketQuery,GetStatusQuery,CloseTicketQuery, GetTicketsDispatchedQuery, GetTicketsSortByDateQuery, GetTicketsSortByIssueQuery, GetTicketsSortByCityQuery, GetTicketsSortByStatusQuery, GetTicketsSortByUpvotesQuery, GetAllPicturesQuery, GetPictureQuery } from './queries/api-ticket-query.query';
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
    CreatePictureCommand,
    UpdateTicketUpVotesCommand, 
    IncUpvotesCommand,
    UpdatePictureCommand,
    DeletePictureCommand} from './commands/api-ticket-command.command';

@Injectable()
export class ApiTicketService {
    constructor (private commandBus: CommandBus, private queryBus: QueryBus){}

    async getAll() {
        return await this.queryBus.execute(new GetTicketsQuery())
    }

    async getAllSortByDate() {
        return await this.queryBus.execute(new GetTicketsSortByDateQuery())
    }

    async getAllSortByIssue() {
        return await this.queryBus.execute(new GetTicketsSortByIssueQuery())
    }

    async getAllSortByCity() {
        return await this.queryBus.execute(new GetTicketsSortByCityQuery())
    }

    async getAllSortBystatus() {
        return await this.queryBus.execute(new GetTicketsSortByStatusQuery())
    }

    async getAllSortByUpvotes() {
        return await this.queryBus.execute(new GetTicketsSortByUpvotesQuery())
    }

    async getAllDispatched() {
        return await this.queryBus.execute(new GetTicketsDispatchedQuery())
    }

    async getTicket(ticketId: number){
        return await this.queryBus.execute(new GetTicketQuery(ticketId))
    }

    async updateTicket(ticketId : number, ticketDto : TicketDto){
        return await this.commandBus.execute(new UpdateTicketCommand(ticketId, ticketDto))
    }

    async deleteTicket(ticketId:number){
        return await this.commandBus.execute(new DeleteTicketCommand(ticketId))
    }

    async createTicket(ticketDto : TicketDto){
        return await this.commandBus.execute(new CreateTicketCommand(ticketDto))
    }

    async getStatus(status: string){
        return await this.queryBus.execute(new GetStatusQuery(status))
    }

    async getIssue(issue: string){
        return await this.queryBus.execute(new GetIssueQuery(issue))
    }

    async getCityTicket(city: string){
        return await this.queryBus.execute(new GetCityTicketQuery(city))
    }

    async updateTicketStatus(ticketId:number,ticketStatus: string){
        return await this.commandBus.execute(new UpdateTicketStatusCommand(ticketId,ticketStatus))
    }

    async updateTicketCreateDate(ticketId:number,createDate:Date){
        return await this.commandBus.execute(new UpdateTicketCreateDateCommand(ticketId,createDate))
    }

    async updateTicketCloseDate(ticketId:number,closeDate:Date){
        return await this.commandBus.execute(new UpdateTicketCloseDateCommand(ticketId,closeDate))
    }
    
    async updateTicketType(ticketId:number,type:string){
        return await this.commandBus.execute(new UpdateTicketTypeCommand(ticketId,type))
    }

    async updateTicketLocation(ticketId:number,location:string){
        return await this.commandBus.execute(new UpdateTicketLocationCommand(ticketId,location))
    }

    async updateTicketCost(ticketId:number,cost:number){
        return await this.commandBus.execute(new UpdateTicketCostCommand(ticketId,cost))
    }

    async updateTicketDescription(ticketId:number,description:string){
        return await this.commandBus.execute(new UpdateTicketDescriptionCommand(ticketId,description))
    }

    async updateTicketRepairTime(ticketId:number,repairTime:number){
        return await this.commandBus.execute(new UpdateTicketRepairTimeCommand(ticketId,repairTime))
    }

    async updateTicketUpVotes(ticketId:number,upVotes: number){
        return await this.commandBus.execute(new UpdateTicketUpVotesCommand(ticketId,upVotes))
    }

    async closeTicket(ticketId:number){
        return await this.queryBus.execute(new CloseTicketQuery(ticketId))
    }

    async incUpvotes(ticketId:number){
        return await this.commandBus.execute(new IncUpvotesCommand(ticketId))
    }

    async createPicture(ticketId:number,img_link:string){
        return await this.commandBus.execute(new CreatePictureCommand(ticketId,img_link))
    }

    async getPicture(ticketId:number){
        return await this.queryBus.execute(new GetPictureQuery(ticketId))
    }

    async getAllPictures(ticketId:number){
        return await this.queryBus.execute(new GetAllPicturesQuery(ticketId))
    }

    async updatePicture(pictureId:number,img_link:string){
        return await this.commandBus.execute(new UpdatePictureCommand(pictureId,img_link))
    }

    async deletePicture(pictureId:number){
        return await this.commandBus.execute(new DeletePictureCommand(pictureId))
    }
}
