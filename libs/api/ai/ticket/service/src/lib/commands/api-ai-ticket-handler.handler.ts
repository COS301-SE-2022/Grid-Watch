import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
import {DeleteTicketCommand, CreateTicketCommand,CreatePictureCommand, UpdateTicketCommand, UpdateTicketStatusCommand, UpdateTicketCreateDateCommand, UpdateTicketTypeCommand, UpdateTicketCloseDateCommand, UpdateTicketLocationCommand, UpdateTicketCostCommand, UpdateTicketDescriptionCommand, UpdateTicketRepairTimeCommand, UpdateTicketUpVotesCommand, IncUpvotesCommand, UpdatePictureCommand, DeletePictureCommand, CreateSubtaskCommand, UpdateSubtaskCommand, UpdateSubtaskTicketCommand, UpdateSubtaskDescCommand, UpdateSubtaskStepCommand, UpdateSubtaskStatusCommand, DeleteSubtaskCommand} from './api-ai-ticket-command.command';
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
        const{ticketId,status} = command;
        return this.repository.updateStatus(ticketId,status);
    }
}

@CommandHandler(UpdateTicketCreateDateCommand)
export class UpdateTicketCreateDateHandler implements ICommandHandler<UpdateTicketCreateDateCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

   async execute(command: UpdateTicketCreateDateCommand) {
       const{ticketId,createDate} = command;
       return this.repository.updateCreateDate(ticketId,createDate);
   }
}

@CommandHandler(UpdateTicketCloseDateCommand)
export class UpdateTicketCloseDateHandler implements ICommandHandler<UpdateTicketCloseDateCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

   async execute(command: UpdateTicketCloseDateCommand) {
       const{ticketId,closeDate} = command;
       return this.repository.updateCloseDate(ticketId,closeDate);
   }
}

@CommandHandler(UpdateTicketTypeCommand)
export class UpdateTicketTypeHandler implements ICommandHandler<UpdateTicketTypeCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketTypeCommand) {

        const{ticketId,type} = command;
        return this.repository.updateType(ticketId,type);

    }
}

@CommandHandler(UpdateTicketLocationCommand)
export class UpdateTicketLocationHandler implements ICommandHandler<UpdateTicketLocationCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketLocationCommand) {

        const{ticketId,location} = command;
        return this.repository.updateLocation(ticketId,location);

    }
}

@CommandHandler(UpdateTicketCostCommand)
export class UpdateTicketCostHandler implements ICommandHandler<UpdateTicketCostCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketCostCommand) {

        const{ticketId,cost} = command;
        return this.repository.updateCost(ticketId,cost);

    }
}

@CommandHandler(UpdateTicketDescriptionCommand)
export class UpdateTicketDescriptionHandler implements ICommandHandler<UpdateTicketDescriptionCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketDescriptionCommand) {

        const{ticketId,description} = command;
        return this.repository.updateDescription(ticketId,description);

    }
}

@CommandHandler(UpdateTicketRepairTimeCommand)
export class UpdateTicketRepairTimeHandler implements ICommandHandler<UpdateTicketRepairTimeCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketRepairTimeCommand) {

        const{ticketId,repairTime} = command;
        return this.repository.updateRepairTime(ticketId,repairTime);

    }
}

@CommandHandler(UpdateTicketUpVotesCommand)
export class UpdateTicketUpVotesHandler implements ICommandHandler<UpdateTicketUpVotesCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateTicketUpVotesCommand){

        const{ticketId,upVotes} = command;
        return this.repository.updateUpvotes(ticketId,upVotes);

    }
}

@CommandHandler(IncUpvotesCommand)
export class IncUpvotesHandler implements ICommandHandler<IncUpvotesCommand>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(command: IncUpvotesCommand){

        const{ticketId} = command;
        return this.repository.incUpvotes(ticketId);

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

@CommandHandler(CreateSubtaskCommand)
export class CreateSubtaskHandler implements ICommandHandler<CreateSubtaskCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: CreateSubtaskCommand) {
        const{ticketId,taskDesc,taskStep,taskStat} = command;
        return this.repository.createSubtask(ticketId,taskDesc,taskStep,taskStat);
    }
}

@CommandHandler(UpdateSubtaskCommand)
export class UpdateSubtaskHandler implements ICommandHandler<UpdateSubtaskCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateSubtaskCommand) {
        const{subtaskID,ticketId,taskDesc,taskStep,taskStat} = command;
        return this.repository.updateSubtask(subtaskID,ticketId,taskDesc,taskStep,taskStat);
    }
}

@CommandHandler(UpdateSubtaskTicketCommand)
export class UpdateSubtaskTicketHandler implements ICommandHandler<UpdateSubtaskTicketCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateSubtaskTicketCommand){
        const{subtaskID,ticketId} = command;

        return this.repository.updateSubtaskTicket(subtaskID,ticketId);
    }
}

@CommandHandler(UpdateSubtaskDescCommand)
export class UpdateSubtaskDescHandler implements ICommandHandler<UpdateSubtaskDescCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateSubtaskDescCommand) {
        const{subtaskID,desc} = command;

        return this.repository.updateSubtaskDesc(subtaskID,desc);
    }
}

@CommandHandler(UpdateSubtaskStepCommand)
export class UpdateSubtaskStepHandler implements ICommandHandler<UpdateSubtaskStepCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateSubtaskStepCommand) {
        const{subtaskID,step} = command;
        return this.repository.updateSubtaskStep(subtaskID,step);
    }
}

@CommandHandler(UpdateSubtaskStatusCommand)
export class UpdateSubtaskStatusHandler implements ICommandHandler<UpdateSubtaskStatusCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: UpdateSubtaskStatusCommand) {
        const{subtaskID,status} = command;
        return this.repository.updateSubtaskStatus(subtaskID,status);
    }
}

@CommandHandler(DeleteSubtaskCommand)
export class DeleteSubtaskHandler implements ICommandHandler<DeleteSubtaskCommand>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(command: DeleteSubtaskCommand) {
        const{subtaskID} = command;
        return this.repository.deleteSubtask(subtaskID);
    }
}
