import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {DeleteAICommand,SaveAICommand,UpdateAICommand,UpdateAIDataCommand,UpdateAIDateCreatedCommand,UpdateAIFitnessCommand,UpdateAITicketCitiesCommand,UpdateAITicketTypesCommand} from './api-ai-ticket-command.command';
import {ApiAiTicketRepositoryDataAccess} from '@grid-watch/api/ai/ticket/repository';


@CommandHandler(DeleteAICommand)
export class DeleteAIHandler implements ICommandHandler<DeleteAICommand>{
    constructor (private readonly repository:ApiAiTicketRepositoryDataAccess){
        
    }
    async execute(command: DeleteAICommand) {
        const{ aiID}= command;
        return this.repository.deleteAI(aiID);
    }
}

@CommandHandler(SaveAICommand)
export class SaveAIHandler implements ICommandHandler<SaveAICommand>{
    constructor (private readonly repository:ApiAiTicketRepositoryDataAccess){
        
    }
    async execute(command: SaveAICommand) {
        const{ aiDto}= command;
        return this.repository.saveAI(aiDto);
    }
}

@CommandHandler(UpdateAICommand)
export class UpdateAIHandler implements ICommandHandler<UpdateAICommand>{
    constructor (private readonly repository:ApiAiTicketRepositoryDataAccess){
        
    }
    async execute(command: UpdateAICommand) {
        const{ aiID,aiDto}= command;
        return this.repository.updateAI(aiID,aiDto);
    }
}

@CommandHandler(UpdateAIDataCommand)
export class UpdateAIDataHandler implements ICommandHandler<UpdateAIDataCommand>{
    constructor (private readonly repository:ApiAiTicketRepositoryDataAccess){
        
    }
    async execute(command: UpdateAICommand) {
        const{ aiID,aiDto}= command;
        return this.repository.updateAIData(aiID,aiDto);
    }
}

@CommandHandler(UpdateAIFitnessCommand)
export class UpdateAIFitnessHandler implements ICommandHandler<UpdateAIFitnessCommand>{
    constructor (private readonly repository:ApiAiTicketRepositoryDataAccess){
        
    }
    async execute(command: UpdateAIFitnessCommand) {
        const{ aiID,aiDto}= command;
        return this.repository.updateAIFitness(aiID,aiDto);
    }
}

@CommandHandler(UpdateAIDateCreatedCommand)
export class UpdateAIDateCreatedHandler implements ICommandHandler<UpdateAIDateCreatedCommand>{
    constructor (private readonly repository:ApiAiTicketRepositoryDataAccess){
        
    }
    async execute(command: UpdateAIDateCreatedCommand) {
        const{ aiID,aiDto}= command;
        return this.repository.updateAIDateCreated(aiID,aiDto);
    }
}

@CommandHandler(UpdateAITicketTypesCommand)
export class UpdateAITicketTypesHandler implements ICommandHandler<UpdateAITicketTypesCommand>{
    constructor (private readonly repository:ApiAiTicketRepositoryDataAccess){
        
    }
    async execute(command: UpdateAITicketTypesCommand) {
        const{ aiID,aiDto}= command;
        return this.repository.updateAITicketTypes(aiID,aiDto);
    }
}

@CommandHandler(UpdateAITicketCitiesCommand)
export class UpdateAITicketCitiesHandler implements ICommandHandler<UpdateAITicketCitiesCommand>{
    constructor (private readonly repository:ApiAiTicketRepositoryDataAccess){
        
    }
    async execute(command: UpdateAITicketCitiesCommand) {
        const{ aiID,aiDto}= command;
        return this.repository.updateAITicketCities(aiID,aiDto);
    }
}