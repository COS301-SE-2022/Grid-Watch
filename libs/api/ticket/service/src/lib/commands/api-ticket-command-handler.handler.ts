import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
import {DeleteTicketCommand, CreateTicketCommand, UpdateTicketCommand, UpdateTicketStatusCommand, UpdateTicketCreateDateCommand, UpdateTicketTypeCommand, UpdateTicketCloseDateCommand, UpdateTicketLocationCommand, UpdateTicketCostCommand, UpdateTicketDescriptionCommand, UpdateTicketRepairTimeCommand, UpdateTicketUpVotesCommand} from './api-ticket-command.command';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateTicketCommand)
export class createTicketHandler implements ICommandHandler<CreateTicketCommand>{
    constructor (private readonly repository:ApiTicketRepositoryDataAccess){
        
    }
    async execute(command: CreateTicketCommand) {
        const{ status,description,createDate,closeDate,cost,location,city,repairTime,upVotes,type}= command;
        return this.repository.createTicket(status,createDate,closeDate,type,city,location,cost,description,repairTime,upVotes);
    }
}

@CommandHandler(UpdateTicketCommand)
export class updateTicketHandler implements ICommandHandler<UpdateTicketCommand>{

    constructor (private readonly repository:ApiTicketRepositoryDataAccess){

    }
    async execute(command: UpdateTicketCommand) {
        const{ticketId, status,description,createDate,closeDate,cost,location,city,repairTime,upVotes,type}= command;
        return this.repository.UpdateTicket(ticketId,status,createDate,closeDate,type,city,location,cost,description,repairTime,upVotes)
    }
}

@CommandHandler(DeleteTicketCommand)
export class deleteTicketHandler implements ICommandHandler<DeleteTicketCommand>{

    constructor (private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: DeleteTicketCommand){
        const{ticketId} = command;
        return this.repository.deleteTicket(ticketId);
    }
}

@CommandHandler(UpdateTicketStatusCommand)
export class updateTicketStatusHandler implements ICommandHandler<UpdateTicketStatusCommand>{

    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketStatusCommand) {
        const{TicketId,Status} = command;
        return this.repository.UpdateStatus(TicketId,Status);
    }
}

@CommandHandler(UpdateTicketCreateDateCommand)
export class updateTicketCreateDateHandler implements ICommandHandler<UpdateTicketCreateDateCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

   async execute(command: UpdateTicketCreateDateCommand) {
       const{TicketId,CreateDate} = command;
       return this.repository.UpdateCreateDate(TicketId,CreateDate);
   }
}

@CommandHandler(UpdateTicketCloseDateCommand)
export class updateTicketCloseDateHandler implements ICommandHandler<UpdateTicketCloseDateCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

   async execute(command: UpdateTicketCloseDateCommand) {
       const{TicketId,CloseDate} = command;
       return this.repository.UpdateCloseDate(TicketId,CloseDate);
   }
}

@CommandHandler(UpdateTicketTypeCommand)
export class updateTicketTypeHandler implements ICommandHandler<UpdateTicketTypeCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketTypeCommand) {
        const{TicketId,Type} = command;
        return this.repository.UpdateType(TicketId,Type);
    }
}

@CommandHandler(UpdateTicketLocationCommand)
export class updateTicketLocationHandler implements ICommandHandler<UpdateTicketLocationCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketLocationCommand) {
        const{TicketId,Location} = command;
        return this.repository.UpdateLocation(TicketId,Location);
    }
}

@CommandHandler(UpdateTicketCostCommand)
export class updateTicketCostHandler implements ICommandHandler<UpdateTicketCostCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketCostCommand) {
        const{TicketId,Cost} = command;
        return this.repository.UpdateCost(TicketId,Cost);
    }
}

@CommandHandler(UpdateTicketDescriptionCommand)
export class updateTicketDescriptionHandler implements ICommandHandler<UpdateTicketDescriptionCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketDescriptionCommand) {
        const{TicketId,Description} = command;
        return this.repository.UpdateDescription(TicketId,Description);
    }
}

@CommandHandler(UpdateTicketRepairTimeCommand)
export class updateTicketRepairTimeHandler implements ICommandHandler<UpdateTicketRepairTimeCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketRepairTimeCommand) {
        const{TicketId,RepairTime} = command;
        return this.repository.UpdateRepairTime(TicketId,RepairTime);
    }
}

@CommandHandler(UpdateTicketUpVotesCommand)
export class updateTicketUpVotesHandler implements ICommandHandler<UpdateTicketUpVotesCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketUpVotesCommand){
        const{TicketId,UpVotes} = command;
        return this.repository.UpdateUpvotes(TicketId,UpVotes);
    }
}