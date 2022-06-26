import {CommandHandler,ICommandHandler} from '@nestjs/cqrs';
import {CreateTechTeamCommand,
    UpdateTechTeamCommand,
    UpdateTechTeamNameCommand,
    UpdateTechTeamEmailCommand,
    UpdateTechTeamSpecialisationCommand,
    UpdateTechTeamContactNrCommand,
    UpdateTechTeamNrJobsCompletedCommand,
    DeleteTechTeamCommand,
    IncTechTeamNrJobsCompletedCommand,
    UpdateTechTeamRatingJobsCommand} from './api-tech-team-command.command';
import {ApiProfilesTechTeamRepositoryDataAccess} from '@grid-watch/api/profiles/tech-team/repository';


@CommandHandler(CreateTechTeamCommand)
export class CreateTechTeamHandler implements ICommandHandler<CreateTechTeamCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: CreateTechTeamCommand) {
        const{techTeamDto} = command;
        return this.repository.createTechTeam(techTeamDto.name, techTeamDto.email, techTeamDto.specialisation, techTeamDto.contactNumber, techTeamDto.password);
    }
}

@CommandHandler(UpdateTechTeamCommand)
export class UpdateTechTeamHandler implements ICommandHandler<UpdateTechTeamCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamCommand) {
        const{techTeamId,techTeamDto} = command;
        return this.repository.updateTechTeam(techTeamId,techTeamDto.name, techTeamDto.email, techTeamDto.specialisation, techTeamDto.contactNumber);
    }
}

@CommandHandler(UpdateTechTeamNameCommand)
export class UpdateTechTeamNameHandler implements ICommandHandler<UpdateTechTeamNameCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamNameCommand) {
        const{techTeamId,name} = command;
        return this.repository.updateTechTeamName(techTeamId,name);
    }
}

@CommandHandler(UpdateTechTeamEmailCommand)
export class UpdateTechTeamEmailHandler implements ICommandHandler<UpdateTechTeamEmailCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamEmailCommand) {
        const{techTeamId,email} = command;
        return this.repository.updateTechTeamEmail(techTeamId,email);
    }
}

@CommandHandler(UpdateTechTeamSpecialisationCommand)
export class UpdateTechTeamSpecialisationHandler implements ICommandHandler<UpdateTechTeamSpecialisationCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamSpecialisationCommand) {
        const{techTeamId,specialisation} = command;
        return this.repository.updateTechTeamSpec(techTeamId,specialisation);
    }
}

@CommandHandler(UpdateTechTeamContactNrCommand)
export class UpdateTechTeamContactNrHandler implements ICommandHandler<UpdateTechTeamContactNrCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamContactNrCommand) {
        const{techTeamId,contactNr} = command;
        return this.repository.updateTechTeamContactNr(techTeamId,contactNr);
    }
}

@CommandHandler(UpdateTechTeamNrJobsCompletedCommand)
export class UpdateTechTeamNrJobsCompletedHandler implements ICommandHandler<UpdateTechTeamNrJobsCompletedCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamNrJobsCompletedCommand) {
        const{techTeamId,nrJobsCompleted} = command;
        return this.repository.updateTechTeamNrJobsCompleted(techTeamId,nrJobsCompleted);
    }
}

@CommandHandler(IncTechTeamNrJobsCompletedCommand)
export class IncTechTeamNrJobsCompletedHandler implements ICommandHandler<IncTechTeamNrJobsCompletedCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: IncTechTeamNrJobsCompletedCommand) {
        const{techTeamId} = command;
        return this.repository.incTechTeamNrJobsCompleted(techTeamId);
    }
}

@CommandHandler(UpdateTechTeamRatingJobsCommand)
export class UpdateTechTeamRatingJobsHandler implements ICommandHandler<UpdateTechTeamRatingJobsCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamRatingJobsCommand) {
        const{techTeamId,ratingJobs} = command;
        return this.repository.updateTechTeamRatingJobs(techTeamId,ratingJobs);
    }
}

@CommandHandler(DeleteTechTeamCommand)
export class DeleteTechTeamHandler implements ICommandHandler<DeleteTechTeamCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: DeleteTechTeamCommand) {
        const{techTeamId} = command;
        return this.repository.deleteTechTeam(techTeamId);
    }
}