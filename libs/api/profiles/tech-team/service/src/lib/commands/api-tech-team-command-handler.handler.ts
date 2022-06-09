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
export class createTechTeamHandler implements ICommandHandler<CreateTechTeamCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: CreateTechTeamCommand) {
        const{Name,Email,Specialisation,ContactNr,Password} = command;
        return this.repository.createTechTeam(Name,Email,Specialisation,ContactNr,Password);
    }
}

@CommandHandler(UpdateTechTeamCommand)
export class updateTechTeamHandler implements ICommandHandler<UpdateTechTeamCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamCommand) {
        const{TechTeamId,Name,Email,Specialisation,ContactNr} = command;
        return this.repository.UpdateTechTeam(TechTeamId,Name,Email,Specialisation,ContactNr);
    }
}

@CommandHandler(UpdateTechTeamNameCommand)
export class updateTechTeamNameHandler implements ICommandHandler<UpdateTechTeamNameCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamNameCommand) {
        const{TechTeamId,Name} = command;
        return this.repository.UpdateTechTeamName(TechTeamId,Name);
    }
}

@CommandHandler(UpdateTechTeamEmailCommand)
export class updateTechTeamEmailHandler implements ICommandHandler<UpdateTechTeamEmailCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamEmailCommand) {
        const{TechTeamId,Email} = command;
        return this.repository.UpdateTechTeamEmail(TechTeamId,Email);
    }
}

@CommandHandler(UpdateTechTeamSpecialisationCommand)
export class updateTechTeamSpecialisationHandler implements ICommandHandler<UpdateTechTeamSpecialisationCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamSpecialisationCommand) {
        const{TechTeamId,Specialisation} = command;
        return this.repository.UpdateTechTeamSpecialisation(TechTeamId,Specialisation);
    }
}

@CommandHandler(UpdateTechTeamContactNrCommand)
export class updateTechTeamContactNrHandler implements ICommandHandler<UpdateTechTeamContactNrCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamContactNrCommand) {
        const{TechTeamId,ContactNr} = command;
        return this.repository.UpdateTechTeamContactNr(TechTeamId,ContactNr);
    }
}

@CommandHandler(UpdateTechTeamNrJobsCompletedCommand)
export class updateTechTeamNrJobsCompletedHandler implements ICommandHandler<UpdateTechTeamNrJobsCompletedCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamNrJobsCompletedCommand) {
        const{TechTeamId,NrJobsCompleted} = command;
        return this.repository.UpdateTechTeamNrJobsCompleted(TechTeamId,NrJobsCompleted);
    }
}

@CommandHandler(IncTechTeamNrJobsCompletedCommand)
export class IncTechTeamNrJobsCompletedHandler implements ICommandHandler<IncTechTeamNrJobsCompletedCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: IncTechTeamNrJobsCompletedCommand) {
        const{TechTeamId} = command;
        return this.repository.IncTechTeamNrJobsCompleted(TechTeamId);
    }
}

@CommandHandler(UpdateTechTeamRatingJobsCommand)
export class updateTechTeamRatingJobsHandler implements ICommandHandler<UpdateTechTeamRatingJobsCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: UpdateTechTeamRatingJobsCommand) {
        const{TechTeamId,RatingJobs} = command;
        return this.repository.UpdateTechTeamRatingJobs(TechTeamId,RatingJobs);
    }
}

@CommandHandler(DeleteTechTeamCommand)
export class deleteTechTeamHandler implements ICommandHandler<DeleteTechTeamCommand>{
    constructor( private readonly repository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(command: DeleteTechTeamCommand) {
        const{TechTeamId} = command;
        return this.repository.DeleteTechTeam(TechTeamId);
    }
}