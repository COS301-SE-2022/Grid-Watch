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

@Injectable()
export class ApiProfilesTechTeamServiceService {
    constructor(private commandBus: CommandBus){}

<<<<<<< HEAD
    async createTechTeam(name: string, email: string, specialisation: string, contactNr: string){
            return await this.commandBus.execute(new CreateTechTeamCommand(name,email,specialisation,contactNr))
=======
    async createTechTeam(Name: string, Email: string, Specialisation: string, ContactNr: string, Password :string){
            return await this.commandBus.execute(new CreateTechTeamCommand(Name,Email,Specialisation,ContactNr,Password))
>>>>>>> 7c64f475c81696a498da307c1c036a62b621f2a3
    }

    async updateTechTeam(techTeamId: number,name: string,email: string, specialisation: string, contactNr:string){

            return await this.commandBus.execute(new UpdateTechTeamCommand(techTeamId,name,email,specialisation,contactNr))
    }

    async updateTechTeamName(techTeamId: number,name: string){
            return await this.commandBus.execute(new UpdateTechTeamNameCommand(techTeamId,name))

    }

    async updateTechTeamEmail(techTeamId: number, email: string){
            return await this.commandBus.execute(new UpdateTechTeamEmailCommand(techTeamId,email))
    }

    async updateTechTeamSpecialisation(techTeamId: number, specialisation:string){
        return await this.commandBus.execute(new UpdateTechTeamSpecialisationCommand(techTeamId,specialisation))
    }

    async updateTechTeamContactNr(techTeamId: number, contactNr: string){
        return await this.commandBus.execute(new UpdateTechTeamContactNrCommand(techTeamId,contactNr))
    }

    async updateTechTeamNrJobsCompleted(techTeamId: number, nrJobsCompleted: number){
        return await this.commandBus.execute(new UpdateTechTeamNrJobsCompletedCommand(techTeamId,nrJobsCompleted))
    }

    async incTechTeamNrJobsCompleted(techTeamId: number){
        return await this.commandBus.execute(new IncTechTeamNrJobsCompletedCommand(techTeamId))
    }

    async updateTechTeamRatingJobs(techTeamId: number, ratingJobs: number){
        return await this.commandBus.execute(new UpdateTechTeamRatingJobsCommand(techTeamId,ratingJobs))

    }

    async deleteTechTeam(techTeamId: number){
        return await this.commandBus.execute(new DeleteTechTeamCommand(techTeamId))
    }
}
