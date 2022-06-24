import {IQueryHandler, QueryHandler} from '@nestjs/cqrs';
import {CloseTicketQuery, GetCityTicketQuery, GetStatusQuery, GetTicketQuery,GetTicketsDispatchedQuery,GetTicketsQuery, GetIssueQuery, GetTicketsSortByDateQuery, GetTicketsSortByIssueQuery, GetTicketsSortByCityQuery, GetTicketsSortByStatusQuery, GetTicketsSortByUpvotesQuery, GetAllPicturesQuery, GetPictureQuery } from './api-ticket-query.query';
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
        return this.repository.getTicketsSortDate();
    }
}

@QueryHandler(GetTicketsSortByIssueQuery)
export class GetTicketsSortByIssueHandler implements IQueryHandler<GetTicketsSortByIssueQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(){
        return this.repository.getTicketsSortIssue();
    }
}

@QueryHandler(GetTicketsSortByCityQuery)
export class GetTicketsSortByCityHandler implements IQueryHandler<GetTicketsSortByCityQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(){
        return this.repository.getTicketsSortCity();
    }
}

@QueryHandler(GetTicketsSortByStatusQuery)
export class GetTicketsSortByStatusHandler implements IQueryHandler<GetTicketsSortByStatusQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(){
        return this.repository.getTicketsSortStatus();
    }
}

@QueryHandler(GetTicketsSortByUpvotesQuery)
export class GetTicketsSortByUpvotesHandler implements IQueryHandler<GetTicketsSortByUpvotesQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(){
        return this.repository.getTicketsSortUpvotes();
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
        const{status: Status} = query;
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
        const{city: city} = query;
        return this.repository.getCityTicket(city);
    }
}

@QueryHandler(CloseTicketQuery)
export class CloseTicketHandler implements IQueryHandler<CloseTicketQuery>{
    constructor(private readonly repository:ApiTicketRepositoryDataAccess){}

    async execute(query: CloseTicketQuery){
        const{ticketId: ticketId} = query;
        return this.repository.closeTicket(ticketId);
    }
}

@QueryHandler(GetAllPicturesQuery)
export class GetAllPicturesHandler implements IQueryHandler<GetAllPicturesQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){
    }

    async execute(query: GetAllPicturesQuery){
        const{ticketId: ticketId} = query;
        return this.repository.getAllPictures(ticketId);
    }
}

@QueryHandler(GetPictureQuery)
export class GetPictureHandler implements IQueryHandler<GetPictureQuery>{
    constructor(private readonly repository: ApiTicketRepositoryDataAccess){}

    async execute(query: GetPictureQuery){
        const{ticketId: ticketId} = query;
        return this.repository.getPicture(ticketId);
    }
}