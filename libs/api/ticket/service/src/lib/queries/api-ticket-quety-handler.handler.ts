import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {GetTicketQuery,GetTicketsQuery } from './api-ticket-query.query';
import {ApiTicketRepositoryDataAccess} from '@grid-watch/api/ticket/repository';

@QueryHandler(GetTicketQuery)
export class GetTicketHandler implements IQueryHandler<GetTicketQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess ){}

    async execute(query: GetTicketQuery): Promise<any> {
        const {ticketId} = query;
        return this.repository.getTicket(ticketId);

    }


}

@QueryHandler(GetTicketsQuery)
export class GetTicketsHandler implements IQueryHandler<GetTicketsQuery>{
    constructor(private readonly repsitory: ApiTicketRepositoryDataAccess){}

    async execute(query: GetTicketsQuery): Promise<any> {
        return this.repsitory.getAllTickets();
    }
}