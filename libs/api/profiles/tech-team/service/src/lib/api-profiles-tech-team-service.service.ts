import { Injectable } from '@nestjs/common';
import {CommandBus} from '@nestjs/cqrs';
import {CreateTechTeamCommand,
    UpdateTechTeamCommand,
    UpdateTechTeamNameCommand,
    UpdateTechTeamEmailCommand,
    UpdateTechTeamSpecialisationCommand,
    UpdateTechTeamContactNrCommand,
    UpdateTechTeamNrJobsCompletedCommand,
    UpdateTechTeamRatingJobsCommand,
    IncTechTeamNrJobsCompletedCommand,
    DeleteTechTeamCommand} from './commands/api-tech-team-command.command';
import {TechTeamDto} from '@grid-watch/api/profiles/tech-team/api/shared/techteamdto';

@Injectable()
export class ApiProfilesTechTeamServiceService {
    constructor(private commandBus: CommandBus){}

 
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
