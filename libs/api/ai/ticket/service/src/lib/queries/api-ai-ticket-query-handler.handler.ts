import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import { GetAllTicketsQuery, GetIssueAIQuery,GetTechTeamSpecialisationQuery} from './api-ai-ticket-query.query';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
import {ApiProfilesTechTeamRepositoryDataAccess} from '@grid-watch/api/profiles/tech-team/repository';

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