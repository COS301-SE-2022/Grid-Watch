import { Injectable } from '@nestjs/common';
import {CommandBus,QueryBus} from '@nestjs/cqrs';
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

@Injectable()
export class ApiProfilesTechTeamServiceService {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus){}

    async createTechTeam(Name: string, Email: string, Specialisation: string, ContactNr: string){
            return await this.commandBus.execute(new CreateTechTeamCommand(Name,Email,Specialisation,ContactNr))
    }

    async updateTechTeam(TechTeamId: number,Name: string,Email: string, Specialisation: string, ContactNr:string){

            return await this.commandBus.execute(new UpdateTechTeamCommand(TechTeamId,Name,Email,Specialisation,ContactNr))
    }

    async updateTechTeamName(TechTeamId: number,Name: string){
            return await this.commandBus.execute(new UpdateTechTeamNameCommand(TechTeamId,Name))

    }

    async updateTechTeamEmail(TechTeamId: number, Email: string){
            return await this.commandBus.execute(new UpdateTechTeamEmailCommand(TechTeamId,Email))
    }

    async updateTechTeamSpecialisation(TechTeamId: number, Specialisation:string){
        return await this.commandBus.execute(new UpdateTechTeamSpecialisationCommand(TechTeamId,Specialisation))
    }

    async updateTechTeamContactNr(TechTeamId: number, ContactNr: string){
        return await this.commandBus.execute(new UpdateTechTeamContactNrCommand(TechTeamId,ContactNr))
    }

    async updateTechTeamNrJobsCompleted(TechTeamId: number, NrJobsCompleted: number){
        return await this.commandBus.execute(new UpdateTechTeamNrJobsCompletedCommand(TechTeamId,NrJobsCompleted))
    }

    async IncTechTeamNrJobsCompleted(TechTeamId: number){
        return await this.commandBus.execute(new IncTechTeamNrJobsCompletedCommand(TechTeamId))
    }

    async updateTechTeamRatingJobs(TechTeamId: number, RatingJobs: number){
        return await this.commandBus.execute(new UpdateTechTeamRatingJobsCommand(TechTeamId,RatingJobs))

    }

    async DeleteTechTeam(TechTeamId: number){
        return await this.commandBus.execute(new DeleteTechTeamCommand(TechTeamId))
    }
}
