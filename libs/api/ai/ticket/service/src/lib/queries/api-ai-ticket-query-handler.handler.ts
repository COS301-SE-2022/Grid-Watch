import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import { GetAllTicketsQuery,ReadAIQuery, GetIssueAIQuery,GetTechTeamSpecialisationQuery} from './api-ai-ticket-query.query';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
import {ApiProfilesTechTeamRepositoryDataAccess} from '@grid-watch/api/profiles/tech-team/repository';
import {ApiAiTicketRepositoryDataAccess} from '@grid-watch/api/ai/ticket/repository';

@QueryHandler(GetIssueAIQuery)
export class GetIssueAIHandler implements IQueryHandler<GetIssueAIQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(query: GetIssueAIQuery){
        const{issue} = query;
        return this.repository.getIssue(issue);
    }
}

@QueryHandler(GetTechTeamSpecialisationQuery)
export class GetTechTeamSpecialisationHandler implements IQueryHandler<GetTechTeamSpecialisationQuery>{
    constructor(private readonly techTeamRepository: ApiProfilesTechTeamRepositoryDataAccess){}

    async execute(query: GetTechTeamSpecialisationQuery){
        const{specialisation} = query;
        return this.techTeamRepository.getTechTeamSpecialisation(specialisation);
    }
}


@QueryHandler(GetAllTicketsQuery)
export class GetAllTicketsHandler implements IQueryHandler<GetAllTicketsQuery>{
    constructor(private readonly ticketRepository: ApiTicketRepositoryDataAccess){}

    async execute(){
        
        return this.ticketRepository.getAllTickets();
    }
}

@QueryHandler(ReadAIQuery)
export class ReadAIHandler implements IQueryHandler<ReadAIQuery>{
    constructor(private readonly repository: ApiAiTicketRepositoryDataAccess){}

    async execute(query: ReadAIQuery){
        const{aiDto} = query;
        return this.repository.saveAI(aiDto);
    }
}