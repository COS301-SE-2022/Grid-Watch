import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
import {DeleteTicketCommand, CreateTicketCommand, UpdateTicketCommand} from './api-ticket-command.command';

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