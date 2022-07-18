import { Injectable } from '@nestjs/common';
import {CommandBus, QueryBus} from '@nestjs/cqrs';
import {CreateTechTeamCommand,
    UpdateTechTeamCommand,
    UpdateTechTeamNameCommand,
    UpdateTechTeamEmailCommand,
    UpdateTechTeamSpecialisationCommand,
    UpdateTechTeamContactNrCommand,
    UpdateTechTeamNrJobsCompletedCommand,
    UpdateTechTeamRatingJobsCommand,
    IncTechTeamNrJobsCompletedCommand,
    DeleteTechTeamCommand,
    VerifyPasswordCommand,
    AssignTicketCommand,
} from './commands/api-tech-team-command.command';

import {GetTechTeamsQuery,
        GetTechTeamIdQuery,
        GetTechTeamNameQuery,
        SearchTechTeamNameQuery,
        GetTechTeamEmailQuery,
        GetTechTeamSpecialisationQuery,
        GetTechTeamContactNrQuery,
        GetAllAssignedTicketsQuery,
    } from './queries/api-tech-team-query.query'
import {TechTeamDto} from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';

@Injectable()
export class ApiProfilesTechTeamServiceService {
    constructor(private commandBus: CommandBus,
                private queryBus: QueryBus){}

    async getTechTeams(){

        return await this.queryBus.execute(new GetTechTeamsQuery());
    }
    
    async getTechTeamId(techTeamId: number){

        return await this.queryBus.execute(new GetTechTeamIdQuery(techTeamId));
    }

    async getTechTeamName(name: string){

        return await this.queryBus.execute(new GetTechTeamNameQuery(name));
    }

    async searchTechTeamName(partial: string){

        return await this.queryBus.execute(new SearchTechTeamNameQuery(partial));
    }

    async getTechTeamEmail(techEmail: string){

        return await this.queryBus.execute(new GetTechTeamEmailQuery(techEmail));
    }

    async getTechTeamSpecialisation(specs: string){

        return await this.queryBus.execute(new GetTechTeamSpecialisationQuery(specs));
    }

    async getTechTeamContactNr(techContactNr: string){

        return await this.queryBus.execute(new GetTechTeamContactNrQuery(techContactNr));
    }

    async getAllAssignedTickets(techTeamID: number){

        return await this.queryBus.execute(new GetAllAssignedTicketsQuery(techTeamID));
    }

    async verifyPassword(email: string,password:string){
        return await this.commandBus.execute(new VerifyPasswordCommand(email,password));
    }

    async assignTicket(ticketId : number, techTeamId: number){
        return await this.commandBus.execute(new AssignTicketCommand(ticketId,techTeamId));
    }
        

    async createTechTeam(techTeamDto: TechTeamDto){
            return await this.commandBus.execute(new CreateTechTeamCommand(techTeamDto))
    }

    async updateTechTeam(techTeamId: number,techTeamDto: TechTeamDto){

            return await this.commandBus.execute(new UpdateTechTeamCommand(techTeamId,techTeamDto))
    }

    async updateTechTeamName(techTeamId: number,Name: string){
            return await this.commandBus.execute(new UpdateTechTeamNameCommand(techTeamId,Name))

    }

    async updateTechTeamEmail(techTeamId: number, Email: string){
            return await this.commandBus.execute(new UpdateTechTeamEmailCommand(techTeamId,Email))
    }

    async updateTechTeamSpecialisation(techTeamId: number, Specialisation:string){
        return await this.commandBus.execute(new UpdateTechTeamSpecialisationCommand(techTeamId,Specialisation))
    }

    async updateTechTeamContactNr(techTeamId: number, ContactNr: string){
        return await this.commandBus.execute(new UpdateTechTeamContactNrCommand(techTeamId,ContactNr))
    }

    async updateTechTeamNrJobsCompleted(techTeamId: number, NrJobsCompleted: number){
        return await this.commandBus.execute(new UpdateTechTeamNrJobsCompletedCommand(techTeamId,NrJobsCompleted))
    }

    async incTechTeamNrJobsCompleted(techTeamId: number){
        return await this.commandBus.execute(new IncTechTeamNrJobsCompletedCommand(techTeamId))
    }

    async updateTechTeamRatingJobs(techTeamId: number, RatingJobs: number){
        return await this.commandBus.execute(new UpdateTechTeamRatingJobsCommand(techTeamId,RatingJobs))


    }

    async deleteTechTeam(techTeamId: number){
        return await this.commandBus.execute(new DeleteTechTeamCommand(techTeamId))
    }
}
