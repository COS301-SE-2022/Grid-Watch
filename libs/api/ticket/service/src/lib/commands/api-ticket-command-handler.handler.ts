import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
import {DeleteTicketCommand, CreateTicketCommand,CreatePictureCommand, UpdateTicketCommand, UpdateTicketStatusCommand, UpdateTicketCreateDateCommand, UpdateTicketTypeCommand, UpdateTicketCloseDateCommand, UpdateTicketLocationCommand, UpdateTicketCostCommand, UpdateTicketDescriptionCommand, UpdateTicketRepairTimeCommand, UpdateTicketUpVotesCommand, IncUpvotesCommand, UpdatePictureCommand, DeletePictureCommand} from './api-ticket-command.command';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateTicketCommand)
export class CreateTicketHandler implements ICommandHandler<CreateTicketCommand>{
    constructor (private readonly repository:ApiTicketRepositoryDataAccess){
        
    }
    async execute(command: CreateTicketCommand) {
        const{ ticketDto}= command;
        return this.repository.createTicket(ticketDto);
    }
}

@CommandHandler(UpdateTicketCommand)
export class UpdateTicketHandler implements ICommandHandler<UpdateTicketCommand>{

    constructor (private readonly repository:ApiTicketRepositoryDataAccess){

    }
    async execute(command: UpdateTicketCommand) {
        const{ticketId,ticketDto}= command;
        return this.repository.updateTicket(ticketId,ticketDto)
    }
}

@CommandHandler(DeleteTicketCommand)
export class DeleteTicketHandler implements ICommandHandler<DeleteTicketCommand>{

    constructor (private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: DeleteTicketCommand){
        const{ticketId} = command;
        return this.repository.deleteTicket(ticketId);
    }
}

@CommandHandler(UpdateTicketStatusCommand)
export class UpdateTicketStatusHandler implements ICommandHandler<UpdateTicketStatusCommand>{

    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketStatusCommand) {
        const{TicketId,Status} = command;
        return this.repository.updateStatus(TicketId,Status);
    }
}

@CommandHandler(UpdateTicketCreateDateCommand)
export class UpdateTicketCreateDateHandler implements ICommandHandler<UpdateTicketCreateDateCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

   async execute(command: UpdateTicketCreateDateCommand) {
       const{TicketId,CreateDate} = command;
       return this.repository.updateCreateDate(TicketId,CreateDate);
   }
}

@CommandHandler(UpdateTicketCloseDateCommand)
export class UpdateTicketCloseDateHandler implements ICommandHandler<UpdateTicketCloseDateCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

   async execute(command: UpdateTicketCloseDateCommand) {
       const{TicketId,CloseDate} = command;
       return this.repository.updateCloseDate(TicketId,CloseDate);
   }
}

@CommandHandler(UpdateTicketTypeCommand)
export class UpdateTicketTypeHandler implements ICommandHandler<UpdateTicketTypeCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketTypeCommand) {
        const{TicketId,Type} = command;
        return this.repository.updateType(TicketId,Type);
    }
}

@CommandHandler(UpdateTicketLocationCommand)
export class UpdateTicketLocationHandler implements ICommandHandler<UpdateTicketLocationCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketLocationCommand) {
        const{TicketId,Location} = command;
        return this.repository.updateLocation(TicketId,Location);
    }
}

@CommandHandler(UpdateTicketCostCommand)
export class UpdateTicketCostHandler implements ICommandHandler<UpdateTicketCostCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketCostCommand) {
        const{TicketId,Cost} = command;
        return this.repository.updateCost(TicketId,Cost);
    }
}

@CommandHandler(UpdateTicketDescriptionCommand)
export class UpdateTicketDescriptionHandler implements ICommandHandler<UpdateTicketDescriptionCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketDescriptionCommand) {
        const{TicketId,Description} = command;
        return this.repository.updateDescription(TicketId,Description);
    }
}

@CommandHandler(UpdateTicketRepairTimeCommand)
export class UpdateTicketRepairTimeHandler implements ICommandHandler<UpdateTicketRepairTimeCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketRepairTimeCommand) {
        const{TicketId,RepairTime} = command;
        return this.repository.updateRepairTime(TicketId,RepairTime);
    }
}

@CommandHandler(UpdateTicketUpVotesCommand)
export class UpdateTicketUpVotesHandler implements ICommandHandler<UpdateTicketUpVotesCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketUpVotesCommand){
        const{TicketId,UpVotes} = command;
        return this.repository.updateUpvotes(TicketId,UpVotes);
    }
}

@CommandHandler(IncUpvotesCommand)
export class IncUpvotesHandler implements ICommandHandler<IncUpvotesCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: IncUpvotesCommand){
        const{TicketId} = command;
        return this.repository.incUpvotes(TicketId);
    }
}

@CommandHandler(CreatePictureCommand)
export class CreatePictureHandler implements ICommandHandler<CreatePictureCommand>{
    constructor (private readonly repository:ApiTicketRepositoryDataAccess){
        
    }
    async execute(command: CreatePictureCommand) {
        const{TicketId,img_link}= command;
        return this.repository.createPicture(TicketId,img_link);
    }
}

@CommandHandler(UpdatePictureCommand)
export class UpdatePictureHandler implements ICommandHandler<UpdatePictureCommand>{

    constructor (private readonly repository:ApiTicketRepositoryDataAccess){

    }
    async execute(command: UpdatePictureCommand) {
        const{PictureId,img_link}= command;
        return this.repository.updatePicture(PictureId,img_link);
    }
}

@CommandHandler(DeletePictureCommand)
export class DeletePictureHanadler implements ICommandHandler<DeletePictureCommand>{
    constructor (private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: DeletePictureCommand) {
        const{PictureId} = command;
        return this.repository.deletePicture(PictureId);
    }
}
