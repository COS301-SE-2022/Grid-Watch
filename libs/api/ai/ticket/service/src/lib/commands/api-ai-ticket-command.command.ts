import { AiDto } from "@grid-watch/api/ai/ticket/api/shared/api-ai-ticket-api-dto";

export class SaveAICommand{
    constructor(
        public readonly aiDto : AiDto
        ){}

}

export class UpdateAICommand{
    constructor(public readonly aiID, 
                public readonly aiDto: AiDto
                ){}
}

export class UpdateAIDataCommand{
    constructor(public readonly aiID, 
                public readonly aiDto: AiDto
                ){}
}

export class UpdateAIFitnessCommand{
    constructor(public readonly aiID, 
                public readonly aiDto: AiDto
                ){}
}

export class UpdateAIDateCreatedCommand{
    constructor(public readonly aiID,
                public readonly aiDto: AiDto
                ){}
}

export class UpdateAITicketTypesCommand{
    constructor(public readonly aiID, 
                public readonly aiDto:AiDto
                ){}
}

export class UpdateAITicketCitiesCommand{
    constructor(public readonly aiID, 
                public readonly aiDto: AiDto
                ){}
}

export class DeleteAICommand{
    constructor(public readonly aiID, 
                ){}
}