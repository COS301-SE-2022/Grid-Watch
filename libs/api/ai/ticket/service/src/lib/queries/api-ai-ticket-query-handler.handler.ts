import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import { GetIssueAIQuery} from './api-ai-ticket-query.query';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';

@QueryHandler(GetIssueAIQuery)
export class GetIssueAIHandler implements IQueryHandler<GetIssueAIQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(query: GetIssueAIQuery){
        const{issue} = query;
        return this.repository.getIssue(issue);
    }
}
