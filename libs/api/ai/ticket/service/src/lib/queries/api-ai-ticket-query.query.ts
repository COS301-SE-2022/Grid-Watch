import { AiDto } from "@grid-watch/api/ai/ticket/api/shared/api-ai-ticket-api-dto";

export class GetIssueAIQuery{
    constructor(public readonly issue){}
}

export class GetTechTeamSpecialisationQuery{
    constructor(public readonly specialisation){}
}

export class GetAllTicketsQuery{
 
}

export class ReadAIQuery{
    constructor(public readonly aiID: number){}
}
