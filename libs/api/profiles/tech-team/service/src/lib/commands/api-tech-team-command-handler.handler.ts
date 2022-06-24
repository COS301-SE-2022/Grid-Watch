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
        const{Name,Email,Specialisation,ContactNr,Password} = command;
        return this.repository.createTechTeam(Name,Email,Specialisation,ContactNr,Password);

    }
}

@CommandHandler(UpdateTechTeamCommand)
export class UpdateTechTeamHandler implements ICommandHandler<UpdateTechTeamCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamCommand) {
        const{techTeamId: techTeamId,name: name,email: email,specialisation: specialisation,contactNr: contactNr} = command;
        return this.repository.UpdateTechTeam(techTeamId,name,email,specialisation,contactNr);
    }
}

@CommandHandler(UpdateTechTeamNameCommand)
export class UpdateTechTeamNameHandler implements ICommandHandler<UpdateTechTeamNameCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamNameCommand) {
        const{techTeamId: techTeamId,name: name} = command;
        return this.repository.UpdateTechTeamName(techTeamId,name);
    }
}

@CommandHandler(UpdateTechTeamEmailCommand)
export class UpdateTechTeamEmailHandler implements ICommandHandler<UpdateTechTeamEmailCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamEmailCommand) {
        const{techTeamId: techTeamId,email: email} = command;
        return this.repository.UpdateTechTeamEmail(techTeamId,email);
    }
}

@CommandHandler(UpdateTechTeamSpecialisationCommand)
export class UpdateTechTeamSpecialisationHandler implements ICommandHandler<UpdateTechTeamSpecialisationCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamSpecialisationCommand) {
        const{techTeamId: techTeamId,specialisation: specialisation} = command;
        return this.repository.UpdateTechTeamSpecialisation(techTeamId,specialisation);
    }
}

@CommandHandler(UpdateTechTeamContactNrCommand)
export class UpdateTechTeamContactNrHandler implements ICommandHandler<UpdateTechTeamContactNrCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamContactNrCommand) {
        const{techTeamId: techTeamId,contactNr: contactNr} = command;
        return this.repository.UpdateTechTeamContactNr(techTeamId,contactNr);
    }
}

@CommandHandler(UpdateTechTeamNrJobsCompletedCommand)
export class UpdateTechTeamNrJobsCompletedHandler implements ICommandHandler<UpdateTechTeamNrJobsCompletedCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamNrJobsCompletedCommand) {
        const{techTeamId: techTeamId,nrJobsCompleted: nrJobsCompleted} = command;
        return this.repository.UpdateTechTeamNrJobsCompleted(techTeamId,nrJobsCompleted);
    }
}

@CommandHandler(IncTechTeamNrJobsCompletedCommand)
export class IncTechTeamNrJobsCompletedHandler implements ICommandHandler<IncTechTeamNrJobsCompletedCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: IncTechTeamNrJobsCompletedCommand) {
        const{techTeamId: techTeamId} = command;
        return this.repository.IncTechTeamNrJobsCompleted(techTeamId);
    }
}

@CommandHandler(UpdateTechTeamRatingJobsCommand)
export class UpdateTechTeamRatingJobsHandler implements ICommandHandler<UpdateTechTeamRatingJobsCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamRatingJobsCommand) {
        const{techTeamId: techTeamId,ratingJobs: ratingJobs} = command;
        return this.repository.UpdateTechTeamRatingJobs(techTeamId,ratingJobs);
    }
}

@CommandHandler(DeleteTechTeamCommand)
export class DeleteTechTeamHandler implements ICommandHandler<DeleteTechTeamCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: DeleteTechTeamCommand) {
        const{techTeamId: techTeamId} = command;
        return this.repository.DeleteTechTeam(techTeamId);
    }
}