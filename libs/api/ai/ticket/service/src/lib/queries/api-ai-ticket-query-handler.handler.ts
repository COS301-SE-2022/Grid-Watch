import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import { GetIssueAIQuery,GetTechTeamSpecialisationQuery} from './api-ai-ticket-query.query';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
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
