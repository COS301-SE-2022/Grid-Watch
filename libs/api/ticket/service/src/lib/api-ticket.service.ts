import { Injectable, Logger } from '@nestjs/common';
import { TicketDto } from '@grid-watch/api/ticket/api/shared/ticketdto';
//import {Ticket,PrismaClient} from '@prisma/client';
import {QueryBus,CommandBus} from '@nestjs/cqrs';
import { GetTicketQuery, GetIssueQuery, GetTicketsQuery,GetCityTicketQuery,GetStatusQuery,CloseTicketQuery, GetTicketsDispatchedQuery, GetTicketsSortByDateQuery, GetTicketsSortByIssueQuery, GetTicketsSortByCityQuery, GetTicketsSortByStatusQuery, GetTicketsSortByUpvotesQuery, GetAllPicturesQuery, GetPictureQuery, GetAllSubtasksQuery, GetTicketsFromQuery } from './queries/api-ticket-query.query';
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
    DeletePictureCommand,
    CreateSubtaskCommand,
    UpdateSubtaskCommand,
    UpdateSubtaskDescCommand,
    UpdateSubtaskStepCommand,
    UpdateSubtaskTicketCommand,
    UpdateSubtaskStatusCommand,
    UpdateLatitudeCommand,
    UpdateLongitudeCommand,
    UpdateStreetAddressCommand,
    DeleteSubtaskCommand,
    updateAssignedTechTeamCommand} from './commands/api-ticket-command.command';

@Injectable()
export class ApiTicketService {
    constructor (private commandBus: CommandBus, private queryBus: QueryBus){}

    async getAll() {
        return await this.queryBus.execute(new GetTicketsQuery())
    }

    async getAllFrom(take: number, skip : number) {
        return await this.queryBus.execute(new GetTicketsFromQuery(skip, take))
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

    async updateStreetAddress(ticketId:number,address: string){
        return await this.commandBus.execute(new UpdateStreetAddressCommand(ticketId,address))
    }

    async updateLongitude(ticketId:number,long: number){
        return await this.commandBus.execute(new UpdateLongitudeCommand(ticketId,long))
    }

    async updateLatitude(ticketId:number,lat: number){
        return await this.commandBus.execute(new UpdateLatitudeCommand(ticketId,lat))
    }

    async updateAssignedTechTeam(ticketId:number, techTeamId : number){
        return await this.commandBus.execute(new updateAssignedTechTeamCommand(ticketId, techTeamId))
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

    async createSubtask(ticketId: number, taskDesc: string,taskStep: number,taskStat: string){
        return await this.commandBus.execute(new CreateSubtaskCommand(ticketId,taskDesc,taskStep,taskStat))
    }

    async getAllSubtasks(ticketId){
        return await this.queryBus.execute(new GetAllSubtasksQuery(ticketId))

    }

    async updateSubtask(subtaskID : number, ticketId : number, taskDesc:string, taskStep:number, taskStat: string){
        return await this.commandBus.execute(new UpdateSubtaskCommand(subtaskID,ticketId,taskDesc,taskStep,taskStat))
    }

    async updateSubtaskTicket(subtaskID : number, ticketId : number){
        return await this.commandBus.execute(new UpdateSubtaskTicketCommand(subtaskID,ticketId))
    }

    async updateSubtaskDesc(subtaskID : number, desc : string){
        return await this.commandBus.execute(new UpdateSubtaskDescCommand(subtaskID,desc))
    }

    async updateSubtaskStep(subtaskID : number, step : number){
        return await this.commandBus.execute(new UpdateSubtaskStepCommand(subtaskID,step))
    }

    async updateSubtaskStatus(subtaskID : number, stat : string){
        return await this.commandBus.execute(new UpdateSubtaskStatusCommand(subtaskID,stat))
    }

    async deleteSubtask(subtaskID: number){
        return await this.commandBus.execute(new DeleteSubtaskCommand(subtaskID))
    }
}
