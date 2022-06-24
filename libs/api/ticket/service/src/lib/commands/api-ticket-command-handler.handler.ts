import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
import {DeleteTicketCommand, CreateTicketCommand,CreatePictureCommand, UpdateTicketCommand, UpdateTicketStatusCommand, UpdateTicketCreateDateCommand, UpdateTicketTypeCommand, UpdateTicketCloseDateCommand, UpdateTicketLocationCommand, UpdateTicketCostCommand, UpdateTicketDescriptionCommand, UpdateTicketRepairTimeCommand, UpdateTicketUpVotesCommand, IncUpvotesCommand, UpdatePictureCommand, DeletePictureCommand} from './api-ticket-command.command';
import { Logger } from '@nestjs/common';

@CommandHandler(CreateTicketCommand)
export class CreateTicketHandler implements ICommandHandler<CreateTicketCommand>{
    constructor (private readonly repository:ApiTicketRepositoryDataAccess){
        
    }
    async execute(command: CreateTicketCommand) {
        const{ status,description,createDate,closeDate,cost,location,city,repairTime,upVotes,type}= command;
        return this.repository.createTicket(status,createDate,closeDate,type,city,location,cost,description,repairTime,upVotes);
    }
}

@CommandHandler(UpdateTicketCommand)
export class UpdateTicketHandler implements ICommandHandler<UpdateTicketCommand>{

    constructor (private readonly repository:ApiTicketRepositoryDataAccess){

    }
    async execute(command: UpdateTicketCommand) {
        const{ticketId, status,description,createDate,closeDate,cost,location,city,repairTime,upVotes,type}= command;
        return this.repository.UpdateTicket(ticketId,status,createDate,closeDate,type,city,location,cost,description,repairTime,upVotes)
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
        const{ticketId: ticketId,status: status} = command;
        return this.repository.UpdateStatus(ticketId,status);
    }
}

@CommandHandler(UpdateTicketCreateDateCommand)
export class UpdateTicketCreateDateHandler implements ICommandHandler<UpdateTicketCreateDateCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

   async execute(command: UpdateTicketCreateDateCommand) {
       const{ticketId: ticketId,createDate: createDate} = command;
       return this.repository.UpdateCreateDate(ticketId,createDate);
   }
}

@CommandHandler(UpdateTicketCloseDateCommand)
export class UpdateTicketCloseDateHandler implements ICommandHandler<UpdateTicketCloseDateCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

   async execute(command: UpdateTicketCloseDateCommand) {
       const{ticketId: ticketId,closeDate: closeDate} = command;
       return this.repository.UpdateCloseDate(ticketId,closeDate);
   }
}

@CommandHandler(UpdateTicketTypeCommand)
export class UpdateTicketTypeHandler implements ICommandHandler<UpdateTicketTypeCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketTypeCommand) {
        const{ticketId: ticketId,type: type} = command;
        return this.repository.UpdateType(ticketId,type);
    }
}

@CommandHandler(UpdateTicketLocationCommand)
export class UpdateTicketLocationHandler implements ICommandHandler<UpdateTicketLocationCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketLocationCommand) {
        const{ticketId: ticketId,location: location} = command;
        return this.repository.UpdateLocation(ticketId,location);
    }
}

@CommandHandler(UpdateTicketCostCommand)
export class UpdateTicketCostHandler implements ICommandHandler<UpdateTicketCostCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketCostCommand) {
        const{ticketId: ticketId,cost: cost} = command;
        return this.repository.UpdateCost(ticketId,cost);
    }
}

@CommandHandler(UpdateTicketDescriptionCommand)
export class UpdateTicketDescriptionHandler implements ICommandHandler<UpdateTicketDescriptionCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketDescriptionCommand) {
        const{ticketId: ticketId,description: description} = command;
        return this.repository.UpdateDescription(ticketId,description);
    }
}

@CommandHandler(UpdateTicketRepairTimeCommand)
export class UpdateTicketRepairTimeHandler implements ICommandHandler<UpdateTicketRepairTimeCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketRepairTimeCommand) {
        const{ticketId: ticketId,repairTime: repairTime} = command;
        return this.repository.UpdateRepairTime(ticketId,repairTime);
    }
}

@CommandHandler(UpdateTicketUpVotesCommand)
export class UpdateTicketUpVotesHandler implements ICommandHandler<UpdateTicketUpVotesCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketUpVotesCommand){
        const{ticketId: ticketId,upVotes: upVotes} = command;
        return this.repository.UpdateUpvotes(ticketId,upVotes);
    }
}

@CommandHandler(IncUpvotesCommand)
export class IncUpvotesHandler implements ICommandHandler<IncUpvotesCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: IncUpvotesCommand){
        const{ticketId: ticketId} = command;
        return this.repository.IncUpvotes(ticketId);
    }
}

@CommandHandler(CreatePictureCommand)
export class CreatePictureHandler implements ICommandHandler<CreatePictureCommand>{
    constructor (private readonly repository:ApiTicketRepositoryDataAccess){
        
    }
    async execute(command: CreatePictureCommand) {
        const{ticketId: ticketId,imgLink: imgLink}= command;
        return this.repository.createPicture(ticketId,imgLink);
    }
}

@CommandHandler(UpdatePictureCommand)
export class UpdatePictureHandler implements ICommandHandler<UpdatePictureCommand>{

    constructor (private readonly repository:ApiTicketRepositoryDataAccess){

    }
    async execute(command: UpdatePictureCommand) {
        const{pictureId: pictureId,imgLink: imgLink}= command;
        return this.repository.updatePicture(pictureId,imgLink);
    }
}

@CommandHandler(DeletePictureCommand)
export class DeletePictureHanadler implements ICommandHandler<DeletePictureCommand>{
    constructor (private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: DeletePictureCommand) {
        const{pictureId: pictureId} = command;
        return this.repository.deletePicture(pictureId);
    }
}
