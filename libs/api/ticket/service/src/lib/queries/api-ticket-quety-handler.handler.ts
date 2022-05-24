import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {CloseTicketQuery, GetCityTicketQuery, GetStatusQuery, GetTicketQuery,GetTicketsDispatchedQuery,GetTicketsQuery, GetIssueQuery, GetTicketsSortByDateQuery } from './api-ticket-query.query';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';
import { Logger } from '@nestjs/common';

@QueryHandler(GetTicketQuery)
export class GetTicketHandler implements IQueryHandler<GetTicketQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess ){}

    async execute(query: GetTicketQuery){
        const {ticketId} = query;
        return this.repository.getTicket(ticketId);

    }


}

@QueryHandler(GetTicketsQuery)
export class GetTicketsHandler implements IQueryHandler<GetTicketsQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(){
        return this.repository.getAllTickets();
    }
}

@QueryHandler(GetTicketsSortByDateQuery)
export class GetTicketsSortByDateHandler implements IQueryHandler<GetTicketsSortByDateQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(){
        return this.repository.getTicketsFilterDate();
    }
}


@QueryHandler(GetTicketsDispatchedQuery)
export class GetTicketsDispatchedHandler implements IQueryHandler<GetTicketsDispatchedQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(){
        return this.repository.getAllTicketsDispatched();
    }
}

@QueryHandler(GetStatusQuery)
export class GetStatusHandler implements IQueryHandler<GetStatusQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(query: GetStatusQuery){
        const{Status} = query;
        return this.repository.getStatus(Status);
    }
}

@QueryHandler(GetIssueQuery)
export class GetIssueHandler implements IQueryHandler<GetIssueQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(query: GetIssueQuery){
        const{issue} = query;
        return this.repository.getIssue(issue);
    }
}

@QueryHandler(GetCityTicketQuery)
export class GetCityHandler implements IQueryHandler<GetCityTicketQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(query: GetCityTicketQuery){
        const{City} = query;
        return this.repository.getCityTicket(City);
    }
}

@QueryHandler(CloseTicketQuery)
export class CloseTicketHandler implements IQueryHandler<CloseTicketQuery>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(query: CloseTicketQuery){
        const{TicketId} = query;
        return this.repository.closeTicket(TicketId);
    }
}